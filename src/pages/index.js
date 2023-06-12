'use client'
import Head from "next/head.js";
import Layout from '../components/layout.js'
import "../utils/script.js"
import Link from "next/link.js";
import About from "../components/about.js";
import Detail from "../components/detail.js";
import { useFirebaseContext } from '../context/firebase.context.js';


export default function Home({ }) {
    const { state, dispatch } = useFirebaseContext()
    console.log(state)

    if (process.browser) {
        window.addEventListener('DOMContentLoaded', event => {
            // Activate Bootstrap scrollspy on the main nav element
            const mainNav = document.body.querySelector('#mainNav');
            if (mainNav) {
                new bootstrap.ScrollSpy(document.body, {
                    target: '#mainNav',
                    rootMargin: '0px 0px -40%',
                });
            };
        });
    }

  return (
    <Layout>
      <Head>
        <title>蓮田南中学校同窓会 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
      <Detail />
        <div id="portfolio">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/1.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/2.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/2.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/3.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/3.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/4.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/4.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/5.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/5.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <a className="portfolio-box" href="assets/img/portfolio/fullsize/6.jpg" title="Project Name">
                            <img className="img-fluid" src="assets/img/portfolio/thumbnails/6.jpg" alt="..." />
                            <div className="portfolio-box-caption p-3">
                                <div className="project-category text-white-50">Category</div>
                                <div className="project-name">Project Name</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <section className="page-section" id="contact">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6 text-center">
                      {state.user && <Link className="btn btn-light btn-xl" href={`/detail/${state.user.uid}`}>{state.user.displayName}として回答する</Link>}
                      {!state.user && <Link className="btn btn-light btn-xl" href="/signin">ログインして回答する</Link>}
                    </div>
                </div>
                
            </div>
        </section>
    </Layout>
  );
}