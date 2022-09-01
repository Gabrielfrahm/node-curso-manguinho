import { InvalidParamError } from '../../error'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldTpCompare')
}

describe('Compare Field Validation', () => {
  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldTpCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldTpCompare'))
  })

  it('Should not return if Validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldTpCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
