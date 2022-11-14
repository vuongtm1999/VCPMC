/* eslint-disable indent */
import { ILoginDTO } from './../../modules/authentication/repository';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

function AuthenticationRepositoriesImpl() {
  const auth = FirebaseConfig.auth;

  interface IParamsFirebaseAuth {
    asyncFunction: (...params: any[]) => Promise<any>,
    payload?: ILoginDTO,
  }

  const excute = (
    {
      asyncFunction = () => {
        return new Promise<any>((resolve) => {
          resolve('No function is passed');
        });
      },
      payload,
    }: IParamsFirebaseAuth,
  ) => {
    let args: any[] = [];
    if (payload !== undefined) {
      args = Object.values(payload);
    }

    return asyncFunction?.(auth, ...args);
  };


  return {
    excute,
  };
}

export const fbRepositories = AuthenticationRepositoriesImpl();