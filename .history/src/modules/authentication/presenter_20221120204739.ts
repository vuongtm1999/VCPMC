import store, { TokenSelector } from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import profileStore, { getUserProfile, setToken, setUID } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  await authenticationRepository.login(payload);

  const token = await FirebaseConfig.auth.currentUser?.getIdToken();

  store.dispatch(setToken({ token, remember }));

  return token;
};

authenticationPresenter.getProfile = ():any => {

  store.dispatch(getUserProfile() as unknown as AnyAction).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });

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
