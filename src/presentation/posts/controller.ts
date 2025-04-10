import { Request, Response } from 'express'
import { PostService } from '../services/post.service'
import { CustomError } from '../../domain/errors/custom.error'
import { CreatePostDto } from '../../domain/dto/posts/create-post.dto'
import { UpdatePostDto } from '../../domain/dto/posts/update-post.dto'
import { FilterDto } from '../../domain/dto/posts/filter.dto'

export class PostController {
  constructor(private readonly postService: PostService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server errorr - check logs' })
  }

  public getPost = (req: Request, res: Response) => {
    const id = +req.params.id

    this.postService
      .getPost(id)
      .then(post => res.json(post))
      .catch(error => this.handleError(res, error))
  }

  public getPosts = (req: Request, res: Response) => {
    const { term = '' } = req.query
    const [error, filterDto] = FilterDto.create(term as string)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.postService
      .getPosts(filterDto!)
      .then(posts => res.json(posts))
      .catch(error => this.handleError(res, error))
  }

  public createPost = (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDto.create(req.body)

    if (error) {
      res.status(404).json({ error })
      return
    }

    this.postService
      .createPost(createPostDto!)
      .then(post => res.status(201).json(post))
      .catch(error => this.handleError(res, error))
  }

  public updatePost = (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updatePostDto] = UpdatePostDto.create({ id, ...req.body })

    if (error) {
      res.status(404).json({ error })
      return
    }

    this.postService
      .updatePost(updatePostDto!)
      .then(post => res.json(post))
      .catch(error => this.handleError(res, error))
  }

  public deletePost = (req: Request, res: Response) => {
    const id = +req.params.id

    this.postService
      .deletePost(id)
      .then(() => res.status(204).json())
      .catch(error => this.handleError(res, error))
  }
}
