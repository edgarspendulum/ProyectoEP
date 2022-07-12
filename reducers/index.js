import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { checkoutReducer } from "./checkoutReducer";
import { userReducer } from "./userReducer";
import { processReducer } from "./processReducer";

import { types } from "../type";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui"],
};

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  process: processReducer,
  checkout: checkoutReducer,
  user: userReducer,
  ui: uiReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.logout) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const persistingReducer = persistReducer(persistConfig, rootReducer);
