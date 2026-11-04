/**
 * Standard Result Pattern for NikahPlan Studio
 * Safe Logic Flow without unhandled runtime exceptions.
 */

export type AppErrorCode =
  | 'ERR_UNAUTHORIZED'
  | 'ERR_FORBIDDEN_ROLE'
  | 'ERR_WORKSPACE_NOT_FOUND'
  | 'ERR_TRIAL_EXPIRED_FEATURE_LOCKED'
  | 'ERR_RSVP_QUOTA_REACHED'
  | 'ERR_PROMO_ALREADY_REDEEMED'
  | 'ERR_PROMO_EXPIRED'
  | 'ERR_INVALID_PAYLOAD'
  | 'ERR_CONCURRENCY_LOCK'
  | 'ERR_INTERNAL_SERVER';

export interface AppError {
  code: AppErrorCode;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export interface Result<T> {
  isSuccess: boolean;
  data?: T;
  error?: AppError;
}

export const Result = {
  ok<T>(data: T): Result<T> {
    return { isSuccess: true, data };
  },
  fail<T = never>(code: AppErrorCode, message: string, fieldErrors?: Record<string, string[]>): Result<T> {
    return { isSuccess: false, error: { code, message, fieldErrors } };
  },
};

