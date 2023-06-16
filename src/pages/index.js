'use client'
import Head from "next/head.js";
import Layout from '../components/layout.js'
import "../utils/script.js"
import Link from "next/link.js";
import About from "../components/about.js";
import Detail from "../components/detail.js";
import { useFirebaseContext } from '../context/firebase.context.js';
import { useRouter } from "next/router.js";


export default function Home({ }) {
    const { state, dispatch } = useFirebaseContext()
    const router = useRouter()

    const isLogin = state.user && state.user.uid !== process.env.NEXT_PUBLIC_ADMIN_ID

    if (process.browser) {
        console.log(router)
        window.addEventListener('DOMContentLoaded', event => {
            // Activate Bootstrap scrollspy on the main nav element
            const mainNav = document.body.querySelector('#mainNav');
            if (mainNav) {
                new bootstrap.ScrollSpy(document.body, {
                    target: '#mainNav',
                    rootMargin: '0px 0px -40%',
                });
            };

            // Navbar shrink function
            var navbarShrink = function () {
                const navbarCollapsible = document.body.querySelector('#mainNav');
                if (!navbarCollapsible) {
                    return;
                }
                if (window.scrollY === 0) {
                    navbarCollapsible.classList.remove('navbar-shrink')
                } else {
                    navbarCollapsible.classList.add('navbar-shrink')
                }

            };

            // Shrink the navbar 
            navbarShrink();

            // Shrink the navbar when page is scrolled
            document.addEventListener('scroll', () => {
                navbarShrink()
            });
        });
    }

  return (
    <Layout>
      <Head>
        <title>蓮田南中学校同窓会 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <About />
      <Detail />
        {/* <div id="portfolio">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg" title="Project Name">
                            <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/2.jpg" title="Project Name">
                        <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/3.jpg" title="Project Name">
                        <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/4.jpg" title="Project Name">
                        <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/5.jpg" title="Project Name">
                        <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/6.jpg" title="Project Name">
                        <img className="img-fluid" src="https://via.placeholder.com/320x200" alt="..." />
                            <div className="portfolio-box-caption p-3">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div> */}
        <section className="page-section" id="contact">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6 text-center">
                      {isLogin && <Link className="btn btn-light btn-xl" href={`/detail/${state.user.uid}`}>{state.user.displayName}として回答する</Link>}
                      {!isLogin && <Link className="btn btn-light btn-xl" href="/signin">ログインして回答する</Link>}
                    </div>
                </div>
                
            </div>
        </section>
    </Layout>
  );
}