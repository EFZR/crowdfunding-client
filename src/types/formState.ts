export type FormStateType = "success" | "error";

export type FormStateResult = {
  type: FormStateType;
  message: string;
  errors: Record<string, string[]>;
};

export const initialFormStateValues: FormStateResult = {
  type: "success",
  message: "",
  errors: {},
};
