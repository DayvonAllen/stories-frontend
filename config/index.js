//  NEXT_PUBLIC makes the env variable visible on the client
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const APP_URL = process.env.APP_URL || "http://localhost:3000";

export const POST_PER_PAGE = 6;
