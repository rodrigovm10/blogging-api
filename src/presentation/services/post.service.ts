import { prisma } from '../../data/postgres'
import { CreatePostDto } from '../../domain/dto/posts/create-post.dto'
import { FilterDto } from '../../domain/dto/posts/filter.dto'
import { UpdatePostDto } from '../../domain/dto/posts/update-post.dto'
import { PostEntity } from '../../domain/entities/post.entity'
import { CustomError } from '../../domain/errors/custom.error'

export class PostService {
  public async getPost(id: number): Promise<PostEntity> {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    })

    if (!post) throw CustomError.notFound(`Post with id ${id} do not exists`)

    return PostEntity.fromObject(post)
  }

  public async getPosts(filterDto: FilterDto): Promise<PostEntity[]> {
    const { term } = filterDto

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return posts.map(PostEntity.fromObject)
  }

  public async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    try {
      const post = await prisma.post.create({
        data: { ...createPostDto },
      })

      return PostEntity.fromObject(post)
    } catch (error) {
      throw CustomError.internalServer(String(error))
    }
  }

  public async updatePost(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { id, ...updatePostDtoRest } = updatePostDto

    const postExists = await prisma.post.findFirst({
      where: {
        id,
      },
    })

    if (!postExists) throw CustomError.notFound(`Post with id ${id} do not exists`)

    try {
      const postUpdated = await prisma.post.update({
        where: {
          id,
        },
        data: { ...updatePostDtoRest, updatedAt: new Date() },
      })

      return PostEntity.fromObject(postUpdated)
    } catch (error) {
      throw CustomError.internalServer(String(error))
    }
  }

  public async deletePost(id: number): Promise<void> {
    const postExists = await prisma.post.findFirst({
      where: { id },
    })

    if (!postExists) throw CustomError.notFound(`Post with id ${id} do not exists`)

    await prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
