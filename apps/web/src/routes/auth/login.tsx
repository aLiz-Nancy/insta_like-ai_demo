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
import type { Route } from "./+types/login";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { userContext } from "@/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validators/auth";

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
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
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
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return {
      errors: {
        form: ["メールアドレスまたはパスワードが正しくありません"],
      } as ActionErrors,
    };
  }

  return redirect("/feed", { headers });
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <Fieldset.Root>
        <Stack gap="4">
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            ログイン
          </Fieldset.Legend>

          {actionData?.errors?.form && (
            <Text color="fg.error" fontSize="sm">
              {actionData.errors.form[0]}
            </Text>
          )}

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
            <PasswordInput name="password" placeholder="パスワード" />
          </Field>

          <Button type="submit" colorPalette="blue" loading={isSubmitting}>
            ログイン
          </Button>

          <Text fontSize="sm" textAlign="center">
            アカウントをお持ちでない方は{" "}
            <ChakraLink asChild colorPalette="blue">
              <Link to="/auth/signup">サインアップ</Link>
            </ChakraLink>
          </Text>
        </Stack>
      </Fieldset.Root>
    </Form>
  );
}
