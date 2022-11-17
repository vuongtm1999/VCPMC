import StarIcon from '@assets/icon/star';
import ISelect from '@core/select';

export const LANGUAGE: ISelect<React.SVGAttributes<SVGSVGElement>>[] = [
  { value: 'en', label: 'ENG', data: StarIcon },
  { value: 'vi', label: 'VNM' },
];

export const allSelect: ISelect = { label: 'common.all', value: undefined };

const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL,
  GAME_URL: 'https://mizuku.dev.altasoftware.vn',
  APP_NAME: process.env.APP_NAME || 'AltaFrontend',
  LOGIN_PAGE: '/#/login',
  SSO_PAGE: '/#',
};

export default CONFIG;
