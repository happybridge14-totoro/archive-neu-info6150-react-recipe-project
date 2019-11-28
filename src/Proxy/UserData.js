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
export {submitMessage};
