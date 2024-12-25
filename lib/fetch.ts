import { signOut } from 'next-auth/react';

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  token?: string;
  formData?: Record<string, any>;
  multipart?: boolean;
};

export type APIResponse = {
  status: number;
  data?: any;
  msg?: string;
};

export default async function fetchData(
  path: string,
  options?: Options
): Promise<APIResponse> {
  const base =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
  const apiKey =
    process.env.NEXT_PUBLIC_BACKEND_TOKEN ?? process.env.BACKEND_TOKEN ?? '';

  const headers: HeadersInit = {
    'x-api-key': apiKey,
    Authorization: (options?.token && `Bearer ${options?.token}`) || ''
  };

  let body: BodyInit | null = null;

  if (options?.formData) {
    const formData = options.formData;

    if (options?.multipart) {
      body = new FormData();

      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          // For array fields
          formData[key].forEach((file: any) => {
            if (body instanceof FormData) {
              body.append(key, file);
            }
          });
        } else {
          // For non-array fields
          body.append(key, formData[key]);
        }
      }
    } else {
      body = JSON.stringify(formData);
      headers['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(`${base}${path}`, {
    method: options?.method || 'GET',
    headers,
    body: options?.formData && body,
    cache: 'no-store'
  });

  if (response.status === 401) {
    signOut().catch(() => null);

    throw new Error(`Unauthorized: ${path}`);
  }

  const data = await response.json();

  return data;
}
