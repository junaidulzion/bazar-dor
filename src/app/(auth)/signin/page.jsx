"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

export default function SignInPage() {
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    alert(`Login submitted: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10 text-[#26332b]">
      <div className="w-full max-w-[450px]">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            সাইন ইন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও ট্র্যাকিং দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Login form */}
        <Form
          className="flex w-full flex-col gap-3 rounded-2xl border border-[#e0e9e1] bg-white/70 p-5 shadow-sm sm:p-6"
          onSubmit={onSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? null
                : "সঠিক ইমেইল ঠিকানা লিখুন"
            }
          >
            <Label className="text-sm font-medium">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="mt-1 h-11 w-full rounded-lg border border-[#dfe7df] px-3 text-sm outline-none focus:border-green-600"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            className="w-full"
          >
            <Label className="text-sm font-medium">পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="mt-1 h-11 w-full rounded-lg border border-[#dfe7df] px-3 text-sm outline-none focus:border-green-600"
            />
            <FieldError />
          </TextField>

          {/* Forgot password */}
          <div className="w-full text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-gray-500 hover:text-green-700"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#078b3e] text-sm font-semibold text-white shadow-md transition hover:bg-[#067633]"
          >
            সাইন ইন
          </Button>

          {/* Divider */}
          <div className="my-1 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              type="button"
              className="h-10 rounded-lg border border-[#dfe7df] bg-white text-xs font-medium"
              onPress={() => alert("Google login")}
            >
              <span className="text-base font-bold text-[#4285F4]">
                G
              </span>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              className="h-10 rounded-lg border border-[#dfe7df] bg-white text-xs font-medium"
              onPress={() => alert("GitHub login")}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.74 2.04 3.2 1.43.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.12-2.96 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.1-1.44 3.05-1.14 3.05-1.14.62 1.54.24 2.68.12 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.62 5.24-5.12 5.52.4.34.76 1 .76 2.02v3c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Signup link */}
          <p className="mt-1 w-full text-center text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#078b3e] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>

        {/* Back to home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}