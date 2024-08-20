"use server";

import { z } from "zod";
import { settings } from "@/settings";

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

export async function createAccount(
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
      `${API.AETHER.v1.HOST}${API.AETHER.v1.GRAPHQL}`,
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
          errorData.message || "Failed to create account. Please try again.",
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: "Account created successfully!",
      data: responseData,
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      errors: error instanceof Error ? error.stack : String(error),
      message: "Failed to create account. Please try again later.",
    };
  }
}