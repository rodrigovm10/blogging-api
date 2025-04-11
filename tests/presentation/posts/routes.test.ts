import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'

const post1 = {
  title: 'Test 1',
  content: 'This is the content of my first blog post.',
  category: 'Technology',
  tags: ['Tech', 'Programming'],
}
const post2 = {
  title: 'Test 2',
  content: 'This is the content of my first blog post.',
  category: 'Technology',
  tags: ['Tech', 'Programming'],
}

describe('GET - Post Routes', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  test('should return post api/posts', async () => {
    await prisma.post.createMany({
      data: [post1, post2],
    })

    const { body } = await request(testServer.app).get('/api/posts').expect(200)

    expect(body).toBeInstanceOf(Array)
  })

  test('should return a post api/posts/:id', async () => {
    const post = await prisma.post.create({
      data: post1,
    })

    const { body } = await request(testServer.app).get(`/api/posts/${post.id}`).expect(200)

    expect(body).toEqual({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    })
  })

  test('should return a 404 NotFound api/posts/:id', async () => {
    const postId = 999999

    const { body } = await request(testServer.app).get(`/api/posts/${postId}`).expect(404)

    expect(body).toEqual({ error: `Post with id ${postId} do not exists` })
  })
})

describe('POST - Post Routes', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  test('should create a new post api/posts', async () => {
    const { body } = await request(testServer.app).post('/api/posts').send(post1).expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      title: post1.title,
      content: post1.content,
      category: post1.category,
      tags: post1.tags,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should return an error if title is not present api/posts', async () => {
    const { body } = await request(testServer.app).post('/api/posts').send({}).expect(400)

    expect(body).toEqual({ error: 'Title is required' })
  })

  test('should return an error if title empty api/posts', async () => {
    const { body } = await request(testServer.app)
      .post('/api/posts')
      .send({ title: '' })
      .expect(400)

    expect(body).toEqual({ error: 'Title is required' })
  })
})

describe('PUT - Post Routes', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  test('should return an updated post', async () => {
    const newTitle = 'Test updated'
    const post = await prisma.post.create({
      data: post1,
    })

    const { body } = await request(testServer.app)
      .put(`/api/posts/${post.id}`)
      .send({ title: newTitle })
      .expect(200)

    expect(body).toEqual({
      id: post.id,
      title: newTitle,
      content: post.content,
      category: post.category,
      tags: post.tags,
      createdAt: post.createdAt.toISOString(),
      updatedAt: body.updatedAt,
    })
  })

  test('should return an 404 if post not found', async () => {
    const postId = 999999
    const { body } = await request(testServer.app)
      .put(`/api/posts/${postId}`)
      .send({ title: 'Test updated' })
      .expect(404)

    expect(body).toEqual({ error: `Post with id ${postId} do not exists` })
  })
})

describe('DELETE - Post Routes', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  test('should delete a post api/posts/:id', async () => {
    const post = await prisma.post.create({ data: post1 })

    await request(testServer.app).delete(`/api/posts/${post.id}`).expect(204)
  })

  test('should return a 404 if post not found api/posts/:id', async () => {
    const postId = 999999

    const { body } = await request(testServer.app).delete(`/api/posts/${postId}`).expect(404)

    expect(body).toEqual({ error: `Post with id ${postId} do not exists` })
  })
})
