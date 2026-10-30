/**
 * API Client with auth headers, interceptors, and error handling.
 * Compatible with both React Native (Expo) and Web runtime.
 */
export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null = 'mock-jwt-bearer-token-expo-reader';

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`, 'http://localhost');
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          url.searchParams.append(key, String(val));
        }
      });
    }
    return endpoint.startsWith('http') ? url.toString() : `${url.pathname}${url.search}`;
  }

  public async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, headers, ...customConfig } = config;
    const url = this.buildUrl(endpoint, params);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    if (this.authToken) {
      defaultHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    const mergedHeaders = {
      ...defaultHeaders,
      ...(headers as Record<string, string>)
    };

    try {
      const response = await fetch(url, {
        ...customConfig,
        headers: mergedHeaders
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          errorBody.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      console.warn(`[ApiClient Error] ${config.method || 'GET'} ${endpoint}:`, error);
      throw error;
    }
  }

  public get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET', params });
  }

  public post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }
}

export const apiClient = new ApiClient('');
