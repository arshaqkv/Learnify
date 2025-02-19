export class Lecture {
  constructor(
    public title: string,
    public isPreviewFree: boolean,
    public videoUrl: string,
    public publicId: string,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
