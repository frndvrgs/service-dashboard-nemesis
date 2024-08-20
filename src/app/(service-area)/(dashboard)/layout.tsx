"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardHeader } from "@/components/DashboardHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <DashboardHeader />
      <main className="border-t border-gray-800 pb-16 pt-16">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
