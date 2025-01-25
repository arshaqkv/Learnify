export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string ,
    public phone: string,
    public profileImage: string = "",
    public googleId?: string,
    public isVerified: boolean = false,
    public role: string = "student",
    public isBlocked: boolean = false,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public resetPasswordToken?: string,
    public resetPasswordExpiresAt?: Date
  ) {}
}
