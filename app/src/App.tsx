import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'

import { auth, firestore } from './firebase'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useAppState } from './providers/app-state'
import Loading from './pages/loading'
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'
import NotFound from './pages/not-found'
import User from './pages/user'
import Workouts from './pages/workouts'
import ComposeWorkout from './pages/workouts/compose'
import { Workout } from './models/workouts'

export default function App() {
  const { dispatch, user } = useAppState()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let unsub: Unsubscribe

    onAuthStateChanged(auth, async user => {
      if (user) {
        dispatch({ type: 'SET_USER', user })

        unsub = onSnapshot(doc(firestore, 'users', user.uid),
          d => {
            const { workouts, history } = d.data() as { workouts: Workout[], history: Workout[] }
            workouts && dispatch({ type: 'SET_WORKOUTS', workouts })
            history && dispatch({ type: 'SET_HISTORY', history })
            setLoading(false)
            unsub()
          },
          error => {
            setError(error.message)
            setLoading(false)
            unsub()
          }
        )
      }
    })
  }, [])

  if (loading) return <Loading value={['Authenticating', 'And Fetching', 'Personal data']} />

  if (error) return <Error value={error} />

  if (!user) return <Login />

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/workouts/compose/" element={<ComposeWorkout />} />
      <Route path="/workouts/compose/:id" element={<ComposeWorkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}