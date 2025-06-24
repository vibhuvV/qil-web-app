import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { FC } from "react";

import { useLoginMutation } from "@/features/onboarding/hooks/useLogin";
import {
  LoginFormSchema,
  loginFormSchema,
} from "@/features/onboarding/components/LoginForm/LoginForm.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setToken } from "@/utils/auth";

type LoginFormProps = {
  redirectTo?: string;
};

const LoginForm: FC<LoginFormProps> = ({ redirectTo }) => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation({
    onSuccess: (response) => {
      if (response.data?.access && response.data.refresh) {
        setToken(response.data.access, response.data.refresh);
        navigate({
          to: redirectTo ?? "/",
          replace: true,
          resetScroll: true,
        });
      }
    },
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    loginMutation.mutate({
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          isLoading={loginMutation.isPending}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
