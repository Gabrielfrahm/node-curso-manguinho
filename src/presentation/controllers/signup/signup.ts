import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest, serverError } from '../../helper/http-helper'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
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

      const account = this.addAccount.add({
        name,
        email,
        password
      })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
