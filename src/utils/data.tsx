import { v4 as newUUID } from 'uuid';

export function generateUUID(options?: { uppercase?: boolean; length?: number; }) {
  let code = newUUID();
  if (options?.uppercase) {
    code = code.toUpperCase();
  }
  if (options?.length) {
    code = code.substr(0,options?.length)
  }
  return code;
}