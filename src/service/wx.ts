import Taro from "@tarojs/taro";
import { MapObj } from "@/types";
import { baseUrl } from "@/config/apiConfig";
import { request, RequestLoading, ResponseCache } from "./request";

export interface LoginRequest {
  type: string
  detail: {
    errMsg: string
    encryptedData: string
    iv: string
    rawData: string
    signature: string
    userInfo: MapObj
  }
}

export interface UploadImageRequest {
  filePath: string
  formData?: MapObj
  name?: string
}

@ResponseCache()
@RequestLoading()
export default class WxApi {
  static async login(data: LoginRequest) {
    const { detail } = data;
    const { code } = await Taro.login();

    return request({
      url: "/api/wx/login",
      data: {
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        openId: code,
        unionId: null,
      },
      method: "POST",
    });
  }

  static async uploadImage(data: UploadImageRequest) {
    const { filePath, formData = {}, name = "file" } = data;
    return Taro.uploadFile({
      url: `${baseUrl}/api/wx/upload-image`,
      filePath,
      name,
      formData: { ...formData },
      // header: {
      //     'content-type': 'multipart/form-data'
      // }
    });
  }
}
