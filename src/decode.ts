export interface DecodeInput {
  token: string;
}

//Decodes a JWT
const decode = ({ token }: DecodeInput) => {
  //split the JWT using the "." as a delimiter
  const parts = token.split('.');

  //throw an error if the JWT doesn't have a header, payload  and signature
  if (parts.length !== 3) {
    throw new Error('Invalid JWT');
  }

  const payload = parts[1];
  //convert base 64 encoded payload back to a regular string
  const data = Buffer.from(payload, 'base64').toString();
  return JSON.parse(data);
};

export default decode;
