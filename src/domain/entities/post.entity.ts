import { CustomError } from '../errors/custom.error'

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

  public static fromObject(object: { [key: string]: any }) {
    const { id, title, content, category, tags, createdAt, updatedAt } = object

    if (!id) throw CustomError.badRequest('Missing ID')
    if (!title) throw CustomError.badRequest('Missing title')
    if (!content) throw CustomError.badRequest('Missing content')
    if (!category) throw CustomError.badRequest('Missing category')
    if (!tags) throw CustomError.badRequest('Missing tags')
    if (!createdAt) throw CustomError.badRequest('Missing createdAt')
    if (!updatedAt) throw CustomError.badRequest('Missing updatedAt')

    return new PostEntity(id, title, content, category, tags, createdAt, updatedAt)
  }
}
