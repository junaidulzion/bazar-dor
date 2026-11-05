"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowLeft, ArrowRightFromSquare } from "@gravity-ui/icons";
import { Button, Input, Label, TextField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileClient({ user }) {
  const [name, setName] = useState(user.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await authClient.updateUser({ name });

      if (result.error) {
        setError(result.error.message || "আপডেট করা যায়নি।");
        return;
      }

      setSuccess("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#26332b]">
      <div className="mx-auto max-w-xl space-y-4">
        {/* Page heading */}
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
            <p className="text-xs text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            <ArrowLeft />
            হোম
          </Link>
        </header>

        {/* User information */}
        <section className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/70 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="size-full object-cover"
                  height={48}
                  width={48}
                />
              ) : (
                <span className="text-lg font-bold">
                  {user.name?.charAt(0) || "U"}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="shrink-0 border-red-400 text-red-500"
            onPress={handleSignOut}
          >
            <ArrowRightFromSquare />
            সাইন আউট
          </Button>
        </section>

        {/* Profile form */}
        <section className="rounded-xl border border-gray-200 bg-white/70 p-5">
          <h2 className="mb-5 text-sm font-bold">ব্যক্তিগত তথ্য</h2>

          <form className="space-y-4" onSubmit={handleUpdate}>
            <TextField className="space-y-2">
              <Label className="text-xs">নাম</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm"
              />
            </TextField>

            <div>
              <Label className="text-xs">ইমেইল</Label>
              <Input
                value={user.email || ""}
                readOnly
                className="mt-2 w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {success && <p className="text-sm text-green-700">{success}</p>}

            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full bg-green-700 text-white hover:bg-green-800"
            >
              {isLoading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
