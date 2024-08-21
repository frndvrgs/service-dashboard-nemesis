"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { settings } from "@/settings";
import { cookieTools } from "@/utils/cookieTools";

const { API } = settings;

export type FormState = {
  success: boolean;
  validation?: {
    email?: string[];
    password?: string[];
  } | null;
  message: string;
  data?: any;
  errors?: any;
};

const accountSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const validateFields = (formData: FormData) => {
  return accountSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
};

const setCookiesFromResponse = (response: Response) => {
  const cookieStore = cookies();
  const cookieHeader = response.headers.get("set-cookie");
  if (cookieHeader) {
    // backend is sending signed cookies altogether in one header
    const parsedCookies = cookieTools.parseSignedHeader(cookieHeader, "user");
    for (const [key, options] of Object.entries(parsedCookies)) {
      cookieStore.set(key, options.value, options);
    }
  }
};

export async function createSession(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = validateFields(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      validation: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the validation errors above.",
    };
  }

  try {
    const response = await fetch(
      `${API.CMS.HOST}${API.CMS.USER.ENDPOINT_SESSION_CREATE}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating session:", errorData);
      return {
        success: false,
        errors: errorData,
        message:
          errorData.message || "Failed to create session. Please try again.",
      };
    }

    const responseData = await response.json();
    setCookiesFromResponse(response);

    return {
      success: true,
      message: "Session created successfully!",
      data: responseData,
    };
  } catch (error) {
    console.error("Error creating session:", error);
    return {
      success: false,
      errors: error instanceof Error ? error.stack : String(error),
      message: "Failed to create session. Please try again later.",
    };
  }
}
