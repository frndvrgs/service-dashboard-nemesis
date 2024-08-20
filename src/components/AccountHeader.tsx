"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export const AccountHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="text-white h-16 flex items-center">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <Link href="/account">Overview</Link>
          <Link href="/account/profile">My Profile</Link>
          <Link href="/account/subscription">Subscription</Link>
          <Link href="/account/settings">Settings</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};
