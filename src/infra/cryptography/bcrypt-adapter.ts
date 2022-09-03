import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'

export class BcryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return await Promise.resolve(hash)
  }
}
