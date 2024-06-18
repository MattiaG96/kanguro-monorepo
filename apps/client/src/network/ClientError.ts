export class ClientError extends Error {
  readonly message: string;

  constructor(body: any) {
    super(body.message);
    this.message = body.message;
  }
}
