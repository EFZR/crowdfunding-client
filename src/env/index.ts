import { getEnvSafely } from "./config";

const env = {
  DATABASE_URL: getEnvSafely("DATABASE_URL"),
  JWT_SECRET: getEnvSafely("JWT_SECRET"),
  AUTH_URI: getEnvSafely("AUTH_URI"),
  TOKEN_URI: getEnvSafely("TOKEN_URI"),
  USER_INFO_URI: getEnvSafely("USER_INFO_URI"),
  CLIENT_ID: getEnvSafely("CLIENT_ID"),
  CLIENT_SECRET: getEnvSafely("CLIENT_SECRET"),
  REDIRECT_URI: getEnvSafely("REDIRECT_URI"),
  RESPONSE_TYPE: getEnvSafely("RESPONSE_TYPE"),
  SCOPE: getEnvSafely("SCOPE"),
  STATE: getEnvSafely("STATE"),
  INCLUDE_GRANTED_SCOPES: getEnvSafely("INCLUDE_GRANTED_SCOPES"),
  GRANT_TYPE: getEnvSafely("GRANT_TYPE"),
};

export default env;
