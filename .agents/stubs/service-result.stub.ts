/**
 * Stub: Service Layer with Guard Clauses & Result Pattern (NikahPlan Studio)
 * Location Reference: apps/web/src/features/<domain>/services/<domain>.service.ts
 */

export type AppErrorCode =
  | 'ERR_UNAUTHORIZED'
  | 'ERR_FORBIDDEN_ROLE'
  | 'ERR_TRIAL_EXPIRED_FEATURE_LOCKED'
  | 'ERR_INVALID_PAYLOAD'
  | 'ERR_INTERNAL_SERVER';

export interface AppResult<T> {
  isSuccess: boolean;
  data?: T;
  error?: {
    code: AppErrorCode;
    message: string;
  };
}

export const Result = {
  ok<T>(data: T): AppResult<T> {
    return { isSuccess: true, data };
  },
  fail<T = never>(code: AppErrorCode, message: string): AppResult<T> {
    return { isSuccess: false, error: { code, message } };
  },
};

export class DomainBudgetService {
  /**
   * Contoh Method Service dengan Guard Clause & Prinsip Full User Autonomy
   */
  static async syncGoldMaharPrice(params: {
    userId: string | null;
    workspaceId: string;
    budgetItemId: string;
    rpcExecutor: (workspaceId: string, itemId: string) => Promise<AppResult<{ newUnitPrice: number; newSubtotal: number }>>;
  }): Promise<AppResult<{ newUnitPrice: number; newSubtotal: number }>> {
    // Guard Clause 1: Validasi sesi pengguna
    if (!params.userId) {
      return Result.fail('ERR_UNAUTHORIZED', 'Sesi Anda telah berakhir. Silakan masuk kembali.');
    }

    // Guard Clause 2: Validasi parameter wajib
    if (!params.workspaceId || !params.budgetItemId) {
      return Result.fail('ERR_INVALID_PAYLOAD', 'ID rencana pernikahan atau item mahar tidak valid.');
    }

    try {
      const response = await params.rpcExecutor(params.workspaceId, params.budgetItemId);
      if (!response.isSuccess || !response.data) {
        return Result.fail(
          response.error?.code ?? 'ERR_INTERNAL_SERVER',
          response.error?.message ?? 'Gagal memperbarui harga emas mahar.'
        );
      }

      return Result.ok(response.data);
    } catch (error) {
      // Catat ke structured logger internal tanpa membocorkan stack trace ke client
      console.error('[DomainBudgetService.syncGoldMaharPrice]', {
        workspaceId: params.workspaceId,
        budgetItemId: params.budgetItemId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return Result.fail('ERR_INTERNAL_SERVER', 'Terjadi gangguan sementara saat menghubungi server.');
    }
  }
}

