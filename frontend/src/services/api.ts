import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface Post {
  id: number
  authId: number
  title: string
  post: string
  money: number
}

export interface SignInData {
  username: string
  password: string
}

export const authAPI = {
  signIn: (data: SignInData) => api.post('/auth/signin', data),
  signUp: (data: SignInData) => api.post('/auth/signup', data),
}

export const postsAPI = {
  getAllPosts: () => api.get<Post[]>('/posts'),
  getPostById: (id: number) => api.get<Post>(`/posts/${id}`),
  createPost: (post: Omit<Post, 'id' | 'authId'>) => api.post<Post>('/posts', post),
  updatePost: (id: number, post: Partial<Post>) => api.put<Post>(`/posts/${id}`, post),
  deletePost: (id: number) => api.delete(`/posts/${id}`),
  getPostsByAuthor: (authId: number) => api.get<Post[]>(`/posts/author/${authId}`),
  searchPosts: (keyword: string) => api.get<Post[]>(`/posts/search?keyword=${keyword}`),
}

export default api