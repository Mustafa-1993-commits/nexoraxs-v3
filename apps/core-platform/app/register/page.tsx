"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nexoraxs/ui";
import { saveMockUser } from "@/lib/session";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white">NexoraXS</h1>
            <p className="mt-2 text-sm text-white/50">
              Create your account
            </p>
          </div>

          <form className="space-y-4">
            <Input
              label="Full name"
              id="name"
              type="text"
              placeholder="Mustafa Mohamed"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email address"
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <div className="pt-2">
              <Button
                variant="primary"
                type="button"
                className="w-full"
                onClick={() => {
                  saveMockUser(name.trim(), email.trim());
                  router.push("/login");
                }}
              >
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
