import { 
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useContext, 
  useEffect, 
  useState 
} from 'react'
import { 
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signInWithRedirect,
  signOut
 } from 'firebase/auth'
 import { 
  onSnapshot,
  setDoc,
  doc,
  Timestamp
 } from 'firebase/firestore'

import { auth, firestore } from '../firebase'

interface Data {
  workouts: Workout[]
  history: Workout[]
}

export interface Workout {
  id?: string
  name: string
  tabatas: Tabata[]
  shared: boolean
  created: Timestamp
  updated: Timestamp
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

interface AuthContext {
  loading: boolean
  error: string | null
  user: User | null
  data: Data
  workout: Workout
  login: () => void
  logout: () => void
  setData: Dispatch<SetStateAction<Data>>
  updateData: () => Promise<void>
  setWorkout: Dispatch<SetStateAction<Workout>>
  addWorkout: (workout: Workout) => void
}

const Auth = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [data, setData] = useState<Data>({ workouts: [], history: [] })
  const [workout, setWorkout] = useState<Workout>({} as Workout)
  const ts = Timestamp.now()

  const login = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await signInWithRedirect(auth, provider)
    setLoading(false)
  }
  
  const logout = async () => {
    try {
      setLoading(true)
      await signOut(auth)
      setUser(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Something went wrong when trying to authenticate...')
    }
  }

  const updateData = async () => {
    await setDoc(doc(firestore, 'users', user!.uid), data)
  }

  const addWorkout = async (workout: Workout) => {
    await setDoc(doc(firestore, 'users', user!.uid), {
      ...data,
      workouts: [
        ...data.workouts,
        workout
      ]
    })
  }

  const deleteWorkout = (index: number) => {
    setData({
      ...data,
      workouts: data.workouts.filter((_, idx) => idx !== index)
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        setUser(user)

        setWorkout({
          name: '',
          tabatas: [],
          shared: false,
          created: ts,
          updated: ts
        })

        onSnapshot(doc(firestore, 'users', user.uid),
          d => {
            setData(d.data() as Data)
            setLoading(false)
          },
          error => {
            setError(error.message)
            setLoading(false)
          }
        )
      }
    })
  }, [])

  return <Auth.Provider value={{
    loading,
    error,
    user,
    data,
    workout,
    login,
    logout,
    setData,
    updateData,
    setWorkout,
    addWorkout
  }}>
    {children}
  </Auth.Provider>
}

export const useAuth = () => useContext(Auth)