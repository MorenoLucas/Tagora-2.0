import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("1234566787","","","","","",false)).toBeTruthy();
  });
});
