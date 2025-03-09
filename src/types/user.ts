export interface GetUserProfileRes {
  _id: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
  createdAt: string;
}
