export class CustomError extends Error {
  code?: number;
  constructor({ code, message }: { code?: number; message?: string }) {
    super(message);
    this.code = code;
  }
}
