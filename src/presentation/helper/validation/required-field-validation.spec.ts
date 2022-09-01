import { MissingParamError } from '../../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {
  it('Should return a MissingParamErro if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if Validation succeeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
