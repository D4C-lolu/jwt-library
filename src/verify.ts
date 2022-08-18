import decode from './decode';
import { createSignature } from './sign';

export interface VerifyInput {
  token: string;
  secret: string;
}

//check if JWT'S expiry date is past
const dateInPast = ({ exp }: { exp: number }) => {
  const currentDate = new Date();
  //conpare current date to JWT's expiry date
  return new Date(exp).setHours(0, 0, 0, 0) <= currentDate.setHours(0, 0, 0, 0);
};

//verifies JWT and returns the decoded token if valid
const verify = ({ token, secret }: VerifyInput) => {
  //split token using "." as a delimiter
  const parts = token.split('.');

  //throw an error if JWT does not have header, payload and signature
  if (parts.length !== 3) {
    throw new Error('Invalid token');
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  //generate JWT signature
  const candidateSignature = createSignature({
    encodedHeader,
    encodedPayload,
    secret,
  });

  //compare generated signature to signature on token
  if (signature !== candidateSignature) {
    throw new Error('Invalid signature');
  }

  const decoded = decode({ token });

  const { exp } = decoded;

  //check if token has expired
  if (dateInPast({ exp })) {
    throw new Error('Token has expired');
  }

  //return decoded token
  return decoded;
};
export default verify;
