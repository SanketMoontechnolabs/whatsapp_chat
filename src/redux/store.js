import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import AuthReducer from './reducers/AuthReducer'
import LoaderReducer from './reducers/LoaderReducer'
import ChatUserListReducer from './reducers/ChatUserListReducer'
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const persistConfig = {
  key: "admin-panel",
  storage,
};

const rootReducer = combineReducers({ AuthReducer, LoaderReducer,ChatUserListReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = process.env.NODE_ENV === "development" ? [logger] : [];

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

export { store, persistor };
           