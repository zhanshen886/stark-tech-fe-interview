import { get, post,patch } from '../service/index';

export interface TodoResponse {
  id: string; // 唯一識別碼 (cuid)
  title: string; // 標題 (1-200 字元)
  completed: boolean; // 完成狀態
  createdAt: string; // 建立時間 (ISO 8601)
  updatedAt: string; // 更新時間 (ISO 8601)
  order?: number; // 排序順序 (可選)
  dueDate?: string; // 到期日 (ISO 8601, 可選)
  notes?: string; // 備註 (可選)
  tags?: string[]; // 標籤陣列 (可選)
}
export interface Request {
  status?: string; 
  search?: string; 
  sortBy?: string; 
  sortDir?: string; 
}
export interface AddTodoListRequestType {
  id?:string,
  title?: string, // 必填 (1-200 字元)
  notes?: string, // 可選
  dueDate?: string, // 可選 (ISO 8601)
  completed?:boolean,
  tags?: [], // 可選
  order?: number // 可選
}
export interface resultType{
    success?:boolean,
    data?: Record<string,any>[]
}
export function getTodoListRequest(params:Request){
    return get('/api/todos',{...params})
}
export function AddTodoListRequest(params:AddTodoListRequestType){
    return post('/api/todos',{...params})
}
export function UpdateTodoListRequest(params:AddTodoListRequestType){
    return patch('/api/todos/'+params.id,{...params})
}