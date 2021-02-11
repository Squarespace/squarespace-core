/**
 * @license
 * Copyright 2016 Squarespace, INC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  USER_ACCOUNT_API,
  IS_USER_AUTHENTICATED,
  OPEN_ACCOUNT_SCREEN
} from './UserAccountsNamespaces';

const warningMessage = 'UserAccounts API not available';
const ua = window[USER_ACCOUNT_API];
const warn = () => {
  console.warn(warningMessage);
};

const isUserAuthenticated = ua ? ua[IS_USER_AUTHENTICATED] : warn;
const openAccountScreen = ua ? ua[OPEN_ACCOUNT_SCREEN] : warn;

export default { isUserAuthenticated, openAccountScreen };