import Head from "next/head";
import Link from "next/link";
import Layout from '../../components/layout'
import Aboutparts from '../../components/parts/about/about'
import Author from "../../components/parts/author/author";
import { META_ABOUT_TITLE, META_ABOUT_DESCRIPTION } from "../../const/meta";
import Menu from "../../components/parts/menu";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function About({  }) {
  return (
    <Layout>
      <Head>
        <title>{META_ABOUT_TITLE}</title>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
      </Head>

      <div className="container mt-5">
        <div className="row">
          <section className="col">
            <div className="row gx-4 gx-lg-5 row-cols-lg-2 row-cols-1 justify-content-center">
              {/* ブログについて */}
              <div className="col mb-5" >
                <Aboutparts />
              </div>
              {/* 著者について */}
              <div className="col mb-5" >
                <Author />
              </div>
              {/* メニュー */}
              <div className="col mb-5" >
                <Menu />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}