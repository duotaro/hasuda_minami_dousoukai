'use client';
import { FormEvent, useEffect, useState, useRef } from 'react';
import styles from '../page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_MEMBER, SET_LOADING, SET_USER } from '../../context/firebase.context.js';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { getCollection, COLLECTION_NAME, Member} from '../../lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';


const demoSignin = (auth, dispatch) => {
  // 環境変数で定義
  const adminEmailAddress = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || ''
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

  signInWithEmailAndPassword(auth, adminEmailAddress, adminPassword).then((res) => {
    if(res.user){
      dispatch({type: SET_USER, value: res.user})
    } else {
      alert('ログイン処理中にエラーが発生しました。')
      //dispatch({type: SET_LOADING, value: false})
    }
  }).catch((error) => {
    alert(error)
    //dispatch({type: SET_LOADING, value: false})
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


export default function List() {
  
  const { state, dispatch } = useFirebaseContext()

  const isImeOn = useRef(false)

  const [ search, setSearch] = useState('');
  const [ memberList, setMemberList] = useState(state.member);


  useEffect(async () => {
    dispatch({type: SET_LOADING, value: true})
    if(!state.member.length) {
      const firebase = state.firebase || initializeFirebaseApp();
      const auth = state.firebaseAuth || getAuth(firebase);
      const db = state.firestore || getFirestore(firebase);
      // 未ログイン
      if(!state.user) {
        await demoSignin(auth, dispatch)
      }
      // メンバー取得
    
      await getMemberList(db, state, dispatch, setMemberList);
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">名前</th>
            <th scope="col">参加・不参加</th>
            <th scope="col">編集</th>
          </tr>
        </thead>
        <tbody>
          {memberList && memberList.map((m) => {
            return (
              <tr key={m.id}>
                <th scope="row">{m.id}</th>
                <th scope="row">{m.name}</th>
                <td>{m.answered ? (m.isParticipation ? "参加" : "不参加") : "未回答"}</td>
                <td>
                  { state.user && state.user.uid == m.id && <Link href={`/detail/${m.id}`}>編集</Link> }
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
  )
}
