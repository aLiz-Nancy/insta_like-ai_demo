# カスタムエージェント

`.claude/agents/` に定義された 8 つの専門エージェント。すべてサブエージェントとして起動され、特定のタスクを自律的に処理する。

## 一覧

| エージェント                                  | モデル            | 目的                                             |
| --------------------------------------------- | ----------------- | ------------------------------------------------ |
| [code-reviewer](#code-reviewer)               | claude-sonnet-4-6 | コード品質・アーキテクチャ・セキュリティレビュー |
| [component-analyzer](#component-analyzer)     | claude-haiku-4-5  | UI コンポーネント再利用候補の分析                |
| [figma-analyzer](#figma-analyzer)             | claude-sonnet-4-6 | Figma デザインの分析・実装ガイド生成             |
| [plan-verifier](#plan-verifier)               | claude-sonnet-4-6 | 計画に対する作業完了検証                         |
| [playwright-tester](#playwright-tester)       | claude-haiku-4-5  | E2E テスト・ビジュアル検証・レスポンシブ確認     |
| [refactor-cleaner](#refactor-cleaner)         | claude-haiku-4-5  | 未使用コード・依存関係の検出と削除               |
| [reference-researcher](#reference-researcher) | claude-sonnet-4-6 | 公式ドキュメント調査・skill 用 markdown 作成     |
| [security-auditor](#security-auditor)         | claude-sonnet-4-6 | セキュリティ特化の監査                           |

## 詳細

### code-reviewer

- **ファイル**: `.claude/agents/code-reviewer.md`
- **モデル**: claude-sonnet-4-6
- **ツール**: Bash, Glob, Grep, Read, WebFetch, WebSearch
- **用途**: コード変更後にプロアクティブに起動。コード品質・アーキテクチャ準拠・パフォーマンス・セキュリティを確認する読み取り専用レビュアー
- **出力**: 重要度別（Critical / High / Medium / Low）の Issue リスト

### component-analyzer

- **ファイル**: `.claude/agents/component-analyzer.md`
- **モデル**: claude-haiku-4-5-20251001
- **ツール**: Glob, Grep, Read
- **用途**: コンポーネント作成・レビュー時に委譲。`packages/` の共通パッケージと `apps/` 各アプリのコンポーネントを調査し、再利用候補を提案
- **出力**: 再利用候補・共通パターン・参照ファイル

### figma-analyzer

- **ファイル**: `.claude/agents/figma-analyzer.md`
- **モデル**: claude-sonnet-4-6
- **ツール**: Glob, Grep, Read, Figma MCP（get_design_context, get_screenshot, get_metadata, get_variable_defs）
- **用途**: Figma URL が共有されたとき、またはデザイン仕様が必要なときに使用
- **出力**: デザインサマリー・実装ガイド・デザイントークン・アセットノート

### plan-verifier

- **ファイル**: `.claude/agents/plan-verifier.md`
- **モデル**: claude-sonnet-4-6
- **ツール**: Glob, Grep, Read, WebFetch, WebSearch
- **用途**: 計画ファイルや指示書に対して、ファイル存在・フォーマット準拠・整合性・網羅性・品質を検証
- **出力**: Pass / Fail / Partial の構造化レポート
- **特性**: 読み取り専用。破壊的操作は一切行わない

### playwright-tester

- **ファイル**: `.claude/agents/playwright-tester.md`
- **モデル**: claude-haiku-4-5-20251001
- **ツール**: Bash, Glob, Grep, Read, Playwright MCP（navigate, click, fill_form, type, press_key, hover, select_option, take_screenshot, snapshot, resize 等）
- **用途**: E2E テスト、ビジュアル検証、レスポンシブ確認
- **ブレークポイント**: Desktop（1280px+）, Tablet（768-1279px）, Mobile（<767px）

### refactor-cleaner

- **ファイル**: `.claude/agents/refactor-cleaner.md`
- **モデル**: claude-haiku-4-5-20251001
- **ツール**: Bash, Glob, Grep, Read, Edit, Write, TodoWrite
- **用途**: デッドコードや未使用依存関係のクリーンアップ。knip と ESLint を使用
- **特性**: 1 件ずつ安全に削除し、フォーマット検証を実施

### reference-researcher

- **ファイル**: `.claude/agents/reference-researcher.md`
- **モデル**: claude-sonnet-4-6
- **ツール**: Glob, Grep, Read, Write, Edit, Bash, WebFetch, WebSearch
- **用途**: フレームワーク・ライブラリの公式ドキュメントを調査し、Claude Code skill 用の構造化 markdown を作成
- **特性**: 並列実行を前提とし、指定スコープのみを担当

### security-auditor

- **ファイル**: `.claude/agents/security-auditor.md`
- **モデル**: claude-sonnet-4-6
- **ツール**: Bash, Glob, Grep, Read, WebFetch, WebSearch
- **用途**: 認証・決済・機密データの実装時、またはセキュリティ重要コードのレビュー時に使用
- **出力**: 重要度別（Critical / High / Medium）の Issue リスト
- **確認観点**: 認証、シークレット管理、XSS/インジェクション、入力バリデーション、依存関係、Next.js 固有の問題
