import { describe, it, expect } from 'vitest';
import { capitalize } from '../src/utils';

describe('Utils', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
});