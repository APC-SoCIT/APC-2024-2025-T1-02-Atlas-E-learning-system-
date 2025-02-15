"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { startTransition, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Server actions
import { login } from "@/app/_features/login/actions/login";

const formSchema = z.object({
  email: z.string().min(2, "Email required").email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    startTransition(() => {
      login(values).then((response) => {
        const { success, redirectURL, message } = response;
        if (success === false && message) {
          setLoginError(message);
          setIsSubmitting(false);
        }
        if (success === true && redirectURL) router.push(redirectURL);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@domain.com"
                  {...field}
                  onChange={(e) => {
                    setLoginError("");
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription className="sr-only">
                The email you use for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    {...field}
                    onChange={(e) => {
                      setLoginError("");
                      field.onChange(e);
                    }}
                  />
                  <button
                    onClick={() => setPasswordVisibility((current) => !current)}
                    type="button"
                    className="opacity-50 absolute inset-y-0 right-2 hover:opacity-80"
                  >
                    {passwordVisibility ? (
                      <Eye className="h-5" />
                    ) : (
                      <EyeOff className="h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                The email you use for your account.
              </FormDescription>
              <FormMessage>{loginError}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold mt-4"
          disabled={isSubmitting}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}
