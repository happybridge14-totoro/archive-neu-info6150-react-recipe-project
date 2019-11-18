import items from "../data/items.json";
import contactInfo from "../data/contactInfo.json";
import categories from "../data/categories.json";
import error from "../data/404.json";

let getIDMaker = (id, target)=> {
  for (let i = 0; i < target.length; i++) {
    if (target[i].id === id) {
      return target[i];
    }
  }
}
let getError = () => {
  return error;
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
let searchCache = {};
let lruCacheAry = [];
let search = (keyWord) => {
  let result = [];
  if (searchCache[keyWord]) {
    result = searchCache[keyWord];
    let index = lruCacheAry.indexOf(keyWord);
    lruCacheAry.splice(index, 1);
  } else {
    //todo
    result = [];
    if (lruCacheAry.length > 100) {
      lruCacheAry.unshift();
    }
    searchCache[keyWord] = result;
  }
  lruCacheAry.push(keyWord);
  return result;
};

export {getItem, getContractInfo, getCategories, getCategoryById, getItemById, getItemsByCategoryId, search, getError};
