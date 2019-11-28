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

let shaObj = new jsSHA("SHA-256", "TEXT");
const encryptPWD = (pwd) => {
    shaObj.update(pwd);
    pwd = shaObj.getHash("B64");
    return pwd;
};

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
      username: "test1",
      nickname: "Tester 3",
      pwd: "111111"
    }];
    Promise.all(testData.map((v) => {
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
  checkPassword: (username, pwd) => {
    return customersDB.getItem(username).then((data) => {
      let ret = false;
      if (data) {
        ret = data.pwd === encryptPWD(pwd);
      }
      return ret;
    });
  },
  addNewUser: (userObj) => {
    return customersDB.getItem(userObj.username).then((data) => {
      if (data) {
        Promise.reject("User exists");
      }
      return null;
    }).then(() => {
      userObj.pwd = encryptPWD(userObj.pwd);
      return customersDB.setItem(userObj.username, userObj);
    });
  },
  addMessages: (messageObj) => {
    return messageDB.setItem(messageObj.id, messageObj);
  }
};
export default Server;
