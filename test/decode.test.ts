import { sign, decode } from '../src';

describe('decode', () => {
  it('should decode the token payload', () => {
    const token = sign({ payload: { name: 'D4C' }, secret: 'shhhh0-1es' });
    const decoded = decode({ token });
    expect(decoded.name).toBe('D4C');
  });
});
