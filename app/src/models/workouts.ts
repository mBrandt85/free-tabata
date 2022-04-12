import { Timestamp } from 'firebase/firestore'

export interface Workout {
  name: string
  tabatas: Tabata[]
  shared?: boolean
  created?: Timestamp
  updated?: Timestamp
}

export interface History {
  id?: string
  name: string
  tabatas: Tabata[]
  created: Timestamp
  updated: Timestamp
}

export interface Tabata {
  name: string
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  intensity: number
  muscles: {
    primary: Muscle[]
    secondary: Muscle[]
  }
}

export interface Muscle {
  name: string
  description: string
}