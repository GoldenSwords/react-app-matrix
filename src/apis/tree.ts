import { Methods } from 'src/Constant/System';
import { request } from './request';

export async function loadJurisdictionButton() {
  return request('/jurisdictionButton', {}, Methods.get);
}

export async function loadJurisdictionPage() {
  return request('/jurisdictionPage', {}, Methods.get);
}

export async function loadJurisdictionInterface() {
  return request('/jurisdictionInterface', {}, Methods.get);
}