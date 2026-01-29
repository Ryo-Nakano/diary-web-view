# 日記入力 Web アプリ

## 概要
- Google Apps Script でデプロイされる Web アプリケーションを作成する
- テキスト入力欄に日記を入力し、送信ボタンで特定のスプレッドシートの最終行に追記する
- 既存の `Diary.save()` メソッドを利用し、日付・時刻は自動入力される
- スマホ・PC の両方で快適に利用できるレスポンシブデザイン

## 仕様
### 機能要件
- 複数行テキスト入力欄（textarea）で日記を入力できる
- 送信ボタンをクリックで日記を保存できる
- `Cmd + Enter`（Mac）/ `Ctrl + Enter`（Windows）でも送信できる
- 保存には既存の `Diary.save(text)` を使用する
- **LocalStorage による入力内容の自動保存**
  - 入力中のテキストは LocalStorage に自動保存される
  - ページを閉じたり誤って更新しても、再度開いた際に入力内容が復元される
  - 保存成功時には LocalStorage をクリアし、入力欄も空にする

### UI/メッセージ
- **送信ボタン**: 「日記を保存」
- **プレースホルダー**: 「今日の日記を書いてください...」
- **完了メッセージ**: 「日記を保存しました」（トースト表示、数秒後に自動消去）
- **エラーメッセージ**: 「保存に失敗しました。もう一度お試しください。」

### デザイン方針
- シンプルで機能重視、派手すぎないデザイン
- レスポンシブ対応（スマホ・PC 両対応）
- 入力欄を画面中央に配置し、使いやすさを優先

### アクセス制御
- 誰でもアクセス可能（匿名ユーザーとして実行）

### 制約・前提
- 既存の `Diary` クラス（`src/sheet_data/diary_database_sheet/diary.js`）を使用
- `Diary.save(text)` で日付・時刻は自動的に記録される
- スプレッドシートの構造は既存のまま使用

## 実装計画
### 使用するクラス・ファイル
- DAO: `src/sheet_data/diary_database_sheet/diary.js`（既存）
- UI: `src/ui/diary_input.html`（新規）
- エントリーポイント: `src/index.js`（追記）

### 新規作成ファイル
1. `src/ui/diary_input.html` - Web アプリの HTML/CSS/JS

### 修正ファイル
1. `src/index.js` - GAS Web アプリ用グローバル関数追加
   - `doGet()`: HTML を返す
   - `saveDiary(text)`: 日記保存 API

### 処理フロー
1. ユーザーが Web アプリ URL にアクセス
2. `doGet()` が `diary_input.html` を返す
3. ユーザーがテキストエリアに日記を入力
4. 送信ボタン or `Cmd/Ctrl + Enter` で送信
5. `google.script.run.saveDiary(text)` でサーバーに送信
6. `Diary.save(text)` でスプレッドシートに保存
7. 成功/失敗をトースト通知で表示

### 技術的な判断・注意点
- HTML ファイルは `HtmlService.createHtmlOutputFromFile()` で返す
- クライアント側 JS は `google.script.run` を使用してサーバー関数を呼び出す
- 送信中は二重送信防止のためボタンを無効化する
