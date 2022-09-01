import { MissingParamError } from '../../error'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation composite', () => {
  it('Should return an error if ay validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_Value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
