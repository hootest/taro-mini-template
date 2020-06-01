import { httpCode, mapCodeMsgKey } from "@/config/apiConfig";

export class CommonResponse<T> {
  code: string | number;
  message: string;
  data: T;
  success: boolean;
  constructor(
    code: string | number,
    message: string,
    data: T,
    success: boolean
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export function transSuccess<T>(data: T): T {
  // if (data instanceof CommonResponse) return data
  // return new CommonResponse(httpCode.SUCCESS, httpCode.SUCCESS_MSG, data)
  return data;
}

export function transError<T>(data: T): CommonResponse<T> {
  if (data instanceof CommonResponse) return data;
  const res = new CommonResponse(
    httpCode.UNKNOW,
    httpCode.UNKNOW_MSG,
    data,
    false
  );
  const mapCodeMsg = [["statusCode", "errMsg"], mapCodeMsgKey];
  if (Object.prototype.toString.call(data) === "[object Object]") {
    for (const [codeKey, msgKey] of mapCodeMsg) {
      if (data[codeKey] !== undefined && data[msgKey] !== undefined) {
        res.code = data[codeKey];
        if (typeof data[msgKey] === "string") {
          res.message = data[msgKey];
        }
        break;
      }
    }
  }
  return res;
}
