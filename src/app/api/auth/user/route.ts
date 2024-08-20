import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const idAccount = userCookie.value;

  const userData = {
    idAccount,
  };

  return NextResponse.json(userData);
}
