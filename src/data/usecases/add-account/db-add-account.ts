import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashesPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password: hashesPassword }))
    return await Promise.resolve({
      id: 'string',
      name: 'string',
      email: 'string',
      password: 'string'
    })
  }
}
