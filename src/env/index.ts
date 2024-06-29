"use server";

import { getEnvSafely } from "./config";

const env = {
  API_URI: process.env.API_URI,
};

export default env;
