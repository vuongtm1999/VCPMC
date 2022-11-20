import store, { TokenSelector } from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import { useSelector } from 'react-redux';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import profileStore, { setToken } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  await authenticationRepository.login(payload);

  const token = await FirebaseConfig.auth.currentUser?.getIdToken();
  const uID = await FirebaseConfig.auth.currentUser?.getIdToken();


  store.dispatch(setToken({ token, remember }));
  store.dispatch(setToken({ token, remember }));

  return token;
};

authenticationPresenter.getProfile = ():any => {
  console.log('Test');

  authenticationRepository.getProfile()
    .then((data) => data.data())
    .then((user) => {
      // // 'UserEntity': userName, userFullName, id, createdAt, updateAt
      console.log('Current User', user);
      store.dispatch(profileStore.actions.fetchProfile({ user }));
      return Promise.resolve(user);
    });


  // return authenticationRepository.getProfile().then((user: UserEntity) => {
  //   // 'UserEntity': userName, userFullName, id, createdAt, updateAt
  //   store.dispatch(profileStore.actions.fetchProfile({ user }));
  //   return Promise.resolve(user);
  // });

};

export default authenticationPresenter;