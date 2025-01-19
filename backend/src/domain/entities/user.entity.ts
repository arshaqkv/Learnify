export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public phone: number,
    public role: string = "student",
    public profileImage: string = "",
    public isVerified: boolean = false,
    public isBlocked: boolean = false,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
