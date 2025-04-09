import { Router } from 'express'
import { PostController } from './controller'

export class PostRouter {
  static get router(): Router {
    const router = Router()

    const postController = new PostController()

    router.get('/:id', postController.getPost)
    router.get('/', postController.getPosts)

    router.post('/', postController.createPost)

    router.put('/:id', postController.updatePost)

    router.delete('/:id', postController.deletePost)

    return router
  }
}
