import { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from './signup-protocols'

import { BadRequest, serverError, ok } from '../../helper/http-helper'

export class SingUpController implements Controller {
  constructor (

    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequest(error)
      }

      const { email, password, name } = httpRequest.body

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
