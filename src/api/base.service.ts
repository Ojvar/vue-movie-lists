import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axios.get(url, config);
}
