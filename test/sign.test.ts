import { sign } from '../src';
import 'dotenv/config';

const secret1 = process.env.SECRET_KEY_1 as string;
const secret2 = process.env.SECRET_KEY_2 as string;

describe('sign', () => {
  it('should produce different signatures for different payloads', () => {
    const jwtOne = sign({
      payload: { name: 'D4C' },
      secret: secret1,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    const jwtTwo = sign({
      payload: { name: 'D4C' },
      secret: secret2,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it('should add the expiry to the payload', () => {
    const secret = 'shshshshshshsh';
    const jwtOne = sign({
      payload: { name: 'D4C' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[1];

    // const jwtTwo = sign({
    //   payload: { name: 'D4C' },
    //   secret : `${secret}-123w`,
    //   options: { expiresIn: 8.64e7 },
    // }).split('.')[1];

    const dataOne = Buffer.from(jwtOne, 'base64').toString();

    expect(typeof JSON.parse(dataOne).exp).toBe('number');
  });
});
