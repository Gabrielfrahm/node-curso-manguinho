export class UnauthorizedError extends Error {
  constructor (stack?: string) {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}
