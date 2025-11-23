import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== undefined) {
    const token = localStorage.getItem('token');

    if (token) {
      if (
        config.headers &&
        typeof (config.headers as AxiosHeaders).set === 'function'
      ) {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearee ${token}`
        );
      } else {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        } as any;
      }
    }
  }

  return config;
});

export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.patch<T>(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  },
};

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string }>;
    return ax.response?.data?.message ?? err.message;
  }

  return (err as { message?: string })?.message ?? 'unknown error';
}

export function isAuthErr(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
