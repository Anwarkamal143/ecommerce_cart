export function isValidUrl(url?: string) {
  const regex = new RegExp(
    /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  );
  return regex.test(url || "");
}
export function addProtocol(url: string) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
export function getUrlParts(url: string | undefined) {
  if (url) {
    const vidUrl = new URL(addProtocol(url));
    const hostName = vidUrl.hostname;
    const protocol = vidUrl.protocol;
    const search = vidUrl.search;
    const pathname = vidUrl.pathname;
    let companyName = "";
    if (hostName) {
      if (hostName.includes("www")) {
        companyName = hostName.split(".")[1];
      } else {
        companyName = hostName.split(".")[0];
      }
    }
    return { url, hostName, companyName, protocol, search, pathname };
  }
  return {
    url,
    hostName: "",
    companyName: "",
    protocol: "",
    search: "",
    pathname: "",
  };
}
