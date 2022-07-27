export interface DecodeInput {
  token: string;
}

const decode = ({ token }: DecodeInput) => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT');
  }

  const payload = parts[1];

  const data = Buffer.from(payload, 'base64').toString();
  return JSON.parse(data);
};

export default decode;
