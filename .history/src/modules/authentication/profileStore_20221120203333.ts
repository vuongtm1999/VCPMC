import { doc, getDoc } from 'firebase/firestore';
import { createAction, createAsyncThunk, createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { RootState } from '@modules';
import UserEntity from '@modules/user/entity';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

interface IStore {
  statusLogin?: boolean;
  user?: UserEntity;
  listPermissionCode?: Array<string>;
}
export const removeProfile = createAction('authentication/removeProfile');
export const setToken = createAction<{ token: any; remember: boolean }>('authentication/setToken');
export const setUID = createAction<{ uID: any; }>('authentication/setUID');

//My action
const getUserProfile = createAsyncThunk(
  'authentication/getUserProfile',
  async () => {
    //DocID in firestore = UID in
    const docId = FirebaseConfig.auth.currentUser?.uid;

    console.log(docId);
    // DocID = UID
    const userDoc = doc(FirebaseConfig.fbDB, 'Users', docId as string);
    const myDoc = await getDoc(userDoc);
    // return info 
    return myDoc;
    return '';
  },
);


interface IStore {
  statusLogin?: boolean;
  user?: UserEntity;
  listPermissionCode?: Array<string>;
  linkImage?: string;
  token?: string;
  remember: boolean;
  UID: string,
}

const profileStore = createSlice({
  name: 'profileStore',
  initialState: {
    statusLogin: false,
    user: null,
    linkImage: '',
    listPermissionCode: [],
    token: null,
    remember: false,
    UID: '',
  } as unknown as IStore,
  reducers: {
    //Cac ACtion
    fetchProfile: ( //Tao ra 1 action co Payload la "profileStore/fetchProfile"
      //Mutation | Redux co cai san thu vien Immer 
      state,
      action: PayloadAction<{ user?: any; listPermissionCode?: string[] }>,
    ) =>
      Object.assign(state, {
        statusLogin: action.payload.user != null,
        user: action.payload.user,
        listPermissionCode: action.payload.listPermissionCode || [],
      }),
    updateProfile: (
      state,
      action: PayloadAction<{
        listPermissionCode?: string[];
        statusLogin?: boolean;
      }>,
    ) => Object.assign(state, action.payload),
    saveImageGroup: (state, action) => {
      return {
        ...state,
        linkImage: action.payload,
      };
    },
    logOut: (state: any) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(removeProfile, (state: any) => {
        // return ve cho state hien tai
        return {
          ...state,
          statusLogin: false,
          user: null,
          listPermissionCode: [],
          token: null,
          remember: false,
        };
      })
      .addCase(setToken, (state, action) =>
        // return ve cho state hien tai
        Object.assign(state, action.payload, {
          statusLogin: !lodash.isEmpty(action.payload.token),
        }),
      )
      .addCase(getUserProfile.fulfilled.toString(), (state, action) =>
        Object.assign(state, action),
      );
  },
});

interface IToken {
  token: string;
  status: boolean;
}

export const TokenSelector: Selector<RootState, IToken> = state => {
  return {
    token: state.profile.token || '',
    status: state.profile.statusLogin || false,
  };
};

interface IUser {
  user?: UserEntity;
  status: boolean;
}

export const UserSelector: Selector<RootState, IUser> = state => {
  return {
    user: state.profile.user,
    status: state.profile.statusLogin || false,
  };
};

interface IPermissions {
  listPermissionCode: string[];
  status: boolean;
}
export const PermissionsSelector: Selector<RootState, IPermissions> = state => {
  return {
    listPermissionCode: state.profile.listPermissionCode || [],
    status: state.profile.statusLogin || false,
  };
};

export default profileStore;
