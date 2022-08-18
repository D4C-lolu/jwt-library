import { createHmac } from 'crypto';

export interface Options {
  expiresIn?: number;
}

export interface SignInput {
  payload: object;
  secret: string;
  options?: Options;
}

const defaultOptions = {
  expiresIn: 8.64e7, //1 day
};

interface CreateSignatureInput {
  secret: string;
  encodedHeader: string;
  encodedPayload: string;
}

//Creates a signature via HMAC
export const createSignature = ({
  secret,
  encodedHeader,
  encodedPayload,
}: CreateSignatureInput): string => {
  return createHmac('sha256', secret)
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64');
};

const sign = ({ payload, secret, options = {} }: SignInput) => {
  //add default options if options object is empty
  const mergedOptions = { ...defaultOptions, ...options };

  const header = { alg: 'HS256', type: 'JWT' };

  //convert header to base 64
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');

  //calculate expiry date of JWT
  const date = Date.now();
  const expiresIn = date + mergedOptions.expiresIn;

  //convert payload and expiry date to base 64
  const encodedPayload = Buffer.from(
    JSON.stringify({ ...payload, exp: expiresIn })
  ).toString('base64');

  //sign encoded payload and header
  const signature = createSignature({ encodedPayload, encodedHeader, secret });

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
export default sign;
