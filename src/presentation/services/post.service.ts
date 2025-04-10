import { prisma } from '../../data/postgres'
import { CreatePostDto } from '../../domain/dto/posts/create-post.dto'
import { PostEntity } from '../../domain/entities/post.entity'
import { CustomError } from '../../domain/errors/custom.error'

export class PostService {
  public async getPosts() {
    const posts = await prisma.post.findMany()

    return posts.map(PostEntity.fromObject)
  }

  public async createPost(createPostDto: CreatePostDto) {
    const { title } = createPostDto

    const postExists = await prisma.post.findFirst({
      where: {
        title,
      },
    })
    if (postExists) throw CustomError.badRequest('Post already exists')

    try {
      const post = await prisma.post.create({
        data: { ...createPostDto },
      })

      return PostEntity.fromObject(post)
    } catch (error) {
      throw CustomError.internalServer(String(error))
    }
  }
}
