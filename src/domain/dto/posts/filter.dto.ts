export class FilterDto {
  private constructor(public readonly term: string) {}

  public static create(term: string): [string?, FilterDto?] {
    if (typeof term !== 'string') return ['Term must be a string']
    if (term.length === 0) return ['Term must be at lest 1 character long']

    return [undefined, new FilterDto(term)]
  }
}
