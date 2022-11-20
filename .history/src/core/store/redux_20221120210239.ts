import { Selector } from 'react-redux';
import { applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

import CONFIG from '@config/index';
import appReducer, { RootState } from '@modules/index';
import { configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk"
import promise from 'redux-promise-middleware';

const profile = createWhitelistFilter('profile', ['token', 'UID', 'remember']);
const settingStore = createWhitelistFilter('settingStore', ['language']);
const persistConfig: PersistConfig<RootState> = {
  key: CONFIG.APP_NAME,
  storage,
  blacklist: [],
  transforms: [profile, settingStore],
  whitelist: ['profile', 'settingStore'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);
// const middleware: any = [];
// if (process.env.NODE_ENV === 'development') {
//   middleware.push(logger);
// }

const store = configureStore(
  persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['add', 'delete', "update"],
       // Ignore these paths in the state
      ignoredPaths: ['book'],
    },
  }),
});

export const persistor = persistStore(store);

export default store;

interface IToken {
  token?: string;
}

interface IUID {
  UID?: string;
}

export const TokenSelector: Selector<RootState, IToken> = state => {
  return {
    token: state.profile.token,
  };
};

export const UIDSelector: Selector<RootState, IUID> = state => {
  return {
    UID: state.profile.UID,
  };
};
