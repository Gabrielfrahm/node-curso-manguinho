import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount, Validation } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest, serverError, ok } from '../../helper/http-helper'

export class SingUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequest(error)
      }
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body

      if (password !== passwordConfirmation) {
        return BadRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return BadRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
