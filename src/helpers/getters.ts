import { Logger } from '@nestjs/common';
import { constants } from './constants';
import { ConfigService } from '@nestjs/config';
import { routes } from './routes';

const getDevelopmentStatus = () => {
  switch (constants.ENVIRONMENT_VARIABLES.NODE_ENV) {
    case 'production':
      return false;
    default:
      return true;
  }
};

const getConfigService = () => {
  return new ConfigService<typeof constants.ENVIRONMENT_VARIABLES>();
};

const getLogger = () => {
  return new Logger();
};

const getCurrentAppVersion = () => {
  return getConfigService().get<number>('APP_VERSION');
};

const getRoutesByAppVersion = () => {
  const appVersion = getCurrentAppVersion();

  const allRoutesConversion: Record<number, 'v1' | 'v2'> = {
    1: 'v1',
  };

  return routes[allRoutesConversion[appVersion]];
};

export const getters = {
  getDevelopmentStatus,
  getConfigService,
  getLogger,
  getCurrentAppVersion,
  getRoutesByAppVersion,
};
