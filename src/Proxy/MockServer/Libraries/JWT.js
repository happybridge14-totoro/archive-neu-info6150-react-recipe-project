const jsSHA = require("jssha");
const METHOD = {
  "alg": "HS256",
  "typ": "JWT"
};
const METHOD_JSON_BASE64 = window.btoa(JSON.stringify(METHOD));
const secret_Token = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const TEXT = "TEXT";
const EXPIRED_DATE = "expriedDate";
const USERNAME = "username";
const generateThirdPart = (content) => {
  let shaObj = new jsSHA("SHA-256", TEXT);
  shaObj.setHMACKey(secret_Token, TEXT)
  shaObj.update(content);
  let hmac = shaObj.getHMAC("B64");
  hmac = hmac.replace(/([/+=])/g, (match) => {
    if (match === "/")
      return "_";
    else if (match === "+")
      return "-";
    else
      return "";
  });
  return hmac
};
const verifyPayload = (payloadObj, userName) => {
  let ret = false;
  try {
    let expiredTime = payloadObj[EXPIRED_DATE];
    if (expiredTime) {
      ret = (expiredTime > Date.now()) && payloadObj[USERNAME] === userName;
    } else {
      ret = true;
    }
  } catch(e) {
    console.error(e);
  }
  return ret;
};
const encrypt = (payload) => {
  let ret;
  try {
    let payloadBase64 = window.btoa(JSON.stringify(payload));
    payloadBase64 = payloadBase64.replace(/(={0,2})$/, "");
    let contents = METHOD_JSON_BASE64 + "." + payloadBase64;
    let hmac = generateThirdPart(contents);
    ret = contents + "." + hmac;
    } catch(e) {
    console.error(e);
  }
  return ret;
};
const verify = (token, userName=null) => {
  let ret = false;
  try {
    let tokenAry = token.split(".");
    if (generateThirdPart(tokenAry[0] + "." + tokenAry[1]) === tokenAry[2]) {
      let payloadObj = JSON.parse(window.atob(tokenAry[1]));
      if (userName === null) {
        userName = payloadObj[USERNAME];
      } else {
        userName = userName.toString();
      }
      ret = verifyPayload(payloadObj, userName);
    }
  } catch(e) {
    console.error(e);
  }
  return ret;
};
const getInfoByToken = (token) => {
  if (verify(token)) {
    let tokenAry = token.split(".");
    return JSON.parse(window.atob(tokenAry[1]));
  } else {
    return null;
  }
};
const JWT = {
  encrypt: encrypt,
  getInfoByToken: getInfoByToken
};

export default JWT;
