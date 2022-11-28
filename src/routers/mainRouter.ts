import { routerHomepageDefauld, routerHomepageDefault } from './../view/Homepage/router';
import { routerResetPassword } from './../view/Auth/ResetPassword/router';
import { routerForgotPassword } from './../view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerHomepage, routerHomepageMain } from '@view/Homepage/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] 
= [routerHomepageDefault, routerHomepageMain, routerViewProfile];

export const publicPage: IRouter[] 
= [routerLogin, routerForgotPassword, routerResetPassword];
