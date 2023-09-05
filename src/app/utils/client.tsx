import { HttpMethod } from "./types";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

async function fetchClient(
  method: HttpMethod,
  path: string,
  options?: RequestInit
): Promise<Response> {
  const defaultOptions: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, defaultOptions);
  return response;
}

export default fetchClient;
