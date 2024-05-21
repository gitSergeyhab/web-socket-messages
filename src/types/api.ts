export interface ApiErrorField {
  detail: string;
  code: string;
  attr: string | number | null;
}
export interface ApiError {
  errors: ApiErrorField[];
  status: number;
  message: string;
}
