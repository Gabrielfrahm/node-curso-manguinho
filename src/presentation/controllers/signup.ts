import { HttpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'
import { InvalidParamError, MissingParamError } from '../error'
import { BadRequest, serverError } from '../helper/http-helper'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return BadRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return BadRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
