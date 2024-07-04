import { getEnvSafely } from "./config";

declare global {
  var env: {
    NODE_ENV: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    EXPIRATION_TIME: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    // APPLE_CLIENT_ID?: string;
    // APPLE_CLIENT_SECRET?: string;
  };
}

// Ensure global.env is defined only once
global.env = global.env || {
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

const env = global.env;

export default env;
