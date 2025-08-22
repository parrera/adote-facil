import bcrypt from 'bcrypt';

export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10);
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}

export const encrypterInstance = new Encrypter();
