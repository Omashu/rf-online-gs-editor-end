import {
  sign as jwtSign,
  verify as jwtVerify,
  VerifyOptions,
  Secret,
  SignOptions,
} from 'jsonwebtoken';

// TODO: rewrite to env
const SIGNATURE = '__local__';

export const verify = (
  token: string,
  secretOrPublicKey: string | Buffer = SIGNATURE,
  options?: VerifyOptions,
) => jwtVerify(token, secretOrPublicKey, options);

export const sign = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret = SIGNATURE,
  options?: SignOptions,
) => {
  return jwtSign({ data: payload }, secretOrPrivateKey, options);
};
