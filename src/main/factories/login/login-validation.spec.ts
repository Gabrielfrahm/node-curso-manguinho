import { makeLoginValidation } from './login-validation'
import { ValidationComposite } from '../../../presentation/helper/validation/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helper/validation/required-field-validation'
import { Validation } from '../../../presentation/helper/validation/validation'
import { EmailValidation } from '../../../presentation/helper/validation/email-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helper/validation/validation-composite')
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all Validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
