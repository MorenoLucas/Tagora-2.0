import { ProductPost } from './product-post';

describe('ProductPost', () => {
  it('should create an instance', () => {
    expect(new ProductPost("","","","","")).toBeTruthy();
  });
});
