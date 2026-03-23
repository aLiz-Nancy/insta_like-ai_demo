import {
  Button,
  Link as ChakraLink,
  Fieldset,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/signup";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { userContext } from "@/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validators/auth";

export function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (user) {
    throw redirect("/feed");
  }
}

type ActionErrors = {
  form?: string[];
  email?: string[];
  password?: string[];
  username?: string[];
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const result = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  });

  if (!result.success) {
    const errors: ActionErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof ActionErrors;
      errors[key] ??= [];
      errors[key].push(issue.message);
    }
    return { errors };
  }

  const { supabase, headers } = createSupabaseServerClient(request);
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { username: result.data.username },
    },
  });

  if (error) {
    return {
      errors: {
        form: [
          "アカウントの作成に失敗しました。しばらくしてからお試しください",
        ],
      } as ActionErrors,
    };
  }

  return redirect("/feed", { headers });
}

export default function SignupPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <Fieldset.Root>
        <Stack gap="4">
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            サインアップ
          </Fieldset.Legend>

          {actionData?.errors?.form && (
            <Text color="fg.error" fontSize="sm">
              {actionData.errors.form[0]}
            </Text>
          )}

          <Field
            label="ユーザー名"
            invalid={!!actionData?.errors?.username}
            errorText={actionData?.errors?.username?.[0]}
          >
            <Input name="username" placeholder="your_username" />
          </Field>

          <Field
            label="メールアドレス"
            invalid={!!actionData?.errors?.email}
            errorText={actionData?.errors?.email?.[0]}
          >
            <Input name="email" type="email" placeholder="you@example.com" />
          </Field>

          <Field
            label="パスワード"
            invalid={!!actionData?.errors?.password}
            errorText={actionData?.errors?.password?.[0]}
          >
            <PasswordInput name="password" placeholder="8文字以上" />
          </Field>

          <Button type="submit" colorPalette="blue" loading={isSubmitting}>
            サインアップ
          </Button>

          <Text fontSize="sm" textAlign="center">
            すでにアカウントをお持ちの方は{" "}
            <ChakraLink asChild colorPalette="blue">
              <Link to="/auth/login">ログイン</Link>
            </ChakraLink>
          </Text>
        </Stack>
      </Fieldset.Root>
    </Form>
  );
}
