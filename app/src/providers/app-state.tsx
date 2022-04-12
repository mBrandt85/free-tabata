import { 
  createContext, 
  ReactNode, 
  useContext, 
  useReducer
} from 'react'
import { User } from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

import { Workout } from '../models/workouts'
import { firestore } from '../firebase'

interface AppStateContext {
  dispatch: (action: AppStateAction) => void
  user: User | null
  workouts: Workout[]
  history: Workout[]
  shared: Workout[]
  workout: Workout
}

interface AppStateAction {
  type: 'SET_USER' | 'SET_WORKOUTS' | 'SET_HISTORY'
    | 'SET_WORKOUT' | 'ADD_WORKOUT' | 'UPDATE_WORKOUT'
    | 'DELETE_WORKOUT' | 'CLEAR_WORKOUT'
  id?: number
  user?: User | null
  workouts?: Workout[]
  history?: Workout[]
  shared?: Workout[]
  workout?: Workout
}

const clearWorkout = {
  name: '',
  tabatas: [],
  shared: false
}

const appStateReducer = (state: AppStateContext, action: AppStateAction): AppStateContext => {
  const timestamp = Timestamp.now()
  let payload: any

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user!
      }

    case 'SET_WORKOUTS':
      return {
        ...state,
        workouts: action.workouts!
      }

    case 'SET_HISTORY':
      return {
        ...state,
        history: action.history!
      }

    case 'SET_WORKOUT':
      return {
        ...state,
        workout: action.workout!
      }

    case 'ADD_WORKOUT':
      payload = [
        ...state.workouts,
        {
          ...state.workout,
          created: timestamp,
          updated: timestamp
        }
      ] as Workout[]

      setDoc(doc(firestore, 'users', state.user!.uid), {
        history: state.history,
        workouts: payload
      })

      return {
        ...state,
        workouts: payload,
        workout: clearWorkout
      }

    case 'UPDATE_WORKOUT':
      payload = state.workouts.map((i, id) => id === action.id ? {
        ...state.workout,
        updated: timestamp
      } : i) as Workout[]

      setDoc(doc(firestore, 'users', state.user!.uid), {
        history: state.history,
        workouts: payload
      })

      return {
        ...state,
        workouts: payload,
        workout: clearWorkout
      }

    case 'DELETE_WORKOUT':
      payload = state.workouts.filter((_, id) => id !== action.id!) as Workout[]

      setDoc(doc(firestore, 'users', state.user!.uid), {
        history: state.history,
        workouts: payload
      })

      return {
        ...state,
        workouts: payload,
        workout: clearWorkout
      }

    case 'CLEAR_WORKOUT':
      return {
        ...state,
        workout: clearWorkout
      }

    default:
      return state
  }
}

const AppState = createContext({} as AppStateContext)

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, {
    dispatch: () => {},
    user: null,
    workouts: [],
    history: [],
    shared: [],
    workout: clearWorkout
  })

  return <AppState.Provider value={{
    ...state,
    dispatch,
  }}>
    {children}
  </AppState.Provider>
}

export const useAppState = () => useContext(AppState)