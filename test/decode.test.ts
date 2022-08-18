import { sign, decode } from '../src';
import 'dotenv/config';

const secret = process.env.SECRET_KEY_1 as string;

describe('decode', () => {
  it('should decode the token payload', () => {
    const token = sign({ payload: { name: 'D4C' }, secret });
    const decoded = decode({ token });
    expect(decoded.name).toBe('D4C');
  });
});
