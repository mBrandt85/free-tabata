import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import { Content } from "../components/content"
import Layout from "../components/layout"
import { Text } from "../components/typography"
import { useAuth } from "../providers/auth"

export default function User() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout
      title={user?.displayName!}
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaArrowLeft }
      ]}
    >
      <Content>
        <Text>User</Text>
      </Content>
    </Layout>
  )
}
