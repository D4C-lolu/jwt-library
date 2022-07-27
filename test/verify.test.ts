import { verify, sign } from '../src';

describe('verify', () => {
  it('should verify and decode a valid token', () => {
    const secret = 'shhh';
    const token = sign({ payload: { name: 'D4C' }, secret });
    const verified = verify({ token, secret });
    expect(verified.name).toBe('D4C');
  });
  it('should throw if the signature is invalid', () => {
    const secretOne = 'shhh';
    const secretTwo = 'secretTwo';
    const token = sign({ payload: { name: 'D4C' }, secret: secretOne });
    try {
      verify({ token, secret: secretTwo });
    } catch (e) {
      expect(e.message).toBe('Invalid signature');
    }
  });
  it('should throw if the token has expired', () => {
    const secret = 'shhh';
    const token = sign({
      payload: { name: 'D4C' },
      secret,
      options: {
        expiresIn: -8.64e7,
      },
    });
    try {
      verify({ token, secret });
    } catch (e) {
      expect(e.message).toBe('Token has expired');
    }
  });
});
