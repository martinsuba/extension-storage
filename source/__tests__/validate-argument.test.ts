import { expect } from 'chai';

import { validateArgument } from '../validate-argument';

describe('Utils', () => {
  it('should validate function argument', () => {
    const validArguments = [
      { value: 'hello', type: 'string' },
      { value: ['hello'], type: 'array' },
      { value: {}, type: 'object' },
    ];
    const invalidArguments = [
      { value: 'hello', type: 'array' },
      { value: 'hello', type: 'object' },
      { value: [], type: 'object' },
      { value: [], type: 'string' },
      { value: 24, type: 'string' },
      { value: {}, type: 'array' },
      { value: {}, type: 'string' },
    ];

    validArguments.forEach(({ value, type }) => {
      expect(() => validateArgument(value, type as 'string' | 'object' | 'array')).to.not.throw();
    });
    invalidArguments.forEach(({ value, type }) => {
      expect(() => validateArgument(value, type as 'string' | 'object' | 'array')).to.throw();
    });
  });
});
