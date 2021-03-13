# ooui-memo
オブジェクト指向 UI デザイン ワークアウトその１ - メモアプリケーション

はじめての OOUI ワークアウトなので、OOUI での進め方や各種ツールの使い方を学ぶことを優先とする。  
（時間は特に制限しない）

## 環境
- Node.js：14.2.0
- TypeScript：4.1.3
- React：16.14.0
- PHP：7.4.14
- Laravel：6.20.9
- MySQL：8.0.22

※Docker 環境出典：[ucan-lab/docker-laravel](https://github.com/ucan-lab/docker-laravel)

## 開発環境構築
※前提：Docker、make コマンド導入済み

Laravel のセットアップ
```
$ make init
```

開発補助のライブラリインストール
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
### VSCode での立ち上げ
前提：Remote Container 拡張導入済み

VSCode でワークスペースを開く → ooui-memo.code-workspace を選択。

ワークスペースを開くと
```
Folder contains a Dev Container configuration file. Reopen folder to develop in a container (learn more).
```
と表示されるので Reopen in Container を選択して、コンテナ立ち上げ + VSCode をコンテナに接続。

localhost:80 にアクセス。

**※コーディングはコンテナ内に接続して行うこと（ESLint、Prettier、PHPCS、PHPCBF をエディタ上で動作させたうえで行うため）**

React のコーディング時に重たくなり接続が切れる場合は、Docker のリソースのメモリ上限を少し上げてみる。

### フロント側の差分監視
```
$ make yarn-watch
or
$ cd src && yarn watch
```

### コンテナ立ち上げのみ
```
$ make up
```

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