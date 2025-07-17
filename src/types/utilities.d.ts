type Status =
  | "OK"
  | "Created"
  | "Accepted"
  | "Bad Request"
  | "Unauthorized"
  | "Forbidden"
  | "Not Found"
  | "Too Many Requests"
  | "Internal Server Error";

type StatusCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 429 | 500;

interface BaseResponse {
  status: Status;
  status_code: StatusCode;
  message?: string;
}

export type CreateResponse<T = Record<string, unknown>> = BaseResponse & T;
