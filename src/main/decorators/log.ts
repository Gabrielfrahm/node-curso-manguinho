import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LoggerControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await this.controller.handle(httpRequest)
  }
}
