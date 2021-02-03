# ooui-memo
オブジェクト指向 UI デザイン ワークアウトその１ - メモアプリケーション

はじめての OOUI ワークアウトなので、OOUI での進め方や各種ツールの使い方を学ぶことを優先とする。  
（時間は特に制限しない）

## 環境
- TypeScript：4.1.3
- React：16.14.0
- PHP：7.4.14
- Laravel：6.20.9
- MySQL：8.0.22

## 開発環境構築
※前提：Docker、make コマンド導入済み

Laravel のセットアップ
```
$ make init
```

開発補助のライブラリインストール（※任意）
```
$ make install-recommend-packages
```

フロント側のライブラリインストール
```
$ make yarn
or
$ cd src && yarn install
```
※コンテナ内の yarn は動作が遅くなりがちのため、ローカルのものを使った方がいい。

## 開発環境立ち上げ
コンテナ立ち上げ
```
$ make up
```

フロント側の差分監視
```
$ make yarn-watch
or
$ cd src && yarn watch
```

localhost:80 にアクセス

## その他よく使うコマンド
各種コンテナにアクセス
```
$ make web
$ make app
$ make db
```

MySQL コンテナにログイン
```
$ make sql
```