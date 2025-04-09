import { Router } from 'express'
import { PostController } from './controller'
import { PostService } from '../services/post.service'

export class PostRouter {
  static get router(): Router {
    const router = Router()

    const postService = new PostService()
    const postController = new PostController(postService)

    router.get('/:id', postController.getPost)
    router.get('/', postController.getPosts)

    router.post('/', postController.createPost)

    router.put('/:id', postController.updatePost)

    router.delete('/:id', postController.deletePost)

    return router
  }
}
