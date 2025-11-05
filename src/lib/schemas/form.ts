import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});
