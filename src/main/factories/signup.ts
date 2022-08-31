import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SingUpController } from '../../presentation/controllers/signup/signup'
import { Validation } from '../../presentation/helper/validation/validation'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LoggerControllerDecorator } from '../decorators/log'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validateTmp = new ValidationStub()
  const singUpController = new SingUpController(emailValidatorAdapter, dbAccount, validateTmp)
  const logMongoRepository = new LogMongoRepository()
  return new LoggerControllerDecorator(singUpController, logMongoRepository)
}
