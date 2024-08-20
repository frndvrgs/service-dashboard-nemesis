"use client";

import { useState, useEffect } from "react";
import { cookieTools } from "@/utils/cookieTools";

interface User {
  idAccount: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = cookieTools.getCookie("user");
    if (!userCookie) return;
    setUser({ idAccount: userCookie });
  }, []);

  return { user };
}
