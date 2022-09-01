import { MissingParamError } from '../../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {
  it('should return a MissingParamErro if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
