import { checkUserAuth } from '../utils/auth';
import { isRequestAuth } from '../utils/authToken';
import { config as dotenvConfig } from 'dotenv';

describe('Misc utils', () => {
  beforeAll(() => dotenvConfig());

  describe('authToken.ts', () => {
    test('isRequestAuth() - success', () => {
      const auth = isRequestAuth(`Bearer ${process.env.GENERAL_AUTH_TOKEN}`);
      expect(auth).toBe(true);
    });

    test('isRequestAuth() - error - undefined', () => {
      const auth = isRequestAuth();
      expect(auth).toBe(false);
    });

    test('isRequestAuth() - error - different token', () => {
      const auth = isRequestAuth('Bearer AAA');
      expect(auth).toBe(false);
    });
  });

  describe('auth.ts', () => {
    test('checkUserAuth() - success', () => {
      const value = checkUserAuth(`Bearer ${process.env.GENERAL_AUTH_TOKEN}`);
      expect(value).toBe(undefined);
    });

    test('checkUserAuth() - error', () => {
      try {
        checkUserAuth();
      } catch (error) {
        expect(error.message).toBe(
          "You're not authorized to request the delivery points.",
        );
      }
    });
  });
});
