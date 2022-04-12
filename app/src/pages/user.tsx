import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa"

import { Content } from "../components/content"
import Layout from "../components/layout"
import { Text } from "../components/typography"
import { useAppState } from "../providers/app-state"
import { auth } from "../firebase"
import Loading from './loading'

export default function User() {
  const { dispatch, user } = useAppState()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const logout = async () => {
    setLoading(true)
    await signOut(auth)
    dispatch({ type: 'SET_USER', user: null })
    setLoading(false)
  }

  if (loading) return <Loading value={['Signing out']} />

  return (
    <Layout
      title={user?.displayName!}
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaArrowLeft }
      ]}
      buttonsEnd={[
        { onClick: logout, icon: FaSignOutAlt }
      ]}
    >
      <Content>
        <Text>User</Text>
      </Content>
    </Layout>
  )
}
