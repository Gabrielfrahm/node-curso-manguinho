import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest, serverError, unauthorized } from '../../helper/http-helper'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return BadRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  };
}
