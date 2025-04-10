export class CreatePostDto {
  private constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly category: string,
    public readonly tags: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePostDto?] {
    const { title, content, category, tags } = object

    if (!title || title.length === 0) return ['Title is required']
    if (!content || content.length === 0) return ['Content is required']
    if (!category || category.length === 0) return ['Category is required']
    if (!tags || tags.length === 0) return ['Tags are required']
    if (tags && !Array.isArray(tags)) return ['Tags must be an array']

    return [undefined, new CreatePostDto(title, content, category, tags)]
  }
}
