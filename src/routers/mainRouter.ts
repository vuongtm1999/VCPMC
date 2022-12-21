import { routerPlayListMode, routerRecordWarehouse, routerTableMode } from './../view/RecordWarehouse/router';
import { routerTool } from '../view/Tool/router';
import { routerHomepageDefault, detailAuthContract } from './../view/Homepage/router';
import { routerResetPassword } from './../view/Auth/ResetPassword/router';
import { routerForgotPassword } from './../view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerHomepageMain } from '@view/Homepage/router';

import { IRouter } from './interface';
import { routerAddContract } from '@view/Homepage/component/AddContract/router';

export const privatePage: IRouter[]
    = [routerHomepageDefault, 
        routerRecordWarehouse,
        routerHomepageMain, 
        routerViewProfile, 
        detailAuthContract, 
        routerTool, 
        routerAddContract, 
        routerPlayListMode,
    ];

export const publicPage: IRouter[]
    = [routerLogin, routerForgotPassword, routerResetPassword];
