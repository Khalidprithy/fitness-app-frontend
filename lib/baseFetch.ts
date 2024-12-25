import { auth } from '@/auth';
import { getSession } from 'next-auth/react';

type BaseFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  isFormData?: boolean;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
};

const getAccessToken = async (): Promise<string | null> => {
  if (typeof window !== 'undefined') {
    // Client-side
    const session = await getSession();
    return session?.user?.accessToken || null;
  } else {
    // Server-side
    const session = await auth();
    return session?.user?.accessToken || null;
  }
};

export const baseFetch = async (
  url: string,
  options: BaseFetchOptions = { method: 'GET' },
  req?: any,
  res?: any
): Promise<any> => {
  const base =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
  const apiKey =
    process.env.NEXT_PUBLIC_BACKEND_TOKEN ?? process.env.BACKEND_TOKEN ?? '';

  const token: string | null = await getAccessToken();

  const {
    method = 'GET',
    body,
    isFormData,
    params,
    headers = {},
    ...restOptions
  } = options;

  // Build the query string if params are provided
  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  // Construct the full URL with query string
  const fullUrl = `${base}${url}${queryString}`;

  // Set headers
  const customHeaders: HeadersInit = {
    'x-api-key': apiKey,
    ...headers
  };

  if (token) {
    customHeaders['Authorization'] = `Bearer ${token}`;
  }

  if (!isFormData) {
    customHeaders['Content-Type'] = 'application/json';
  }

  const requestInit: RequestInit = {
    method,
    headers: customHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    ...restOptions
  };

  try {
    const response = await fetch(fullUrl, requestInit);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Error: ${response.status} - ${response.statusText}. Message: ${
          errorResponse?.message || 'Unknown error'
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// import { auth } from '@/auth';
// import { getSession } from 'next-auth/react';

// type BaseFetchOptions = {
//   method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//   body?: any;
//   isFormData?: boolean;
//   params?: Record<string, string | number | boolean>;
//   headers?: Record<string, string>;
//   retries?: number;
//   retryDelay?: number;
// };

// const getAccessToken = async (): Promise<string | null> => {
//   if (typeof window !== 'undefined') {
//     // Client-side
//     const session = await getSession();
//     return session?.user?.accessToken || null;
//   } else {
//     // Server-side
//     const session = await auth();
//     return session?.user?.accessToken || null;
//   }
// };

// export const baseFetch = async (
//   url: string,
//   options: BaseFetchOptions = { method: 'GET', retries: 3, retryDelay: 100 }, // Default retry settings
//   req?: any,
//   res?: any
// ): Promise<any> => {
//   const base =
//     process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
//   const apiKey =
//     process.env.NEXT_PUBLIC_BACKEND_TOKEN ?? process.env.BACKEND_TOKEN ?? '';

//   const token: string | null = await getAccessToken();

//   const {
//     method = 'GET',
//     body,
//     isFormData,
//     params,
//     headers = {},
//     retries = 3, // Default to 3 retries
//     retryDelay = 100, // Default to 100ms delay for retries
//     ...restOptions
//   } = options;

//   const queryString = params
//     ? '?' + new URLSearchParams(params as Record<string, string>).toString()
//     : '';

//   const fullUrl = `${base}${url}${queryString}`;

//   // Set headers
//   const customHeaders: HeadersInit = {
//     'x-api-key': apiKey,
//     ...headers
//   };

//   if (token) {
//     customHeaders['Authorization'] = `Bearer ${token}`;
//   }

//   if (!isFormData) {
//     customHeaders['Content-Type'] = 'application/json';
//   }

//   const requestInit: RequestInit = {
//     method,
//     headers: customHeaders,
//     body: isFormData ? body : body ? JSON.stringify(body) : undefined,
//     ...restOptions
//   };

//   const performFetch = async (attempt: number): Promise<any> => {
//     try {
//       const response = await fetch(fullUrl, requestInit);

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         throw new Error(
//           `Error: ${response.status} - ${response.statusText}. Message: ${
//             errorResponse?.message || 'Unknown error'
//           }`
//         );
//       }

//       return await response.json();
//     } catch (error) {
//       // If maximum retries reached, throw error
//       if (attempt >= retries) {
//         if (error instanceof Error) {
//           throw new Error(`Failed after ${retries} retries. ${error.message}`);
//         } else {
//           throw new Error(
//             `Failed after ${retries} retries. Unknown error occurred.`
//           );
//         }
//       }

//       const delay = retryDelay * Math.pow(2, attempt);

//       console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);

//       await new Promise((resolve) => setTimeout(resolve, delay));

//       return performFetch(attempt + 1);
//     }
//   };

//   return performFetch(0);
// };
