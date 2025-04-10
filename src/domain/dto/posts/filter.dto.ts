export class FilterDto {
  private constructor(public readonly term: string) {}

  public static create(term: string): [string?, FilterDto?] {
    if (typeof term !== 'string') return ['Term must be a string']

    return [undefined, new FilterDto(term)]
  }
}
