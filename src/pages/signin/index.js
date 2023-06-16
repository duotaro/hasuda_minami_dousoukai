'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { emailValidation, passwordValidation } from '../../utils/form_validation'
import styles from '../page.module.css'
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_MODAL_MESSAGE } from '../../context/firebase.context';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import Link from 'next/link';
import Layout from '../../components/layout';

/**
   * 新規登録
   */
const signin = async (e, state, dispatch, email, password, router) => {
  e.preventDefault()

  const firebase = state.firebase || initializeFirebaseApp();
  dispatch({type: SET_FIREBASE_APP, value: firebase})
  const auth = state.firebaseAuth || getAuth(firebase);
  dispatch({type: SET_FIREBASE_AUTH, value: auth})

  console.log(firebase)
  console.log(auth)

  await signInWithEmailAndPassword(auth, email, password).then((res) => {
    if(res.user){
      dispatch({type: SET_MODAL_MESSAGE, value: 'ログインに成功しました。'})
      dispatch({type: SET_USER, value: res.user})
      router.push("/mypage");
    } else {
      dispatch({type: SET_MODAL_MESSAGE, value: 'ログイン処理中にエラーが発生しました。'})
    }
  }).catch((error) => {
    dispatch({type: SET_MODAL_MESSAGE, value: error})
  })
}

export default function Signin() {
  const router = useRouter();
  const { state, dispatch } = useFirebaseContext()
  
  const defaulyFormError = {
    isValid: true,
    message: ''
  } 
  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(defaulyFormError);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(defaulyFormError);

  const handleChangeEmail = (e) => {
    const val = e.target.value
    const emailAddress = `dousoukai+${val}@gmail.com`
    setEmail(emailAddress)

    setvalidEmail(emailValidation(emailAddress));
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    setValidPassword(passwordValidation(e.target.value));
  }

  const login = (e) => {
    e.preventDefault()
    signin(e, state, dispatch, email, password, router)
  }





  useEffect(() => {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      navbarCollapsible.classList.add('navbar-shrink')
  })

  return (
    <Layout>
    <main className={`${styles.main} row`}>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link href="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Login</li>
        </ol>
      </nav>
      <div class="alert alert-warning mt-2" role="alert">
        IDとpasswordは事前に幹事がお送りしています。そちらを使ってログインしてください。
        ログインできない場合は幹事まで連絡してください。
      </div>
      <div className="col card p-3">
      <form className="card-body p-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">ID</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={email} onChange={handleChangeEmail}/>
          {!validEmail.isValid && (
            <div id="emailFeedback" className="invalid-feedback">{validEmail.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input type="password" className="form-control" id="password" defaultValue={password} onChange={handleChangePassword} />
          {!validPassword.isValid && (
            <div id="passwordFeedback" className="invalid-feedback">{validPassword.message}</div>
          )}
        </div>
        <button type="button" className="btn btn-primary" onClick={(e) => login(e)}>ログイン</button>
      </form>
      </div>
    </main>
    </Layout>
  )
}
