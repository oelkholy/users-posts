import { TestBed } from '@angular/core/testing';
import { LimitCharactersPipe } from './limit-characters.pipe';

describe('LimitCharactersPipe', () => {

  let pipe: LimitCharactersPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LimitCharactersPipe]
    });
    pipe = TestBed.inject(LimitCharactersPipe);
  });

  it('create an instance', () => {
    const pipe = new LimitCharactersPipe();
    expect(pipe).toBeTruthy();
  });

  it('should limit the number of characters in a string', () => {
    const value = 'Hello, world!';
    const limit = 5;
    const result = pipe.transform(value, limit);
    expect(result).toEqual('Hello...');
  });

  it('should return the original string if it is shorter than the limit', () => {
    const value = 'Hello, world!';
    const limit = 20;
    const result = pipe.transform(value, limit);
    expect(result).toEqual('Hello, world!');
  });

});
