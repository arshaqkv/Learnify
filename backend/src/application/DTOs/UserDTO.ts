export interface SignUpDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    profileImage: string;
    role: string;
    googleId?: string;
    createdAt?: Date;
  };
}

export interface verifyOtpDTO {
  email: string;
  otp: string;
}
