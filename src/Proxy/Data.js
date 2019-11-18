import items from "../data/items.json";
import contactInfo from "../data/contactInfo.json";
import categories from "../data/categories.json";

let getIDMaker = (id, target)=> {
  for (let i = 0; i < target.length; i++) {
    if (target[i].id === id) {
      return target[i];
    }
  }
  return null;
}
let getError = () => {
  let luckyItem = items[Math.floor(Math.random() * items.length)];
  let relatedCategory = getCategoryById(luckyItem.categoryId);
  return {
    "name": luckyItem.shortName,
    "imageURL": luckyItem.imageURL,
    "link": "/",
    "category": relatedCategory.name,
    "categoryLink": `/category/${relatedCategory.id}`
  };
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
    let filteredCategories = categories.filter((v)=> {
      return v.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
    });
    result = items.filter((v)=> {
      return v.title.toLowerCase().indexOf(keyWord.toLowerCase()) > -1 || undefined !== filteredCategories.find((w) => {
        return w.id === v.categoryId;
      });
    });
    if (lruCacheAry.length > 100) {
      lruCacheAry.unshift();
    }
    searchCache[keyWord] = result;
  }
  lruCacheAry.push(keyWord);
  return result;
};

export {getItem, getContractInfo, getCategories, getCategoryById, getItemById, getItemsByCategoryId, search, getError};
