"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { createSession, FormState } from "../actions/session";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
    >
      {pending ? "Creating session..." : "Continue"}
    </button>
  );
}

const initialState: FormState = {
  success: false,
  message: "",
  validation: null,
  data: null,
  errors: null,
};

export function LogInForm() {
  const [state, formAction] = useFormState(createSession, initialState);
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      state.validation && console.error("validation errors:", state.validation);
      state.errors && console.error("action errors:", state.errors);
    }
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="bg-white shadow rounded p-6">
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border rounded py-2 px-3 text-black"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border rounded py-2 px-3 text-black"
        />
        {state.errors?.password && (
          <p className="text-red-500 text-xs mt-1">
            {state.errors.password[0]}
          </p>
        )}
      </div>
      <div className="mb-6">
        <SubmitButton />
      </div>
      {state.message && (
        <p
          className={`text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}
        >
          {state.message}
        </p>
      )}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}
