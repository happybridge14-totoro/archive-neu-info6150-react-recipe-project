import {ulid} from "ulid";
import Server from "./MockServer/Server";

const submitMessage = (messageObj) => {
  messageObj.id = ulid();
  return Server.addMessages(messageObj).then(() => {
    return true;
  },(e) => {
    console.error(e);
    return false;
  });
}
const signin = (username, pwd) => {

};
const usernameCheck = (username) => {

};
const signup = (username, pwd) => {

};
export {submitMessage, signin, signup, usernameCheck};
