import { MissingParamError } from '../../error'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }

    return null
  }
}
