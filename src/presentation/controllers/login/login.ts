import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest } from '../../helper/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(BadRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(BadRequest(new MissingParamError('password')))
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return await Promise.resolve(BadRequest(new InvalidParamError('email')))
    }
    return await Promise.resolve(BadRequest(new MissingParamError('password')))
  };
}
