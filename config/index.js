//  NEXT_PUBLIC makes the env variable visible on the client
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const POST_PER_PAGE = 6;

export const CATEGORIES = [
  { id: 1, name: "Drama" },
  { id: 2, name: "Creepy Pasta" },
  { id: 3, name: "True Scary Story" },
  { id: 4, name: "Suspense" },
  { id: 5, name: "Romance" },
  { id: 6, name: "Paranormal" },
  { id: 7, name: "Ghost Story" },
  { id: 8, name: "Other" },
];
