export const getRecipientUrl = (
  serviceName: string,
  baseRecipientUrl: string,
  originalUrl: string
) => {
  if (serviceName === "products") {
    return `${baseRecipientUrl}${originalUrl}`;
  }
  if (serviceName === "cart") {
    const suffixUrl = originalUrl.replace('/cart', "")
    console.log(suffixUrl);
    return `${baseRecipientUrl}${suffixUrl}`;
  }

};
