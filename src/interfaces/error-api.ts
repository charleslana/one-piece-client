import type { ErrorCode } from '@/enums/error-code';

export interface ErrorApi {
  code: ErrorCode;
  message: string;
}
