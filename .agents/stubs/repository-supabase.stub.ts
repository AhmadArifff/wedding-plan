/**
 * Stub: Repository Layer with Unambiguous NULL/Unassigned Filter (NikahPlan Studio)
 * Location Reference: apps/web/src/features/<domain>/api/<domain>.repository.ts
 */

export type CategoryFilterMode = 'ALL' | 'UNASSIGNED' | string;

export interface BudgetItemFilterParams {
  workspaceId: string;
  categoryFilter: CategoryFilterMode;
  searchQuery?: string;
}

export class BudgetRepositoryStub {
  /**
   * Membangun predikat filter yang transparan agar item tanpa kategori (NULL)
   * tidak hilang secara membingungkan (Sesuai Dynamic Master Data Guide).
   */
  static buildCategoryFilterPredicate(filter: CategoryFilterMode): {
    mode: 'ALL' | 'IS_NULL' | 'EQUALS';
    categoryId?: string;
  } {
    if (!filter || filter === 'ALL') {
      return { mode: 'ALL' };
    }
    if (filter === 'UNASSIGNED') {
      return { mode: 'IS_NULL' };
    }
    return { mode: 'EQUALS', categoryId: filter };
  }
}

