export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  data :{
    token: string;
  }
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  data:{
  token: string;
  }
}

export interface CurrentUser {
  data:
  {
  id: string;
  }
}
