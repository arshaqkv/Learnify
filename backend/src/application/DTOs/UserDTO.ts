export interface SignUpDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: number;
}

export interface LoginDTO{
    email: string,
    password: string
}

export interface LoginResponseDTO {
  accessToken: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: number;
    profileImage: string;
    createdAt?: Date;
  };
}
