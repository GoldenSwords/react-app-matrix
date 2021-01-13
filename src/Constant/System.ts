export enum Methods {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put',
}

export interface Response {
  code: number;
  message: string;
  payload: object | string | number | Array<string> | Array<number>;
}