import { sign } from '../src';

describe('sign', () => {
  it('should produce different signatures for different payloads', () => {
    const secret = 'shshshshshshsh';
    const jwtOne = sign({
      payload: { name: 'Tom' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    const jwtTwo = sign({
      payload: { name: 'Tom' },
      secret: `${secret}-123w`,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it('should add the expiry to the payload', () => {
    const secret = 'shshshshshshsh';
    const jwtOne = sign({
      payload: { name: 'Tom' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[1];

    // const jwtTwo = sign({
    //   payload: { name: 'Tom' },
    //   secret : `${secret}-123w`,
    //   options: { expiresIn: 8.64e7 },
    // }).split('.')[1];

    const dataOne = Buffer.from(jwtOne, 'base64').toString();

    expect(typeof JSON.parse(dataOne).exp).toBe('number');
  });
});
