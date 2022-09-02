import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../../presentation/helper/validation/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helper/validation/required-field-validation'
import { Validation } from '../../../presentation/helper/validation/validation'
import { CompareFieldsValidation } from '../../../presentation/helper/validation/compare-fields-validation'
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

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all Validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
