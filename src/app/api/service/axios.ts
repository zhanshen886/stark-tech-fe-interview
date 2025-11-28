// src/api/axios.ts
import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3001', // API的基础路径
  timeout: 10000, // 请求超时时间
});

export default instance;
