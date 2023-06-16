'use client';
import { FormEvent, useState, useEffect } from 'react';
import styles from '../page.module.css'
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { useFirebaseContext, SET_MEMBER
 } from '../../context/firebase.context';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import Link from 'next/link';
import { updateDocument, getCollection, Member, COLLECTION_NAME } from '../../lib/firebase/firestore';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';


export default function Mypage() {
  const { state, dispatch } = useFirebaseContext()
  const router = useRouter()
  const user = state.user
  let isLogin = user != null && user.uid !== process.env.NEXT_PUBLIC_ADMIN_ID
  
  let isParticipation = false


  /** 選択中のラジオボタンvalue */
  const [selected, setSelected] = useState(isParticipation);
  /** ラジオボタン切り替えイベント */
  const changeValue = (e) => {
    setSelected(e.target.value === 'true');
  }

  const radioButtons = [
    {
        label: "参加",
        value: "true"
    },
    {
        label: "不参加",
        value: "false"
    }
  ]

  const submit = async () => {
    const firebase = state.firebase || initializeFirebaseApp();
    const db = state.firestore || getFirestore(firebase);
    await updateDocument(db, COLLECTION_NAME.MEMBERS, params.id, {isParticipation: selected, answered: true})

    // ここで一覧取得も更新しないとダメ
    const getMemberList = async () => {
      getCollection(db, COLLECTION_NAME.MEMBERS).then((res) => {
        let list = []
        if(res){
          for(const m of res){
            list.push(m)
          } 
          // sort
          list.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
        }
        
        dispatch({type: SET_MEMBER, value: list})
      })
    }
    getMemberList()

  }


  useEffect(() => {
    //window.addEventListener('DOMContentLoaded', event => {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      navbarCollapsible.classList.add('navbar-shrink')

      if(user && user.uid == process.env.NEXT_PUBLIC_ADMIN_ID){
        const pass = prompt("パスワードを入力してください。")
        if(pass == process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
          isLogin = true 
        }
        state.member.map((m) => {
          if(m.id === user.uid){
            isParticipation = true
            setSelected(true)
          }
        })
      }

    //})
  })

  return (
    <Layout>
    <main className={`${styles.main} row`}>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link href="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Mypage</li>
        </ol>
      </nav>
      <div className="col card">
      {isLogin && (
        <form className="card-body">
          <div className="mb-3">
            <p>{user.displayName}さんのマイページ</p>
          </div>
          <div className="mb-3">
              {radioButtons.map(radio => {
                  return (
                      <div className="col-4">
                          {/* checked属性に式を定義する */}
                          <input className="form-check-input" type="radio" name="sweets" 
                              value={radio.value} checked={radio.value === new Boolean(selected).toString()} onChange={changeValue}/>
                          <label className="form-check-label">
                              <span className="fs-6">{radio.label}</span>
                          </label>
                      </div>
                  )
              })}
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>更新する</button>
        </form>
      )}
      {!isLogin && (
        <div className="card-body text-center p-5">
        <div className="justify-content-center">
          <div className="">このページを閲覧するためにはログインが必要です。</div>
        </div>
        <div className="justify-content-center">
          <div className="">
            <Link href="/signin">ログインページから</Link>ログインしてください。
          </div>
        </div>
        </div>
      )}
      </div>
    </main>
    </Layout>
  )
}
