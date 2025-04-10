import { Router } from 'express'
import { PostRouter } from './posts/router'

export class AppRoutes {
  public static get routes(): Router {
    const router = Router()

    router.use('/api/posts', PostRouter.router)

    return router
  }
}
