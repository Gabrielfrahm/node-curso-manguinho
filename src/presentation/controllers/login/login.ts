import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest, serverError } from '../../helper/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await Promise.resolve(BadRequest(new MissingParamError('email')))
      }
      if (!password) {
        return await Promise.resolve(BadRequest(new MissingParamError('password')))
      }
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await Promise.resolve(BadRequest(new InvalidParamError('email')))
      }
      await this.authentication.auth(email, password)
      return await Promise.resolve(BadRequest(new MissingParamError('password')))
    } catch (error) {
      return serverError(error)
    }
  };
}
