import { User } from '../user/user';
import { Session } from './session';

describe('Session', () => {
  it('should create an instance', () => {
    expect(
      new Session('fake token', new User({ username: 'username', email: 'email' }))
    ).toBeTruthy();
  });
});
