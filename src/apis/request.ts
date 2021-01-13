import axios, { CancelToken } from 'axios';
import '../Mock';
import { Methods, Response } from 'src/Constant/System';

export async function request(url: string, params: object, method: Methods, cancelToken?: CancelToken)  {
  if (method === Methods.get) {
    const res = await axios({url, params, method: Methods.get, cancelToken});
    const resData = res.data as Response;
    if (resData.code === 0) {
      return resData.payload;
    }
    return new Error(resData.message);
  }
  const res = await axios({url, data: params, method, cancelToken});
  const resData = res.data as Response;
  if (resData.code === 0) {
    return resData.payload;
  }
  return new Error(resData.message);
}