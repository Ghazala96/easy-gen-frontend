export interface RegisterReq {
  claimIds: string[];
  name: {
    first: string;
    last: string;
  };
  password: string;
}

export interface RegisterRes {
  user: {
    _id: string;
    email: string;
    name: {
      first: string;
      last: string;
    };
    role: string;
    createdAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface LoginReq {
  claimIds: string[];
  password: string;
}

export interface LoginRes {
  user: {
    _id: string;
  };
  accessToken: string;
  refreshToken: string;
}
