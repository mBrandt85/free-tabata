import { 
  createContext, 
  ReactNode, 
  useContext,
  useEffect,
  useState 
} from 'react'
import { 
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  Timestamp
 } from 'firebase/firestore'

import { firestore } from '../firebase'
import { Unsubscribe } from '@firebase/util'
import { useAuth } from './auth'

export interface Workout {
  id?: string
  name: string
  tabatas: Tabata[]
  user: {
    uid: string
    displayName: string
    photoURL: string
  }
  shared: boolean
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

interface WorkoutsContext {
  loading: boolean
  error: string | null
  workouts: Workout[]
  history: Workout[]
  muscles: Muscle[]
  addWorkout: () => Promise<void>
  updateWorkout: () => Promise<void>
  deleteWorkout: () => Promise<void>
}

const Workouts = createContext({} as WorkoutsContext)

export default function WorkoutsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [history, setHistory] = useState<Workout[]>([])
  const [workoutsDone, setWorkoutsDone] = useState<boolean>(false)
  const [historyDone, setHistoryDone] = useState<boolean>(false)
  let unsubscribeWorkouts: Unsubscribe
  let unsubscribeHistory: Unsubscribe

  const muscles: Muscle[] = [
    { name: 'Biceps', description: 'Upper arm, front' },
    { name: 'Triceps', description: 'Upper arm, back' },
    { name: 'Forearm', description: 'Upper arm, back' },
    { name: 'Deltoids', description: 'Shoulders' },
    { name: 'Trapezius', description: 'Upper back' },
    { name: 'Lats', description: 'Lower back' },
    { name: 'Pectoralis', description: 'Chest' },
    { name: 'Abdominals', description: 'Stomach' },
    { name: 'Obliques', description: 'Sides' },
    { name: 'Gluteus', description: 'Ass' },
    { name: 'Quadriceps', description: '' },
    { name: 'Calves', description: '' },
    { name: 'Hamstrings', description: 'Upper leg, back' },
  ]

  const snapshotWorkouts = (userId: string) => {
    const q = query(collection(firestore, "workouts"), where('userId', '==', userId))
    unsubscribeWorkouts = onSnapshot(q,
      snapshot => {
        let arr: Workout[] = []
        snapshot.forEach((doc) => arr.push(doc.data() as Workout))
        setWorkouts(arr)
        setWorkoutsDone(true)
        unsubscribeWorkouts()
      },
      error => {
        setError(error.message)
        setWorkoutsDone(true)
      }
    )
  }

  const snapshotHistory = (userId: string) => {
    const q = query(collection(firestore, "history"), where('userId', '==', userId), orderBy('completed'))
    unsubscribeHistory = onSnapshot(q,
      snapshot => {
        let arr: Workout[] = []
        snapshot.forEach((doc) => arr.push(doc.data() as Workout))
        setHistory(arr)
        setHistoryDone(true)
        unsubscribeHistory()
      },
      error => {
        setError(error.message)
        setHistoryDone(true)
      }
    )
  }

  const addWorkout = async () => {
    
  }

  const updateWorkout = async () => {
    
  }

  const deleteWorkout = async () => {
    
  }

  useEffect(() => {
    if (user) {
      snapshotWorkouts(user.uid)
      snapshotHistory(user.uid)
    }
  }, [user])

  useEffect(() => {
    if (workoutsDone && historyDone) setLoading(false)
  }, [workoutsDone, historyDone])

  return <Workouts.Provider value={{
    loading,
    error,
    workouts,
    history,
    muscles,
    addWorkout,
    updateWorkout,
    deleteWorkout
  }}>{children}</Workouts.Provider>
}

export const useWorkouts = () => useContext(Workouts)