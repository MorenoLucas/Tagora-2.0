import { Person } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("","","","","")).toBeTruthy();
  });
});
