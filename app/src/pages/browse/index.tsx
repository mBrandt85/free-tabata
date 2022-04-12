import { FaArrowLeft } from "react-icons/fa"
import { GiWeightLiftingUp } from "react-icons/gi"
import { useNavigate } from "react-router-dom"

import { Card } from "../../components/card"
import { Content } from "../../components/content"
import Item from "../../components/item"
import Layout from "../../components/layout"
import { H4, Text } from "../../components/typography"
import Error from "../error"
import Loading from "../loading"

export default function Browse() {
  const navigate = useNavigate()

  return (
    <Layout
      title="Browse"
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaArrowLeft }
      ]}
    >
      <Content>
        <Card margin="24px 0 0 0">
          <Item center line>
            <GiWeightLiftingUp style={{ fontSize: '80px' }} />
            <H4 margin="16px 0 0 0">Workouts</H4>

          </Item>

          <Item
            arrow
            onClick={() => navigate('/browse/workouts')}
          >
            Show Workouts
          </Item>
        </Card>
      </Content>
    </Layout>
  )
}
