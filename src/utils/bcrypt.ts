import { genSalt, hash, compare } from 'bcryptjs';

export async function cryptPassword(pswd: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(pswd, salt);
}

export async function comparePasswords(
  pswd: string,
  crpt: string,
): Promise<boolean> {
  return compare(pswd, crpt);
}
