export class UpdatePostDto {
  private constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly category: string,
    public readonly tags: string[]
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdatePostDto?] {
    const { id, title, content, category, tags } = object

    if (!id || isNaN(Number(id))) return ['ID must be a valid number']

    if (title && typeof title !== 'string') return ['Title must be a string']
    if (content && typeof content !== 'string') return ['Content must be a string']
    if (category && typeof category !== 'string') return ['Content must be a string']
    if (tags && !Array.isArray(tags)) return ['Tags must be an array']

    return [undefined, new UpdatePostDto(id, title, content, category, tags)]
  }
}
