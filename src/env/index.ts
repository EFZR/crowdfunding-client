import { getEnvSafely } from "./config";

const env = {
  NODE_ENV: getEnvSafely("NODE_ENV"),
  DATABASE_URL: getEnvSafely("DATABASE_URL"),
  JWT_SECRET: getEnvSafely("JWT_SECRET"),
  EXPIRATION_TIME: getEnvSafely("EXPIRATION_TIME"),
  GOOGLE_CLIENT_ID: getEnvSafely("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvSafely("GOOGLE_CLIENT_SECRET"),
  FACEBOOK_CLIENT_ID: getEnvSafely("FACEBOOK_CLIENT_ID"),
  FACEBOOK_CLIENT_SECRET: getEnvSafely("FACEBOOK_CLIENT_SECRET"),
  // APPLE_CLIENT_ID: getEnvSafely("APPLE_CLIENT_ID"),
  // APPLE_CLIENT_SECRET: getEnvSafely("APPLE_CLIENT_SECRET"),
};

export default env;
