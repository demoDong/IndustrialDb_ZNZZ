/**
 * @license
 * Copyright DataOcean. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { ThemeSwitherPos, RegistedThemes } from './globalTypes';

export const environment = {
  production: false,
  apiurl: 'http://219.239.97.111:10075',
  showSideBar: false,
  showNavBar: false,
  showThemeSwither: ThemeSwitherPos.profile,
  defaultTheme: RegistedThemes.default,
};
