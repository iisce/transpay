"use client";
import { AuthForm } from "@/components/forms/authForm";
import { passwordIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full">
      <h2 className="text-h5Bold">Login to your Account</h2>
      <div className="mt-1">
        <AuthForm detail="E-mail" type="email" />
        <AuthForm detail="Password" type="password" icon={passwordIcon} />
        <div className="mt-3">
          <input type="checkbox" name="auth" />
          <label htmlFor="auth" className="text-[13px] ml-1">
            Remember me
          </label>
        </div>
        <button className="mt-5 w-full bg-primary-900 rounded-[14px] h-10 text-white">
          Login
        </button>
        <p className="text-[12px] text-center">
          Forgotten your password?{" "}
          <Link className="text-primary-900 font-bold" href="/auth/emailinput">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}
