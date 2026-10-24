// storewith persistence configuration

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

import todoReducer from "./todoSlice";

const storePersistConfig = {
  key: "root",
  storage,
  whitelist: ["td"],
};

const rootReducer = combineReducers({
  td: todoReducer,
});

const persistedReducer = persistReducer(
  storePersistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };


// Regular Store configuration without persistence

// import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "./todoSlice";

// const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
// });

// export default store;
