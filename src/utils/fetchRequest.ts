import {userToken} from '../services/api';
import {RequestOptions,RefreshData,ITokenResponse} from '../services/types/storeType'
export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
export const request = async <T>(url: string, options?: RequestOptions): Promise<T> => {
  const res = await fetch(url, options);
  return checkResponse<T>(res);
}

export const refreshToken = (): Promise<ITokenResponse> => {
  return fetch(`${userToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(response => checkResponse<ITokenResponse>(response));
};
export const fetchWithRefresh = async <T>(url: string, options: RequestOptions): Promise<T> => {
  try {
    const res: T = await request<T>(url, options);
    return res;
  } catch (err) {
    if (err instanceof Error && (err.message === "jwt expired" || err.message === "jwt malformed")) {
      const refreshData: RefreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
      const res: T = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};

export async function handleResponse(response: Response, onSuccess: () => void, errorMessage: string): Promise<void> {
  const data = await response.json();
  if (data.payload && data.success) {
    onSuccess();
  } else {
    console.error(`${errorMessage}: ${response}`);
  }
}

