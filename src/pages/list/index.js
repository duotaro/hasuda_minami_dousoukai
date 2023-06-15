'use client';
import { FormEvent, useEffect, useState, useRef } from 'react';
import styles from '../page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_MEMBER, SET_LOADING, SET_USER } from '../../context/firebase.context.js';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { getCollection, COLLECTION_NAME, Member} from '../../lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Layout from '../../components/layout'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';


const demoSignin = (auth, dispatch) => {
  // 環境変数で定義
  const adminEmailAddress = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || ''
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

  signInWithEmailAndPassword(auth, adminEmailAddress, adminPassword).then((res) => {
    if(res.user){
      dispatch({type: SET_USER, value: res.user})
    } else {
      dispatch({type: SET_MODAL_MESSAGE, value: 'ログイン処理中にエラーが発生しました。'})
    }
  }).catch((error) => {
    dispatch({type: SET_MODAL_MESSAGE, value: error})
  })
}


const getMemberList = async (db, state, dispatch, setMemberList) => {
  if(state.member && state.member.length > 0){
    dispatch({type: SET_LOADING, value: false})
    return
  }
  getCollection(db, COLLECTION_NAME.MEMBERS).then((res) => {
    let list = []
    if(res){
      for(const m of res){
        if(m.name.indexOf("admin") > -1){
          continue;
        }
        list.push(m)
      } 
      // sort
      list.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
    }
    
    setMemberList(list)
    dispatch({type: SET_MEMBER, value: list})
    dispatch({type: SET_LOADING, value: false})
  })
}


const getRandomUserIcon = async() => {
  const res =  await fetch("http://api.randomuser.me/")
  
}


const init = async (auth, dispatch, state, setMemberList, db) => {
  // 未ログイン
  if(!state.user) {
    await demoSignin(auth, dispatch)
  }
  // メンバー取得

  await getMemberList(db, state, dispatch, setMemberList);
}


export default function List() {

  
  
  const { state, dispatch } = useFirebaseContext()

  const isImeOn = useRef(false)

  const [ search, setSearch] = useState('');
  const [ memberList, setMemberList] = useState(state.member);


  useEffect(() => {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    navbarCollapsible.classList.add('navbar-shrink')

    dispatch({type: SET_LOADING, value: true})
    if(!state.member.length) {
      const firebase = state.firebase || initializeFirebaseApp();
      const auth = state.firebaseAuth || getAuth(firebase);
      const db = state.firestore || getFirestore(firebase);
      init(auth, dispatch, state, setMemberList, db)  
    } else {
      dispatch({type: SET_LOADING, value: false})
    }

    
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value
    if (val === '') {
      // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
      isImeOn.current = false
    } else if (isImeOn.current) {
      return // IME 変換中は何もしない
    }
    console.log(val)

    setSearch(val)
    doSearch(val)
  }

  const doSearch = (val) => {
    let list = []
    console.log(search)
    const value = val ? val : search;
    if(value){
      
      for(const member of state.member){
        if(member.name.indexOf(value) > -1){
          list.push(member);
        }
      }
    }
    setMemberList(list)
  }

  console.log(memberList)

  return (
    <Layout>
      <main className={`${styles.main}`}>
        <div className='row text-white w-100'>
          <div className="col p-3">
            <form>
              <input type="text" defaultValue={search} 
                onChange={handleSearch} 
                placeholder='名前で検索'
                onCompositionStart={() => {
                  isImeOn.current = true // IME 入力中フラグを ON
                }}
                onCompositionEnd={(e) => {
                  isImeOn.current = false // IME 入力中フラグを OFF
                  handleSearch(e) // 入力確定したとき
                }}
                />
            </form>
          </div>
        </div>
        {state.user && 
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th scope="col">名前</th>
              <th scope="col">参加・不参加</th>
              <th scope="col">-</th>
            </tr>
          </thead>
          <tbody>
            {memberList && memberList.map((m) => {
              return (
                <tr key={m.id} className="align-middle">
                  {/* <th scope="row">{m.id}</th> */}
                  <th scope="row w-100">
                    <img src="https://livedoor.blogimg.jp/worldfusigi/imgs/f/4/f448b792.jpg" 
                        className="rounded-circle border border-dark me-2" 
                        style={{width:'40px', height:'40px'}} alt="usericon" />
                    {m.name}
                  </th>
                  <td>{m.answered ? (m.isParticipation ? "参加" : "不参加") : "未回答"}</td>
                  <td>
                    { state.user && state.user.uid == m.id && <Link href={{ pathname: "detail/[id]", query: {id: state.user.uid} }}>回答する</Link> }
                    { state.user && state.user.uid !== m.id && "-" }
                    { !state.user && "-" }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        }
        {!state.user && 
        <div className='row text-white w-50'>
            <div className="btn btn-primary">
              <Link href="/signin" className="text-white">ログインして回答する</Link>
            </div>
        </div>
        }
      </main>
    </Layout>
  )
}
