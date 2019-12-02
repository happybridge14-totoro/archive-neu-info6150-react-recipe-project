import {createContext} from "react";
const PopupContext = createContext("hide");
const SHOW = Symbol("show");
const HIDE = Symbol("hide");
export {PopupContext, SHOW, HIDE};
