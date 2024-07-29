import { ZodSchema } from "zod";
import toast from "react-hot-toast";

export function validateFormData<T>(schema: ZodSchema<T>, data: T) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    const errors: Record<string, string[] | undefined> = fieldErrors;

    // Showing errors.
    Object.entries(errors).forEach(([key, value]) => {
      if (value && value.length > 0) {
        toast.error(value[0]);
      }
    });

    return false;
  }

  return true;
}
