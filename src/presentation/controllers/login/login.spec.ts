import { MissingParamError } from '../../error'
import { BadRequest } from '../../helper/http-helper'
import { LoginController } from './login'

describe('Login Controller', () => {
  it('Should returns 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(BadRequest(new MissingParamError('email')))
  })
})
