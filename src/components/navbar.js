import Link from "next/link";
import { useFirebaseContext } from "../context/firebase.context";

export default function Navigation({  }) {
  const { state, dispatch } = useFirebaseContext()
  return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#page-top">南中 2004年度卒業生 同窓会</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto my-2 my-lg-0">
                  {!state.user &&  
                    <li className="nav-item"><Link className="nav-link" href="/signin">ログイン</Link></li>
                  }
                  {state.user &&  
                    <li className="nav-item"><Link className="nav-link" href={`/detail/${state.user.uid}`}>回答する</Link></li>
                  }
                    <li className="nav-item"><Link className="nav-link" href="/list">一覧</Link></li>
                </ul>
            </div>
        </div>
    </nav>
    <header className="masthead">
        <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-8 align-self-end">
                    <h1 className="text-white font-weight-bold">埼玉県蓮田市立蓮田南中学校 2004年度卒業生 同窓会</h1>
                    <hr className="divider" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white-75 mb-5">前回の同窓会から10年以上が経過しています。仕事や家庭の事情で参加が難しい方も多いかと思いますが、是非中学時代の思い出を振り返りながら交流しましょう。</p>
                    <a className="btn btn-primary btn-xl" href="#about">開催日時を確認</a>
                </div>
            </div>
        </div>
    </header>
  </>
  )
}