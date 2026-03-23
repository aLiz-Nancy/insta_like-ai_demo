import { z } from "zod";

export const emailSchema = z.email("有効なメールアドレスを入力してください");

export const passwordSchema = z
  .string()
  .min(8, "パスワードは8文字以上で入力してください")
  .max(128, "パスワードは128文字以下で入力してください");

export const usernameSchema = z
  .string()
  .min(3, "ユーザー名は3文字以上で入力してください")
  .max(30, "ユーザー名は30文字以下で入力してください")
  .regex(/^[a-z0-9_]+$/, "英小文字・数字・アンダースコアのみ使用できます");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "パスワードを入力してください"),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
