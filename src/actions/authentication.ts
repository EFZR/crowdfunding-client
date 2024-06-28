import { UserLoginForm, UserRegistrationForm } from "../types/authentication";

export async function createAccount(
  userRegistrationForm: UserRegistrationForm
) {
  console.log(userRegistrationForm);
  return "User Created Succesfully";
}

export async function authenticate(userLoginForm: UserLoginForm) {
  console.log(userLoginForm);
  return "Login....";
}
