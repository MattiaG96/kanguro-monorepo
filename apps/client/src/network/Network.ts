import { ClientError } from './ClientError';

const toJSON = (response: any) => response.json();

const getBodyFromResponse = async (response: any) => {
  try {
    return await response.json();
  } catch (e) {
    return 'No body';
  }
};

const handleErrors = async (response: any) => {
  if (!response.ok) {
    const body = await getBodyFromResponse(response);
    if (response.status === 500) {
      throw new ClientError(body);
    }
    throw new Error(`Unexpected error: ${JSON.stringify(response)}${body}`);
  }
  return response;
};

const jsonFetch = async <T>(
  url: string,
  method: string,
  body?: object,
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  };

  const request: RequestInit = {
    method,
    headers,
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  return await fetch(url, request).then(handleErrors).then(toJSON);
};

export const get = async <T>(url: string) => jsonFetch<T>(url, 'GET');

export const post = async <T>(url: string, body?: object) =>
  jsonFetch<T>(url, 'POST', body);
