import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SingUpController } from '../../../presentation/controllers/signup/signup'

import { Controller } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const singUpController = new SingUpController(dbAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LoggerControllerDecorator(singUpController, logMongoRepository)
}
