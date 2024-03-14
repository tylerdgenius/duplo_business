export class ResponseObject<T = undefined> {
  public status: boolean;
  public code: number;
  public message: string;
  public payload: T;

  constructor(code: number, status: boolean, message: string, payload?: T) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.payload = payload;
  }
}
