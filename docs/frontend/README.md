# フロントエンド構成ガイド

本プロジェクトのフロントエンド技術スタック・アーキテクチャ・開発ツールの全体像をまとめたドキュメント。

## 技術スタック

| カテゴリ         | 技術                                       | バージョン |
| ---------------- | ------------------------------------------ | ---------- |
| ランタイム       | Node.js                                    | 24.14.0    |
| パッケージ管理   | pnpm                                       | 10.32.1    |
| 言語             | TypeScript                                 | 5.9.2      |
| UI ライブラリ    | React                                      | 19.2.4     |
| ルーティング     | React Router (Framework Mode)              | 7.13.1     |
| ビルドツール     | Vite                                       | 7.1.7      |
| API ドキュメント | TypeDoc                                    | 0.28.17    |
| モノレポ管理     | Turborepo                                  | 2.8.20     |
| Lint / Format    | Biome                                      | 2.0.6      |
| 未使用コード検出 | Knip                                       | 5.61.3     |
| 依存バージョン   | Syncpack                                   | 14.0.0     |
| Git Hooks        | Lefthook                                   | 2.0.9      |
| コミット検証     | Commitlint (@commitlint/config-conventional) | 20.4.3     |
| テスト           | Vitest                                     | 4.1.0      |
| UI カタログ      | Storybook                                  | 9.1.20     |
| E2E テスト       | Playwright                                 | 1.52.0     |

## ドキュメント一覧

| ファイル                             | 内容                                                     |
| ------------------------------------ | -------------------------------------------------------- |
| [architecture.md](architecture.md)   | モノレポ構成・FSD レイヤー・Turborepo タスクグラフ       |
| [toolchain.md](toolchain.md)         | Biome・Knip・Syncpack・Lefthook 等の開発ツールチェーン   |
| [testing.md](testing.md)             | テスト戦略（Vitest / Storybook / Playwright / TDD）      |
| [web-app.md](web-app.md)             | apps/web の React Router v7 / Vite 構成                  |
