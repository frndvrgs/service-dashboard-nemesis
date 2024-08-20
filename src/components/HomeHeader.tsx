"use client";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export const HomeHeader = () => {
  const { user } = useUser();

  return (
    <header className="text-white h-16 flex items-center">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/account">My Account</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
