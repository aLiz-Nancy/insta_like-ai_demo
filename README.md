# My Portal

Turborepo + pnpm ワークスペースによるモノレポプロジェクト。Feature-Sliced Design (FSD) アーキテクチャを採用。

## Tech Stack

| カテゴリ | 技術 |
| --- | --- |
| Runtime | Node 24.13.0 / pnpm 10.32.1 / TypeScript 5.9.3 |
| Frontend | React 19 / React Router v7 (Framework Mode) / Vite 8 |
| UI | Chakra UI v3 |
| Backend | Supabase (Auth / Database) |
| Lint & Format | Biome 2.4 |
| Test | Vitest 4 / Playwright 1.58 |
| UI Catalog | Storybook 10 |
| Docs | TypeDoc |
| Build | Turborepo |
| Git Hooks | Lefthook (pre-commit: biome, commit-msg: commitlint, pre-push: test) |

## Project Structure

```text
apps/
  web/                — React Router v7 + Vite (port 3000)
  storybook/          — Storybook UI catalog (port 6006)
  playwright/         — Playwright E2E tests
  typedoc/            — TypeDoc API documentation
  vitest/             — Vitest test report aggregation
packages/
  pages/              — FSD pages layer
  widgets/            — FSD widgets layer
  features/           — FSD features layer
  entities/           — FSD entities layer
  shared/
    config-biome/     — Biome configuration (@repo/shared-config-biome)
    config-commitlint/ — Commitlint configuration (@repo/shared-config-commitlint)
    config-knip/      — Knip configuration (@repo/shared-config-knip)
    config-playwright/ — Playwright configuration (@repo/shared-config-playwright)
    config-storybook/ — Storybook configuration (@repo/shared-config-storybook)
    config-syncpack/  — Syncpack configuration (@repo/shared-config-syncpack)
    config-typescript/ — TypeScript configuration (@repo/shared-config-typescript)
    config-typedoc/   — TypeDoc configuration (@repo/shared-config-typedoc)
    config-vitest/    — Vitest configuration (@repo/shared-config-vitest)
    sandbox/          — Dev tooling verification (@repo/shared-sandbox)
```

## Getting Started

### Prerequisites

- Node.js 24.13.0
- pnpm 10.32.1

### Setup

```sh
make setup
```

`make setup` は以下を実行します:

1. `.env.example` から `.env` を生成
2. Volta のインストール (Node バージョン管理)
3. `pnpm install`
4. Playwright ブラウザのインストール
5. Lefthook (Git hooks) のインストール

### Development

```sh
pnpm dev              # web アプリ起動 (port 3000)
pnpm storybook        # Storybook 起動 (port 6006)
```

## Commands

すべてのコマンドはリポジトリルートから実行してください。**pnpm のみ使用** (npm/yarn 不可)。

### Build

```sh
pnpm build                    # 全パッケージビルド
pnpm build --filter=web       # 単一アプリビルド
```

### Lint & Format

```sh
pnpm lint                     # Biome チェック
pnpm lint:fix                 # Biome 自動修正
pnpm format                   # フォーマットチェック
pnpm format:fix               # フォーマット自動修正
```

### Type Check

```sh
pnpm check-types              # TypeScript 型チェック
```

### Test

```sh
pnpm test                     # ユニット / 統合テスト
pnpm test:coverage            # カバレッジレポート付きテスト
pnpm vitest                   # テスト + HTML レポート生成 & 表示
pnpm test:e2e                 # Playwright E2E テスト
```

### Documentation

```sh
pnpm typedoc                  # API ドキュメント生成
```

### Dependency Management

```sh
pnpm package:lint             # 依存バージョン整合性チェック
pnpm package:fix              # 依存バージョン不整合の修正
pnpm package:format           # package.json フォーマットチェック
pnpm package:format:fix       # package.json フォーマット修正
```

### Unused Code Detection

```sh
pnpm knip                     # 未使用コード / 依存 / export 検出
pnpm knip:fix                 # 未使用 export 自動修正
```
