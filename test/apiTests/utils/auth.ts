import { v4 as uuidv4 } from "uuid";

// Generates an Authorization header with a unique Bearer token (UUID v4) for each request
export function getAuthHeader() {
  return {
    Authorization: `Bearer ${uuidv4()}`
  };
}
