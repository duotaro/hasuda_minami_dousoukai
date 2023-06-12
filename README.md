# design 
https://github.com/startbootstrap/startbootstrap-creative
こちらのbootstrapデザインを採用

# about
同窓会を実施するとのことだったで、簡単に作成しました。
firebaseにあらかじめ同級生のデータを用意。
昔みたいなフォーム入力させる確認方法はダサいかなーと思って。。。
※オープンソース化するにあたって、privateな情報は別のものに置き換えました。

# 制作
2023年5月30日〜

# 事前準備
### スプレッドシート
項目はID/NAME/PASSWORD
PASSWORDはUUIDで作成
https://qiita.com/mininobu/items/ba08fb9a602e1392f5bd
CSV出力。あとで使う。
メールアドレスとか使いたくなかったので、firebase-authを使わない想定だった。
サイト自体は鍵付きだし、個人情報も名前くらいだったのでセキュリティもあまり気にしなくていいかなと



### firebaseの設定
以下のページを参考にfirestoreを使えるようにする
https://firebase.google.com/docs/firestore/quickstart?hl=ja

プロジェクト情報を`.env.local`に記述
```
FIREBASE_API_KEY=
FIREBASE_AUYH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGEING_SENDER_ID=
FIREBASE_APP_ID=
```

`/src/lib/firebase.js`を作成し、`process.env`を使って、環境変数読み込み



同窓会規模だと無料枠内で使えると思うけど、悪意のある同級生がいた場合の対策と、メンバー情報の公開情報は変更しないためwebストレージ(localStorage)を使って対策。
他に [functions を使って firestore のGETをキャッシュしてコストを抑える](https://tech.gamewith.co.jp/entry/2022/12/19/174657)方法もあったが、別にそこまでする必要もないので今回はやらなかった。

### 
これをCSVで出力して `/public/member.csv` に配置。




# 開発
### リポジトリ
https://github.com/duotaro/hasuda_minami_dousoukai.git

### node.jsとnpm導入
https://nodejs.org/ja

### yarn導入
https://www.wakuwakubank.com/posts/307-javascript-yarn/

```
$ node install 
or 
$ yarn
```

```
$ npm run dev
or
$ yarn dev
```

# release
to vercel
```
$ yarn deploy
```







# TODO
一覧で未ログインの場合の処理・動きを考える

全体的なUX考える

