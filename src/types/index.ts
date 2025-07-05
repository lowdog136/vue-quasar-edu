// Firebase Types
export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

// User Types
export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// News Types
export interface NewsCard {
  id: string
  title: string
  body: string
  date: string
  image?: string
  category: string
  rating?: number
  views?: number
}

// Game Types
export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time?: string
  tournament: string
  status: 'scheduled' | 'live' | 'finished'
}

// Event Types
export interface Event {
  id: string
  title: string
  description: string
  date: string
  type: string
  games?: Game[]
}

// Table Types
export interface TeamStats {
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  position: number
}

// Admin Types
export interface AdminSettings {
  isAdmin: boolean
  canEdit: boolean
  permissions: string[]
}

// Store Types
export interface RootState {
  user: User | null
  posts: NewsCard[]
  events: Event[]
  games: Game[]
  table: TeamStats[]
  admin: AdminSettings
}

// Component Props Types
export interface ComponentProps {
  [key: string]: any
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
