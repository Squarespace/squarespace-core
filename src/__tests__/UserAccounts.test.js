import {
  IS_USER_AUTHENTICATED,
  OPEN_ACCOUNT_SCREEN,
  USER_ACCOUNT_API,
} from '../UserAccountsNamespaces';
import UserAccounts from '../UserAccounts';

const userAccountApiMock = {
  [IS_USER_AUTHENTICATED]: jest.fn(),
  [OPEN_ACCOUNT_SCREEN]: jest.fn(),
};

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('UserAccounts', () => {
  describe.each([
    [UserAccounts.isUserAuthenticated, IS_USER_AUTHENTICATED],
    [UserAccounts.openAccountScreen, OPEN_ACCOUNT_SCREEN]
  ])('%p', (apiFn, apiKey) => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('calls console.warn when API is not hooked up to window', () => {
      apiFn();
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(window[USER_ACCOUNT_API]).toBe(undefined);
    });

    it('calls API method when available', () => {
      window[USER_ACCOUNT_API] = userAccountApiMock;
      apiFn();
      expect(userAccountApiMock[apiKey]).toHaveBeenCalledTimes(1);
      window[USER_ACCOUNT_API] = undefined;
    });
  });
});
