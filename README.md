# Next.js Todoアプリケーション

このプロジェクトは、Next.jsとPrismaを使って作成したシンプルなTodoアプリです。Next.jsの最新機能とPrismaを活用して、効率的にフルスタック開発を行っています。

## デモ

アプリケーションのデモはこちらから確認できます：

[https://next-todo-ashen.vercel.app](https://next-todo-ashen.vercel.app)

## セットアップ

### 必要なもの

- Node.js 18.x以上
- PostgreSQL（Prismaを使って他のデータベースにも対応可能）

### インストール手順

1. リポジトリをクローンします：

   ```bash
   git clone https://github.com/tomokijs/next-todo.git
   cd next-todo
   ```

2. 必要なパッケージをインストールします：

   ```bash
   npm install
   ```

3. 環境変数を設定します：

   プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下のようにデータベース接続情報を追加してください：

   ```env
   DATABASE_URL="postgresql://ユーザー名:パスワード@ホスト:ポート/データベース名"
   ```

4. Prismaでデータベースをセットアップします：

   ```bash
   npx prisma migrate dev --name init
   ```

5. 開発サーバーを起動します：

   ```bash
   npm run dev
   ```

   ブラウザで[http://localhost:3000](http://localhost:3000)にアクセスして、アプリが正しく動作していることを確認してください。

## プロジェクト構成

- `app/`：Next.jsのページとコンポーネント
- `prisma/`：Prismaのスキーマファイル（`schema.prisma`）
- `public/`：静的ファイル
- `styles/`：Tailwind CSSの設定ファイル

## 使用技術

- [Next.js](https://nextjs.org/)：Reactベースのフレームワーク
- [Prisma](https://www.prisma.io/)：ORM（オブジェクト関係マッピング）ツール
- [Tailwind CSS](https://tailwindcss.com/)：CSSフレームワーク
