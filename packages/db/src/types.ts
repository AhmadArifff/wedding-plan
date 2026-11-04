/**
 * Database Domain Models & DTOs (NikahPlan Studio)
 * Ground Truth: PRD-BACKEND.md & PRD.md
 */

export type UserPlatformRole = 'USER' | 'SUPER_ADMIN';
export type WorkspaceMemberRole = 'OWNER' | 'EDITOR' | 'VIEWER_KITCHEN';
export type PlanStatus = 'PRO_TRIAL' | 'FREE' | 'PRO_ACTIVE';
export type VendorStatus = 'DEAL' | 'DISCUSSION' | 'CANDIDATE' | 'REJECTED' | 'ARCHIVED';
export type PriceSource = 'MANUAL' | 'VENDOR_SYNC' | 'GOLD_SYNC';
export type EnvelopeType = 'BANK_TRANSFER' | 'QRIS_MERCHANT';
export type AttendanceStatus = 'ATTENDING' | 'NOT_ATTENDING' | 'TENTATIVE';

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  platformRole: UserPlatformRole;
  createdAt: string;
}

export interface Workspace {
  id: string;
  ownerId: string;
  weddingTitle: string;
  targetWeddingDate: string;
  createdAt: string;
  deletedAt?: string | null;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  memberRole: WorkspaceMemberRole;
  joinedAt: string;
}

export interface WorkspaceSubscription {
  id: string;
  workspaceId: string;
  planStatus: PlanStatus;
  trialStartsAt: string;
  trialEndsAt: string;
  proExpiresAt?: string | null;
  rsvpQuotaLimit: number;
}

export interface BudgetCategory {
  id: string;
  workspaceId: string;
  masterCategoryId?: string | null;
  name: string;
  sortOrder: number;
  ceilingAmount: number;
}

export interface BudgetItem {
  id: string;
  workspaceId: string;
  categoryId?: string | null;
  linkedVendorId?: string | null;
  itemName: string;
  quantity: number;
  unitLabel: string;
  unitPrice: number;
  totalPrice: number;
  isGoldMahar: boolean;
  goldWeightGrams?: number | null;
  priceSource: PriceSource;
  notes?: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  workspaceId: string;
  categoryId?: string | null;
  vendorName: string;
  quotedPrice: number;
  selectionStatus: VendorStatus;
  comparisonNotes?: string;
  contactInfo?: string;
  instagramHandle?: string;
  updatedAt: string;
}

export interface KitchenConfig {
  id: string;
  workspaceId: string;
  maleGuests: number;
  femaleGuests: number;
  portionMultiplier: number;
  totalGuests: number;
  totalPortions: number;
}

export interface KitchenItem {
  id: string;
  workspaceId: string;
  kitchenConfigId: string;
  ingredientName: string;
  quantity: number;
  unitLabel: string;
  unitPrice: number;
  subtotal: number;
  notes?: string;
  sortOrder: number;
}

export interface SavingsPlan {
  id: string;
  workspaceId: string;
  currentSavingsAmount: number;
  monthlySavingCapacity: number;
  updatedAt: string;
}

export interface Invitation {
  id: string;
  workspaceId: string;
  themeId: string;
  slug: string;
  isPublished: boolean;
  groomNick: string;
  groomFullName: string;
  groomParents: string;
  brideNick: string;
  brideFullName: string;
  brideParents: string;
  akadDatetime: string;
  receptionDatetime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  musicBackgroundUrl?: string;
  updatedAt: string;
}

export interface InvitationEnvelope {
  id: string;
  invitationId: string;
  masterBankId?: string | null;
  envelopeType: EnvelopeType;
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  qrisStoragePath?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface RsvpWish {
  id: string;
  invitationId: string;
  guestName: string;
  attendanceStatus: AttendanceStatus;
  paxCount: number;
  wishMessage: string;
  isApproved: boolean;
  createdAt: string;
}

export interface MasterGoldPrice {
  id: string;
  pricePerGram: number;
  effectiveDate: string;
  sourceNote: string;
  createdAt: string;
}

export interface MasterCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  defaultCeiling: number;
  sortOrder: number;
  isDefault: boolean;
}

export interface MasterBank {
  id: string;
  bankCode: string;
  bankName: string;
  logoPath: string;
  isPopular: boolean;
}

export interface MasterInvitationTheme {
  id: string;
  name: string;
  themeSlug: string;
  coverThumbnailPath: string;
  isProOnly: boolean;
  designTokens: {
    fontSerif: string;
    fontSans: string;
    primaryColor: string;
    accentColor: string;
    bgColor: string;
  };
}

/**
 * 3 Database Views Models
 */
export interface WorkspaceFinancialSummaryView {
  workspaceId: string;
  weddingTitle: string;
  targetWeddingDate: string;
  totalBudgetAmount: number;
  goldMaharVarianceAmount: number;
  latestGoldPricePerGram: number;
  dealVendorCount: number;
  totalDealVendorAmount: number;
  totalGuests: number;
  totalPortions: number;
  totalKitchenCost: number;
  kitchenCostPerGuest: number;
  savingsDeficitAmount: number;
  estimatedSavingMonths: number | null;
  effectivePlanStatus: PlanStatus;
  trialDaysRemaining: number;
}

export interface VendorDecisionMatrixView extends Vendor {
  categoryName?: string;
  categoryCeilingAmount: number;
  priceDifference: number; // quotedPrice - categoryCeilingAmount
  isOverCeiling: boolean;
}

export interface PublicInvitationSafeView {
  invitationId: string;
  slug: string;
  groomNick: string;
  groomFullName: string;
  groomParents: string;
  brideNick: string;
  brideFullName: string;
  brideParents: string;
  akadDatetime: string;
  receptionDatetime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  themeSlug: string;
  envelopes: {
    id: string;
    envelopeType: EnvelopeType;
    bankName?: string;
    accountNumber?: string;
    accountHolderName?: string;
    qrisUrl?: string;
  }[];
  wishes: {
    id: string;
    guestName: string;
    attendanceStatus: AttendanceStatus;
    wishMessage: string;
    createdAt: string;
  }[];
  showFreeWatermark: boolean;
}
