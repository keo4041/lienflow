"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8 glass-panel rounded-xl max-w-md w-full">
      <h2 className="text-2xl font-bold font-roboto-slab text-white">Sign in to LienFlow</h2>
      <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded border-white/10 bg-white/5 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded border-white/10 bg-white/5 text-white"
          required
        />
        <Button variant="default" className="bg-qb-green hover:bg-qb-green/90 text-white font-bold" type="submit">
          Continue with Email
        </Button>
      </form>
      <div className="relative my-2">
        <hr className="border-white/10" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131313] px-2 text-xs text-white/40">OR</span>
      </div>
      <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white" onClick={handleGoogleAuth}>
        Continue with Google
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
