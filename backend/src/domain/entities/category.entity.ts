export class Category {
  constructor(
    public name: string,
    public description: string,
    public isDeleted: boolean = false,
    public isActive: boolean = true,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
