import { Event } from './events';

describe('Event', () => {
  it('should create an instance', () => {
    expect(new Event("","","","","","","00","00",new Date())).toBeTruthy();
  });
});
