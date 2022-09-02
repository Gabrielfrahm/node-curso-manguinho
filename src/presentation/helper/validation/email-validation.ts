import { InvalidParamError } from '../../error'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])

    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
