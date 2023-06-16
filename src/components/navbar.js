import Link from "next/link";
import { useFirebaseContext } from "../context/firebase.context";

export default function Navigation({  }) {
  const { state, dispatch } = useFirebaseContext()

  const isLogin = state.user && state.user.uid != process.env.NEXT_PUBLIC_ADMIN_ID

  return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
            <Link className="navbar-brand" href="/">南中 2004年度卒業生 同窓会</Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto my-2 my-lg-0">
                  {!isLogin &&  
                    <li className="nav-item"><Link className="nav-link" href="/signin">ログイン</Link></li>
                  }
                  {isLogin &&  
                    <li className="nav-item"><Link className="nav-link" href={`/detail/${state.user.uid}`}>回答する</Link></li>
                  }
                    <li className="nav-item"><Link className="nav-link" href="/list">みんなの回答</Link></li>
                </ul>
            </div>
        </div>
    </nav>
  </>
  )
}