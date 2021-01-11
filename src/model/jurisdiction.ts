import { RootState } from ".";

export type jurisdictionType = 'buttons' | 'pages' | 'interfaces';

export interface IDispatch {
  type: string;
  payload: object | string | number;
}