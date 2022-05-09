import { combineReducers } from "redux";
import { auth } from "./auth";
import { category } from "./category";
import { globalState } from "./globalState";
import { lang } from "./lang";
import { loading } from "./loading";
import { products } from "./products";

export const rootReducer = combineReducers({
  auth: auth,      
  loading: loading,
  lang: lang,      
  products: products,
  globalState: globalState,
  category: category,
});
