/* eslint-disable indent */
import { ILoginDTO } from './../../modules/authentication/repository';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

function AuthenticationRepositoriesImpl() {
  const auth = FirebaseConfig.auth;

  interface IParamsFirebaseAuth {
    asyncFunction: ((...params: any[]) => Promise<any | void>) | Promise<void>,
    payload?: ILoginDTO,
  }

  const excute = (
    {
      asyncFunction = () => {
        return new Promise<any | void>((resolve) => {
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