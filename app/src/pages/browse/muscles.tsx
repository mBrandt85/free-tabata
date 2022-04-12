import { FaArrowLeft, FaPlus } from "react-icons/fa"

import { Content } from "../../components/content"
import Input from "../../components/input"
import Layout from "../../components/layout"
import { Text } from "../../components/typography"

export default function Muscles() {
  return (
    <Layout
      title="Browse Muscles"
      buttonsStart={[
        { icon: FaArrowLeft }
      ]}
      buttonsEnd={[
        { icon: FaPlus }
      ]}
    >
      <Content>
        <Text>Muscles</Text>
      </Content>
    </Layout>
  )
}