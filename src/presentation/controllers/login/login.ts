import { MissingParamError } from '../../error'
import { BadRequest } from '../../helper/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(BadRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(BadRequest(new MissingParamError('password')))
    }
    return await Promise.resolve(BadRequest(new MissingParamError('password')))
  };
}
