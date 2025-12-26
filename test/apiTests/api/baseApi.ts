import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../data/constants";
import { getAuthHeader } from "../utils/auth";

// BaseApi is a reusable HTTP client wrapper for making API requests
// It sets up an Axios instance with base URL, authorization, and JSON headers
export class BaseApi {
  // The Axios client instance used for requests
  protected client: AxiosInstance;

  constructor() {
    // Create an Axios client with default config for all requests
    this.client = axios.create({
      baseURL: BASE_URL, // Base URL for all API requests
      headers: {
        ...getAuthHeader(), // Adds Authorization header with a unique Bearer token
        "Content-Type": "application/json" // Sets content type to JSON
      },
      validateStatus: () => true // Always resolve the promise, even for error HTTP status
    });
  }

  // Helper method for making GET requests with optional query params
  protected async get(url: string, params?: any) {
    return this.client.get(url, { params });
  }
}
