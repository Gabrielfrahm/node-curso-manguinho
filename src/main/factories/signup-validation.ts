
import { RequiredFieldValidation } from '../../presentation/helper/validation/required-field-validation'
import { Validation } from '../../presentation/helper/validation/validation'
import { ValidationComposite } from '../../presentation/helper/validation/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
