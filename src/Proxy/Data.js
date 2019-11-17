import items from "../data/items.json";
import contactInfo from "../data/contactInfo.json";

let getItem = () => {
  return items;
};
let getContractInfo = () => {
  return contactInfo;
};

export {getItem, getContractInfo};
