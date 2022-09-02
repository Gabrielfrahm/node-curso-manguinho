import { Controller, HttpRequest, HttpResponse, Validation, Authentication } from './login-protocols'
import { BadRequest, ok, serverError, unauthorized } from '../../helper/http/http-helper'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation, private readonly authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequest(error)
      }
      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  };
}
