import Taro from "@tarojs/taro";
import { lazyLoadingTimeout } from "@/config/apiConfig";
import { transSuccess, transError } from "./transform";

/**
 * 请求扩展配置
 * 实际请求时默认会在被delete
 */
export interface RequestExtData {
  extConfig?: {
    showToast?: boolean // 错误时是否显示toast
    toastOptions?: Taro.showToast.Option
    showLoading?: boolean // 是否显示loading
    loadingOptions?: Taro.showLoading.Option
  }
}

/**
 * lazyLoadingTimer Loading层加载delay计时器
 * lazyLoadingTimes Loading层实际打开次数
 */
let [lazyLoadingTimer, lazyLoadingTimes]: [NodeJS.Timeout | null, number] = [
  null,
  0,
];
/**
 * 接口请求loading
 */
export function RequestLoading() {
  return (target: Function) => {
    Reflect.ownKeys(target).forEach((propertyKey) => {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);

      if (
        descriptor &&
        descriptor.writable &&
        typeof descriptor.value === "function"
      ) {
        target[propertyKey] = async function (...args: any[]) {
          let { extConfig }: RequestExtData = args[0] || {};
          if (extConfig) {
            delete args[0].extConfig; // 删除扩展配置
          } else {
            extConfig = {}; // 防止解构报错
          }

          const { showLoading = true, loadingOptions = {} } = extConfig;
          if (showLoading) {
            lazyLoadingTimer = setTimeout(() => {
              Taro.showLoading({
                title: "加载中",
                mask: true,
                ...loadingOptions,
              });
              ++lazyLoadingTimes;
            }, lazyLoadingTimeout);
          }

          try {
            const res = await descriptor.value.apply(this, args);
            return res;
          } catch (error) {
            const err = transError(error);
            const { showToast = true, toastOptions = {} } = extConfig;
            if (showToast) {
              setTimeout(() => {
                Taro.showToast({
                  title: err.message,
                  icon: "none",
                  duration: 1500,
                  ...toastOptions,
                });
              }, 0);
            }
            throw error;
          } finally {
            if (lazyLoadingTimer) clearTimeout(lazyLoadingTimer);
            lazyLoadingTimes = --lazyLoadingTimes > 0 ? lazyLoadingTimes : 0;
            if (!(lazyLoadingTimes > 0)) Taro.hideLoading();
          }
        };
      }
    });
  };
}

export function ResponseCache() {
  return (target: Function) => {
    Reflect.ownKeys(target).forEach((propertyKey) => {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);

      if (
        descriptor &&
        descriptor.writable &&
        typeof descriptor.value === "function"
      ) {
        target[propertyKey] = async function (...args: any[]) {
          try {
            const res = await descriptor.value.apply(this, args);
            return transSuccess(res);
          } catch (error) {
            throw transError(error);
          }
        };
      }
    });
  };
}

// export default function TransData() {
//     return (target: object, key: string, descriptor: PropertyDescriptor) => {
//         const fn = descriptor.value;
//         descriptor.value = async function <T>(...args: any): Promise<TranRes<T>> {
//             try {
//                 console.log(`request  platform:${key}===>`, args);
//                 const result = await fn.apply(this, args);
//                 console.log(`success  platform:${key}===>`, result);
//                 return transSuccess(result);
//             } catch (error) {
//                 const err = transError(error, TransCode.ERROR, error);
//                 console.warn(`error  platform:${key}===>`, err);
//                 Vue.$vux.toast.show(err.message);
//                 throw err;
//             }
//         };
//     };
// }
