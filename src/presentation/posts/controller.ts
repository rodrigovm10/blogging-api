import { Request, Response } from 'express'

export class PostController {
  constructor() {}

  public getPost = (req: Request, res: Response) => {
    res.json('get post')
  }

  public getPosts = (req: Request, res: Response) => {
    res.json('get posts')
  }

  public createPost = (req: Request, res: Response) => {
    res.json('create post')
  }

  public updatePost = (req: Request, res: Response) => {
    res.json('update post')
  }

  public deletePost = (req: Request, res: Response) => {
    res.json('delete post')
  }
}
