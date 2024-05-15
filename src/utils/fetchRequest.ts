import {userToken} from '../services/api';
interface RequestOptions {
  method?: string;
  headers: Record<string, string>;
  body?: BodyInit | null;
}

interface RefreshData {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

interface FetchResponse {
  ok: boolean;
  json: () => Promise<any>;
  status: number;
}
export const checkResponse = (res:FetchResponse): Promise<any> => {
    if (res.ok) {
        return res.json()
    }
    console.log(res);
    return Promise.reject(`Ошибка ${res.status}`);
}
export const request = async (url:string, options:RequestOptions) => {
    const res = await fetch(url, options);
    return checkResponse(res);
}
export const refreshToken = (): Promise<any> =>  {
  return fetch(`${userToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options:RequestOptions) => {
  try {
    const res = await request(url, options);
    console.log(res);
    return res;
  } catch (err) {
    if (err instanceof Error && (err.message === "jwt expired" || err.message === "jwt malformed")) {
      const refreshData:RefreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers['Authorization'] = `Bearer ${refreshData.accessToken}`; // Ensure the Authorization scheme is correct
      const res = await request(url, options); // Repeat the request with the new token
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
