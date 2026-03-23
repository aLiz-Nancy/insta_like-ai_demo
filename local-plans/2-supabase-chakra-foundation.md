# Phase 1 — プロジェクト基盤拡張（Supabase + Chakra UI）

## Context

`apps/web` に Supabase 連携と Chakra UI v3 を追加し、Instagram クローンの実装基盤を構築する。
現在 `apps/web` は最小構成（React Router v7 + Vite + SSR）で、CSS フレームワークや認証基盤は未導入。

## Approach

1. **依存パッケージ追加** — pnpm で一括追加
2. **Chakra UI セットアップ** — CLI snippet + emotion SSR cache 構成（Remix sandbox パターン準拠）
3. **Supabase クライアント** — server/client 分離、Cookie ベースセッション
4. **React Router v7 middleware** — `v8_middleware` フラグ + 認証ミドルウェア
5. **動作確認** — build 成功 + Chakra コンポーネント描画確認

## File Changes

| ファイルパス | 変更内容 |
|-------------|---------|
| `apps/web/package.json` | 依存追加: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `@chakra-ui/react`, `@emotion/react`, `@emotion/cache`, `@emotion/server`, `next-themes` |
| `apps/web/.env.example` | Supabase 環境変数追加 |
| `apps/web/react-router.config.ts` | `future: { v8_middleware: true }` 追加 |
| `apps/web/src/root.tsx` | Chakra Provider + emotion cache + `suppressHydrationWarning` 統合 |
| `apps/web/src/entry.server.tsx` | 新規: emotion SSR スタイル抽出 |
| `apps/web/src/entry.client.tsx` | 新規: emotion client hydration |
| `apps/web/src/emotion/emotion-cache.ts` | 新規: emotion cache 生成 |
| `apps/web/src/emotion/emotion-server.tsx` | 新規: SSR スタイル抽出ロジック |
| `apps/web/src/emotion/emotion-client.tsx` | 新規: クライアント cache provider + hydration |
| `apps/web/src/components/chakra-provider.tsx` | 新規: ChakraProvider 薄いラッパー |
| `apps/web/src/components/ui/provider.tsx` | CLI snippet 生成（ChakraProvider + ColorModeProvider） |
| `apps/web/src/components/ui/color-mode.tsx` | CLI snippet 生成（next-themes 統合） |
| `apps/web/src/lib/supabase/server.ts` | 新規: サーバー用 Supabase クライアント（Cookie セッション） |
| `apps/web/src/lib/supabase/client.ts` | 新規: ブラウザ用 Supabase クライアント |
| `apps/web/src/context.ts` | 新規: `createContext<User \| null>(null)` 認証コンテキスト |
| `apps/web/src/lib/auth.middleware.ts` | 新規: セッション検証ミドルウェア |

## Reuse

- `@repo/shared-config-typescript/react-router` — tsconfig 共有設定（既存）
- Chakra UI v3 Remix sandbox パターン — emotion SSR 構成の参照実装

## Test Plan

- [ ] `pnpm build --filter=web` が成功する
- [ ] `pnpm check-types` が成功する
- [ ] `pnpm lint` が成功する
- [ ] Chakra UI コンポーネント（Button 等）が home.tsx で描画される
- [ ] Supabase クライアント初期化エラーがない（環境変数未設定時も graceful）
- [ ] 既存テスト (`pnpm test --filter=web`) が通る
