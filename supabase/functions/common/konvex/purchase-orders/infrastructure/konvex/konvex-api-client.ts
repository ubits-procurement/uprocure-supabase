export class KonvexApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = 'https://api.getkonvex.com/core/api/') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Secret': 'e510e9c0-8e89-11f0-977a-59b30fea806c:187ace2e9b7e776a9da70e3a9e62590e0635aac9ea816e2c0a026439dd236c4d6208f8c57df9afb5d3e9d1c3b5da76af',
      'x-connection': 'df209190-8e8a-11f0-bc6a-ade58756ec8c'
    };
  }

  /**
   * Makes an HTTP request to the Konvex API
   * @param url The URL to request
   * @param options Additional request options
   * @returns A promise that resolves to the response data
   * @throws {Error} If the request fails
   */
  public async makeRequest<T = any>(url: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      ...this.defaultHeaders,
      ...(options.headers || {})
    };

    const response = await fetch(this.baseUrl + url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        throw new Error(errorMessage, { 
          cause: { 
            status: response.status, 
            ...errorData 
          } 
        });
      } catch (e) {
        throw new Error(errorMessage, { 
          cause: { 
            status: response.status,
            response
          } 
        });
      }
    }

    return response.json();
  }
}
