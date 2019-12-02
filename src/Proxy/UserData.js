import {ulid} from "ulid";
import Server from "./MockServer/Server";

const USER_TOKEN = "userToken";
const storeJWTToken = (token) => {
  return localStorage.setItem(USER_TOKEN, token);
};
const getJWTToken = () => {
  return localStorage.getItem(USER_TOKEN);
};
const clearToken = () => {
  return localStorage.clear();
};
const submitMessage = (messageObj) => {
  messageObj.id = ulid();
  return Server.addMessages(messageObj).then(() => {
    return true;
  },(e) => {
    console.error(e);
    return false;
  });
};
const getStatus = () => {
  let token  = getJWTToken();
  if (token) {
    return Server.getUserInfoByJoken(token);
  } else {
    return null;
  }
};
const signIn = async (username, pwd) => {
  let result = await Server.signIn(username, pwd);
  if (result) {
    let token = result.token;
    if (token) {
      storeJWTToken(token);
    }
    delete result.token;
  }
  return result;
};
const usernameCheck = (username) => {

};
const signOut = () => {
  return clearToken();
}
const signUp = async (paramObj) => {
  let ret = await Server.addNewUser(paramObj);
  if (ret ||  ret.errorCode === -1) {
    storeJWTToken(ret.token);
  }
  return {errorCode: ret.errorCode};
};
export {submitMessage, signIn, signUp, signOut, usernameCheck, getStatus};
