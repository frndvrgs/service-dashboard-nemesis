"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export const DashboardHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="text-white h-16 flex items-center">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/works">My Works</Link>
          <Link href="/dashboard/create-work">Create Work</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/account">My Account</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};
