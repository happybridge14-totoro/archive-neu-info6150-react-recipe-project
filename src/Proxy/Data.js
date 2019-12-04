import items from "../data/items.json";
import contactInfo from "../data/contactInfo.json";
import categories from "../data/categories.json";

const getIDMaker = (id, target)=> {
  for (let i = 0; i < target.length; i++) {
    if (target[i].id === id.toString()) {
      return target[i];
    }
  }
  return null;
};
const getError = () => {
  const luckyItem = items[Math.floor(Math.random() * items.length)];
  const relatedCategory = getCategoryById(luckyItem.categoryId);
  return {
    "name": luckyItem.shortName,
    "imageURL": luckyItem.imageURL,
    "link": `/detail/${luckyItem.id}`,
    "category": relatedCategory.name,
    "categoryLink": `/category/${relatedCategory.id}`
  };
};
const getItem = () => {
  return items;
};
const getContractInfo = () => {
  return contactInfo;
};
const getCategories = () => {
  return categories;
};
const getItemById = (id) => {
  return getIDMaker(id, items);
};
const getCategoryById = (id) => {
  return getIDMaker(id, categories);
};
const getItemsByCategoryId = (id) => {
  return items.filter((v)=>{
    return v.categoryId === id;
  });
};
const getItemsByCategoryIds = (ids) => {
    if (!(ids && ids.length)) {
        throw new Error("Params should be an array!");
    }
    let hash = {};
    let ret = [];
    ids.forEach((v, i) => {
        hash[v] = i;
        ret[i] = [];
    });
    items.forEach((v) => {
        const index = hash[v.categoryId];
        if (index === undefined) {
            return;
        }
        ret[index].push(v);
    });
    return ret;
};
const getItemsByTag = (tag) => {
  return items.filter((v) => {
    return v.tags && v.tags.indexOf(tag) > -1;
  });
};
const getMostPopularItems = (count=3) => {
  let length = items.length;
  let ret = [];
  let luckyIndex = Math.floor(Math.random() * (length - count));
  for (let i = 0; i < count; i++) {
    ret.push(items[luckyIndex + i]);
  }
  return ret;
};
let searchCache = {};
let lruCacheAry = [];
const search = (keyWord) => {
  let result = [];
  if (searchCache[keyWord]) {
    result = searchCache[keyWord];
    const index = lruCacheAry.indexOf(keyWord);
    lruCacheAry.splice(index, 1);
  } else {
    const filteredCategories = categories.filter((v)=> {
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

export {getItem, getContractInfo, getCategories, getCategoryById, getItemById, getItemsByCategoryId, getItemsByCategoryIds, search, getError, getItemsByTag, getMostPopularItems};
