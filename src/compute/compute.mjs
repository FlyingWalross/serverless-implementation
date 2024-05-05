import { createHash } from 'crypto';

export const computeHandler = async (event, context) => {

  const body = JSON.parse(event.body);

  body.sort((a, b) => a - b);

  let hash = Buffer.alloc(0);
  for(const number of body) {
      const numberHash = createHash('sha256').update(intToBuffer(number)).digest();
      const newHash = Buffer.concat([hash, numberHash]);
      hash = createHash('sha256').update(newHash).digest();
  }

  const response = {
    statusCode: 200,
    body: hash.toString('hex')
  };

  return response;
};

function intToBuffer(number) {
  let buffer = new Int8Array(1);
  buffer[0] = number;
  return buffer;
}
  