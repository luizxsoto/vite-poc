import { authPt } from '@/modules/auth/i18n/pt';

import { commonPt } from './pt';

const phraseDict = {
  pt: {
    common: commonPt,
    modules: {
      auth: authPt,
    },
  },
};

export function i18n() {
  const currentLanguage = 'pt';

  return phraseDict[currentLanguage];
}
