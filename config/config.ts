const NEXT_URL = process.env.NEXT_URL;

const baseUrl =
    typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : NEXT_URL;

const API_URI = process.env.API_URI;

export { baseUrl, API_URI };