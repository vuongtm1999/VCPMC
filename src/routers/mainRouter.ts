import { routerTool } from './../view/ToolFireBase/router';
import { routerHomepageDefault } from './../view/Homepage/router';
import { routerResetPassword } from './../view/Auth/ResetPassword/router';
import { routerForgotPassword } from './../view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerHomepageMain } from '@view/Homepage/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] 
= [routerHomepageDefault, routerHomepageMain, routerViewProfile, routerTool];

export const publicPage: IRouter[] 
= [routerLogin, routerForgotPassword, routerResetPassword];
