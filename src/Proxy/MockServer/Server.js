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
  let data = await customersDB.getItem(username);
  if (data && data.pwd === encryptPWD(pwd)) {
    return data;
  }
  return null;
};

// const checkPassword = async (username, pwd) => {
//   let data = await customersDB.getItem(username);
//   let ret = false;
//   if (data) {
//       ret = data.pwd === encryptPWD(pwd);
//   }
//   return ret;
// };

const Server = {
  test: () => {
    // let test = {"a": "hello"};
    // let c = JWT.encrypt(test);
    // let zz = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzMyJ9.jWFHtIB3_n7qaQPurcuYlvF_IutNp_zGH8LDUBySIKc";
    // // let b = JWT.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzMyJ9.AL_7wBjAXM9djXUTe5I4OX40DSdq-4aG-lNWI-NVsxQ", "33");
    // let b = JWT.verify(zz, "33");
    // console.log(b);
    const testData = [{
      username: "test1",
      nickname: "Tester 1",
      pwd: "111111"
      }, {
      username: "test2",
      nickname: "Tester 3",
      pwd: "111111"
    }];
    return Promise.all(testData.map((v) => {
      v.pwd = encryptPWD(v.pwd);
      return customersDB.setItem(v.username, v);
    })).then((r) => {
      console.log("here?")
      console.log(r);
    }).then(() => {
      return customersDB.getItem("test1");
    }).then((v) => {
      console.log("get");
      console.log(v);
    });
  },

  addNewUser: async (userObj) => {
    let data = await customersDB.getItem(userObj.username);
    if (data) {
      Promise.reject("User exists");
    } else {
      userObj.pwd = encryptPWD(userObj.pwd);
      return await customersDB.setItem(userObj.username, userObj);
    }

    // return customersDB.getItem(userObj.username).then((data) => {
    //   if (data) {
    //     Promise.reject("User exists");
    //   }
    //   return null;
    // }).then(() => {
    //   userObj.pwd = encryptPWD(userObj.pwd);
    //   return customersDB.setItem(userObj.username, userObj);
    // });
  },
  addMessages: async (messageObj) => {
    return await messageDB.setItem(messageObj.id, messageObj);
  },
  getUserInfoByJoken: (token) => {
    return JWT.getInfoByToken(token);
  },
  signIn: async (username, pwd) => {
    let userInfo = await checkPasswordAndGetUserInfo(username, pwd);
    if (userInfo) {
      let infoObj = {
        username: userInfo.username,
        nickname: userInfo.nickname
      };
      let jwtToken = JWT.encrypt(infoObj);
      infoObj.token = jwtToken;
      return infoObj;
    } else {
      return null;
    }
  }
};
export default Server;
