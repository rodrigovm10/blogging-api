export class PostEntity {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public category: string,
    public tags: string[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
