# react_training007

React Testing Library と Jest を用いて、Reactのテストを学習しました。  

## 開発環境

- Windows 11 (21H2)
- WSL2 Ubuntu20.04
- React 18.2
- Redux Toolkit 1.8.6
- React Testing Library 13.4.0
- Jest 29.1.2
- Node.js 16.11.1
- vite 3.1.0

## ローカルでの動作の手順

node が利用できる環境に当リポジトリをクローンします  
下記コマンドで依存パッケージをインストールします

```bash
$ npm install
```

下記コマンドで vite のローカルサーバを起動します

```bash
$ npm run dev

> react_trainig007@0.0.0 dev
> vite


  VITE v3.1.0  ready in 381 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

ターミナルに表示された localhost の URL にアクセスすると、トップページが表示されます

## 大変だったこと
毎度のことですが、参考にした動画教材がJavaScript だったので、型定義で苦労しました。  
また、ライブラリのバージョンアップなどで書き方が変わっている部分もあり、試行錯誤しつつ進めました。  

さらに、ts-jest が遅いためトランスフォーマーをscw に置き換えることにもチャレンジしましたが、こちらもかなり苦戦しました。  

Promise で非同期にした処理が状態を変更した場合に、それを検出してうまくアサーションを行うことができず妥協した書き方をしてしまったので、改めてその辺りのベストプラクティスは確認しておきたいと思います。  

## 参考資料

以下の教材をベースにソースコードを作成しました  
Reactソフトウェアテスト(Hooks+ReduxToolKit時代のモダンテスト手法):  
https://www.udemy.com/course/reacthooksreduxtoolkit/
