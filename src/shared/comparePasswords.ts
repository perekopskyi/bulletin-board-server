import * as bcrypt from 'bcrypt';

export const comparePasswords = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log('comparePasswords Error', error);
    return false;
  }
};
