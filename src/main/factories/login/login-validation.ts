
import { EmailValidation } from '../../../presentation/helper/validation/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helper/validation/required-field-validation'
import { Validation } from '../../../presentation/helper/validation/validation'
import { ValidationComposite } from '../../../presentation/helper/validation/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
