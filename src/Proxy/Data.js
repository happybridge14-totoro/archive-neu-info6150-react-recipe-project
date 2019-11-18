import items from "../data/items.json";
import contactInfo from "../data/contactInfo.json";
import categories from "../data/categories.json";

let getIDMaker = (id, target)=> {
  for (let i = 0; i < target.length; i++) {
    if (target[i].id === id) {
      return target[i];
    }
  }
}

let getItem = () => {
  return items;
};
let getContractInfo = () => {
  return contactInfo;
};
let getCategories = () => {
  return categories;
};
let getItemById = (id) => {
  return getIDMaker(id, items);
}
let getCategoryById = (id) => {
  return getIDMaker(id, categories);
}
let getItemsByCategoryId = (id) => {
  return items.filter((v)=>{
    return v.id === id;
  });
}
let search = (keyWord) => {
  return "";
};

export {getItem, getContractInfo, getCategories, getCategoryById, getItemById, getItemsByCategoryId, search};
