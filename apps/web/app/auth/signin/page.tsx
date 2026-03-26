"use client";

import { AuthForm } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24 bg-[#131313] bg-[url(https://www.transparenttextures.com/patterns/carbon-fibre.png)]">
      <AuthForm />
    </div>
  );
}
