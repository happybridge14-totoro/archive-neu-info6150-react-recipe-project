import localforage from 'localforage';

localforage.setDriver(localforage.INDEXEDDB);

class DB {
  constructor(dbName, storeageName) {
    this._instance = localforage.createInstance({
      name: dbName,
      storeName: storeageName
    });
  }
  getItem = async (key) => {
    return this._instance.getItem(key);
  }
  setItem = async (key, value) => {
    return this._instance.setItem(key, value);
  }
  // removeItem = async (key) => {
  //   return this._instance.removeItem(key);
  // }
  // clear = async () => {
  //   return this._instance.clear();
  // }
  getAll = async () => {
    let ret = [];
    return this._instance.iterate((value, key, index) => {
      ret.push([key, value]);
    }).then(() => {
      return ret;
    });
  }
}
let indexDB = (dbName, storeageName) => {
  return new DB(dbName, storeageName);
}
export default indexDB;
