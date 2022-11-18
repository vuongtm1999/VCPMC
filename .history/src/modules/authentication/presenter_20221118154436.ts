import store from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import profileStore, { setToken } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  await authenticationRepository.login(payload);

  const token = await FirebaseConfig.auth.currentUser?.getIdToken();

  store.dispatch(setToken({ token, remember }));

  return token;
};

authenticationPresenter.getProfile = () => {
  const item = localStorage.getItem('persist:CMS-Company_name');

  console.log(item.then(data => console.log(data)));

  // if (user) {
  // return authenticationRepository.getProfile().then((user: UserEntity) => {
  //   // 'UserEntity': userName, userFullName, id, createdAt, updateAt
  //   store.dispatch(profileStore.actions.fetchProfile({ user }));
  //   return Promise.resolve(user);
  // });
  // } else {
  //   // No user is signed in.
  // }
};

export default authenticationPresenter;
