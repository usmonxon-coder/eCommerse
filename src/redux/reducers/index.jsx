import { combineReducers } from "redux";
import { auth } from "./auth";
import { category } from "./category";
import { globalState } from "./globalState";
import { history } from "./history";
import { lang } from "./lang";
import { loading } from "./loading";
import { products } from "./products";

export const rootReducer = combineReducers({
  auth,
  loading,
  lang,
  products,
  globalState,
  category,
  history,
});
