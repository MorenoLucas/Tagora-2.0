import { TattooPost } from './tattoo-post';

describe('TattooPost', () => {
  it('should create an instance', () => {
    expect(new TattooPost("","","","","","")).toBeTruthy();
  });
});
