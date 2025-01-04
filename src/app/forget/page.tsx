"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

const formSchema = z
  .object({
    identifier: z.string({
      message: "Please enter a valid identifier.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
type FormValues = z.infer<typeof formSchema>;
export default function ForgetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setLoading(true);
    data.identifier = data.identifier.trim().replace(/\s+/g, "").toLowerCase();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/event/user/forgot`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast({
          title: "Update password successful!",
          description: `Redirecting to login page...`,
          className: "bg-green-400",
          duration: 1500,
        });
        router.push("/login/v2"); // Redirect to the login page
      } else {
        const errorResult = await response.json();
        toast({
          title: "Log In Failed!",
          description: `Error : ${errorResult.message} `,
          className: "bg-red-400",
          duration: 2000,
        });
        throw errorResult;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center">
        <div className="flex flex-row md:self-start">
          <Link className="md:self-start" href="/login/v2">
            <ChevronLeft className="mb-5 w-7 h-7 md:mb-0 md:hover:text-primary-light" />
          </Link>
          {/* <span className="underline underline-offset-4 ml-1 mt-px text-md">
						Back
					</span> */}
        </div>

        <h1 className="text-xl font-bold mb-3">Forgot Password?</h1>
        <h2 className="text-base font-light">Insert a new password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/3">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel>Identifier</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md  focus-visible:ring-primary-light"
                      placeholder="Enter your identifier"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="shadow-md mb-4 focus-visible:ring-primary-light"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <EyeOff
                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel>Confirm new password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="shadow-md mb-4 focus-visible:ring-primary-light"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    {showConfirmPassword ? (
                      <EyeOff
                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="my-8 w-full sm:w-auto"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
