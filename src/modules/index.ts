import { modules as v1 } from './v1';
import { getters } from '../helpers';

export const getCurrentAppModulesToLoad = (): [] => {
  const appVersion = getters.getCurrentAppVersion();

  console.log(appVersion);

  const allAppVersions = {
    v1,
  };

  return allAppVersions[`v${appVersion}`];
};
