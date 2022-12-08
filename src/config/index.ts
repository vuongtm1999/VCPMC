import AmericianFlat from '@assets/icon/AmericianFlat';
import StarIcon from '@assets/icon/vietFlat';
import ISelect from '@core/select';

export const LANGUAGE: ISelect[] = [
  { value: 'vi', label: 'Tiếng Việt', icon: StarIcon },
  { value: 'en', label: 'Tiếng Anh', icon: AmericianFlat },
];

export const allSelect: ISelect = { label: 'common.all', value: undefined };

const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL,
  GAME_URL: 'https://mizuku.dev.altasoftware.vn',
  APP_NAME: process.env.APP_NAME || 'AltaFrontend',
  LOGIN_PAGE: '/login',
  SSO_PAGE: '/',
};

export default CONFIG;
