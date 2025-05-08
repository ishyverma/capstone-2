"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(1),
});

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/signup", {
        username: values.username,
        password: values.password,
      });

      toast.success(response.data.message);
      router.push("/signin");
    } catch (error) {
      console.log("SIGNUP_ERROR", error);
    }
  }

  return (
    <Card className="w-sm">
      <CardHeader className="text-center tracking-tight text-xl">
        <CardTitle>SignUp to Auction Heaven</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="whysoshy" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-sm tracking-tight">
          Already have an account?{" "}
          <span
            onClick={() => {
              router.push("/signin");
            }}
            className="text-blue-400 hover:cursor-pointer underline"
          >
            Log In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUp;
