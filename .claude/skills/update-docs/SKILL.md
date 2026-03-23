---
name: update-docs
description: コード変更に基づいて README/docs/TSDoc を更新する。
---

# update-docs

コード変更に基づいてドキュメントと TSDoc コメントを更新し、`_/.last-update-docs` に記録します。

## `_/.last-update-docs` ファイル形式

```
commit_hash=<hash>
commit_subject=<1行目>
commit_date=<ISO 8601>
```

このファイルは `.gitignore` で除外されローカル専用。

## フロー

### Step 1: 前回の更新コミットを確認する

`_/.last-update-docs` を読み込んで `commit_hash` を取得。
ファイルが存在しない場合は初回扱いとして直近のコミットを基準にする。

### Step 2: 変更内容を確認する

```bash
git log <commit_hash>..HEAD --oneline
git diff <commit_hash>..HEAD --stat
```

変更されたファイルと内容を把握する。

### Step 3: ドキュメントを更新する

#### README.md の更新対象

- コマンドの追加・変更
- アーキテクチャの変更
- 新しい環境変数
- 設定ファイルの変更

#### `docs/` の更新対象

- API 仕様の変更
- コンポーネントの追加・削除
- 開発フローの変更

#### TSDoc コメントの更新

変更されたファイルの公開 API（export された関数・クラス等）の TSDoc を更新する。

### Step 4: `_/.last-update-docs` を更新する

```bash
git log -1 --format="%H"  # commit_hash
git log -1 --format="%s"  # commit_subject
git log -1 --format="%cI" # commit_date (ISO 8601)
```

取得した情報で `_/.last-update-docs` を更新:

```
commit_hash=abc123def456
commit_subject=feat(auth): 新機能を追加
commit_date=2026-03-17T10:00:00+09:00
```

### Step 5: 更新内容を報告する

更新したファイルの一覧と変更内容を表示する。

## 注意事項

- `docs/` ディレクトリが存在しない場合は新規作成しない（ユーザーに確認する）
- 自動生成ファイルは更新対象外
- `_/.last-update-docs` が `.gitignore` に追加されているか確認する
