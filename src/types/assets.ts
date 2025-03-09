export enum AssetType {
  Email = 'email'
}

export enum AssetOperation {
  Register = 'registration',
  Login = 'login'
}

export type AssetData = EmailAssetData;

export interface EmailAssetData {
  email: string;
  operation: AssetOperation;
}

export interface CreateAssetReq {
  type: AssetType;
  data: AssetData;
}

export interface CreateAssetRes {
  submitId: string;
  otp?: string;
}

export interface VerifyAssetReq {
  submitId: string;
  code?: string;
}

export interface VerifyAssetRes {
  claimId: string;
}
