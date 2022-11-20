import { fbRepositories } from './../../core/repository/AuthenticationRepositoriesImpl';
import httpRepository from '@core/repository/http';
import User from '@modules/user/entity';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

const register = (payload: any) => {
  return httpRepository.execute({
    path: '/auth/register',
    method: 'post',
    payload,
    config: { isPrivate: false },
  });
};
const forgotPass = (payload: any) => {
  return httpRepository.execute({
    path: `api/Users/PasswordRecovery?UserName=${payload.email}`,
    method: 'get',
    showSuccess: false,
    showError: false,
    config: { isPrivate: false },
  });
};

const CheckRecoveryToken = (payload: any) => {
  return httpRepository.execute({
    path: `api/Users/CheckRecoveryToken?recoveryToken=${payload}`,
    method: 'get',
    showSuccess: false,
    showError: false,
    config: { isPrivate: false },
  });
};

const updatePassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/ChangePassword',
    method: 'put',
    payload,
    showSuccess: false,
    showError: false,
    config: { isPrivate: true },
  });
};

export interface ILoginDTO {
  userName: string;
  password: string;
}

const login = (payload: ILoginDTO) => {
  return fbRepositories.excute({
    asyncFunction: signInWithEmailAndPassword,
    payload: payload,
  });

  // return httpRepository.execute({
  //   path: '/api/Users/Login',
  //   method: 'post',
  //   payload,
  //   config: { isPrivate: false },
  // });
};

const logout = () => {
  return fbRepositories.excute({
    asyncFunction: signOut,
  });
  // return httpRepository.execute({
  //   path: '/api/Users/logout',
  //   method: 'get',
  //   showSuccess: false,
  //   config: { isPrivate: true },
  // });
};
const resetPass = (payload: any, otp: string) => {
  return httpRepository.execute({
    path: `/api/Users/resetForgotPassword/key=${otp}`,
    method: 'put',
    payload,
    showSuccess: false,
    showError: false,
    config: { isPrivate: false },
  });
};

const getProfile = async () => {

  // const item = localStorage.getItem('persist:CMS-Company_name');

  // if (item) {
  // const localStore = JSON.parse(item);
  // const profile = JSON.parse(localStore.profile);
  // console.log('MyTest', profile.token);


  onAuthStateChanged(FirebaseConfig.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });



  console.log('Doc ID', docId);
  // DocID = UID
  const userDoc = doc(FirebaseConfig.fbDB, 'Users', docId as string);

  const myDoc = await getDoc(userDoc);

  // return info User
  return myDoc;
  // }
  // return (dispatch: Dispatch<Action>) => {
  //   dispatch({
  //     type: 'getBook',
  //     payload: book,
  //   });
  // };


  // return httpRepository.execute({
  //   path: '/api/Users/Profile',
  //   showSuccess: false,
  //   convert: res => {
  //     return new User(res);
  //   },
  // });
};

const updateProfile = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/Profile',
    method: 'put',
    showSuccess: false,
    payload,
    convert: res => {
      return new User(res);
    },
  });
};

const uploadAvatar = (payload: any) => {
  return httpRepository.execute({
    path: 'api/Users',
    method: 'put',
    payload,
  });
};

const updateProfileUser = (id: any, payload: any) => {
  return httpRepository.execute({
    path: `api/Users/${id}`,
    method: 'put',
    payload,
    config: { isPrivate: true, isFormData: true },
  });
};

export default {
  register,
  login,
  logout,
  resetPass,
  forgotPass,
  CheckRecoveryToken,
  updatePassword,
  getProfile,
  uploadAvatar,
  updateProfile,
  updateProfileUser,
};