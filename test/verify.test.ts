import { verify, sign } from '../src';
import 'dotenv/config';

const secret1 = process.env.SECRET_KEY_1 as string;
const secret2 = process.env.SECRET_KEY_2 as string;

describe('verify', () => {
  it('should verify and decode a valid token', () => {
    const token = sign({ payload: { name: 'D4C' }, secret: secret1 });
    const verified = verify({ token, secret: secret1 });
    expect(verified.name).toBe('D4C');
  });
  it('should throw if the signature is invalid', () => {
    const token = sign({ payload: { name: 'D4C' }, secret: secret1 });
    try {
      verify({ token, secret: secret2 });
    } catch (e) {
      expect(e.message).toBe('Invalid signature');
    }
  });
  it('should throw if the token has expired', () => {
    const token = sign({
      payload: { name: 'D4C' },
      secret: secret1,
      options: {
        expiresIn: -8.64e7,
      },
    });
    try {
      verify({ token, secret: secret1 });
    } catch (e) {
      expect(e.message).toBe('Token has expired');
    }
  });
});
