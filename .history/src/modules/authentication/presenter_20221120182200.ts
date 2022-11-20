import store, { TokenSelector } from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import { useSelector } from 'react-redux';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import profileStore, { setToken, setUID } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  await authenticationRepository.login(payload);

  const token = await FirebaseConfig.auth.currentUser?.getIdToken();
  const uID = await FirebaseConfig.auth.currentUser?.uid;


  store.dispatch(setToken({ token, remember }));
  store.dispatch(setUID({ uID }));

  return token;
};

authenticationPresenter.getProfile = ():any => {

  authenticationRepository.getProfile()
    .then((data) => data.data())
    .then((user) => {
      // // 'UserEntity': userName, userFullName, id, createdAt, updateAt
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
