// src/api/index.ts
import instance from './axios';

// 封装GET请求
export const get = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response = await instance.get<T>(url, { params });
    return response.data;
  } catch (error) {
    // 处理错误，例如抛出或返回错误信息
    throw error;
  }
};

// 封装POST请求
export const post = async <T>(url: string, data?: object): Promise<T> => {
  try {
    const response = await instance.post<T>(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 封装POST请求
export const patch = async <T>(url: string, data?: object): Promise<T> => {
  try {
    const response = await instance.patch<T>(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};