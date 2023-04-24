import { getRecipientUrl } from "./helpers/getRecipientServiceURL/getRecipientServiceURL";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const getAxiosConfig = (
  serviceName: string,
  baseRecipientUrl: string,
  originalUrl: string,
  headers: AxiosRequestHeaders,
  method: string,
  body: any
) => {
  const axiosConfig: AxiosRequestConfig = {
    method: method,
    // Unable to forward all headers
    // ==> AxiosError: write EPROTO 8621808448:error:14094410:SSL routines:ssl3_read_bytes:sslv3 alert handshake
    headers: {
      ...(headers.authorization && {
        Authorization: headers.authorization,
      }),
    },
    url: getRecipientUrl(serviceName, baseRecipientUrl!, originalUrl),
    ...(Object.keys(body || {}).length > 0 && { data: body }),
  };
  console.log("[AxiosConfig]", axiosConfig);
  return axiosConfig
};
