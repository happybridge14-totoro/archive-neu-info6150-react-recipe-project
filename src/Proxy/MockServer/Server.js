import JWT from "./Libraries/JWT";
import indexDB from "./Libraries/IndexDB";
const jsSHA = require("jssha");

const DBNAME = "recipe6150team3";
const STORAGENAME = "customers";
const RATERECORD = "raterecords";
const MESSAGES = "messages";

const customersDB = indexDB(DBNAME, STORAGENAME);
const rateitDB = indexDB(DBNAME, RATERECORD);
const messageDB = indexDB(DBNAME, MESSAGES);

const encryptPWD = (pwd) => {
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(pwd);
    pwd = shaObj.getHash("B64");
    return pwd;
};
const checkPasswordAndGetUserInfo = async (username, pwd) => {
  const data = await customersDB.getItem(username);
  if (data && data.pwd === encryptPWD(pwd)) {
    return data;
  }
  return null;
};

const Server = {
  addNewUser: async (userObj) => {
    const data = await customersDB.getItem(userObj.username);
    let errorCode = -1;
    let token = "";
    if (!data) {
      userObj.pwd = encryptPWD(userObj.pwd);
      const ret = await customersDB.setItem(userObj.username, userObj);
      if (ret) {
        token = JWT.encrypt({
          username: userObj.username,
          nickname: userObj.nickname
        });
      } else {
        errorCode = 2;
      }
    } else {
      errorCode = 1;
    }
    return {
      token: token,
      errorCode: errorCode
    };
  },
  addMessages: async (messageObj) => {
    return await messageDB.setItem(messageObj.id, messageObj);
  },
  getUserInfoByJoken: (token) => {
    return JWT.getInfoByToken(token);
  },
  signIn: async (username, pwd) => {
    const userInfo = await checkPasswordAndGetUserInfo(username, pwd);
    if (userInfo) {
      let infoObj = {
        username: userInfo.username,
        nickname: userInfo.nickname
      };
      infoObj.token = JWT.encrypt(infoObj);
      return infoObj;
    } else {
      return null;
    }
  },
  getRating: async (token, itemId) => {
    try {
      const {username} = JWT.getInfoByToken(token);;
      let shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(username + ";" + itemId);
      const hash = shaObj.getHash("HEX");
      return rateitDB.getItem(hash);
    } catch(e) {
      console.error(e);
      return "0";
    }
  },
  rateIt: async (token, itemId, score) => {
    try {
      const {username} = JWT.getInfoByToken(token);;
      let shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(username + ";" + itemId);
      const hash = shaObj.getHash("HEX");
      return rateitDB.setItem(hash, score);
    } catch(e) {
      console.error(e);
    }
  }
};
export default Server;
