import { FaChartLine, FaHandPointer, FaList, FaPlay, FaPlus, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { 
  Layout,
  Menu,
  Breadcrumb
} from 'antd'

import { Card } from '../components/card'
import { Content } from '../components/content'
import Item from '../components/item'
import { H1, H4, H5, H6, Text } from '../components/typography'
import { useAuth } from '../providers'

export default function Home() {
  const { user, data: { workouts, history } } = useAuth()
  const navigate = useNavigate()
  const { Header, Content, Footer } = Layout

  return user ? (

    
    <Layout
      title="Free Tabata"
      buttonsEnd={[
        { route: '/user', icon: FaUser }
      ]}
    >
      <Content>
        <H1>{user.displayName}</H1>

        {history.length > 0 ? (
          <Card>
            <Item line>
              <H6 margin="0">LAST WORKOUT</H6>
              <H4 margin="0">{workouts[0].name}</H4>
              <Text fontSize="0.9rem" margin="8px 0 0 0" color="#999">Completed yesterday</Text>
            </Item>

            <Item IconStart={FaPlay} arrow onClick={() => navigate('/workouts/run/:id')}>Repeat Workout</Item>
          </Card>
        ) : (
          workouts.length > 0 ? (
            <Card>
              <Item line={workouts.length > 0}>
                <H5 margin="0">No Workouts logged... yet!</H5>
              </Item>

              <Item IconStart={FaHandPointer} arrow onClick={() => navigate('/workouts')}>Select Workout</Item>
            </Card>
          ) : <Text margin="0" fontStyle="italic">No Workouts logged... yet!</Text>
        )}

        <H4>My Workouts</H4>

        <Card>
          {workouts.length > 0 && <Item IconStart={FaList} arrow line onClick={() => navigate('/workouts')}>Show Workouts</Item>}
          <Item IconStart={FaPlus} arrow line onClick={() => navigate('/workouts/compose')}>Create Workout</Item>
          {history.length > 0 && <Item IconStart={FaChartLine} arrow onClick={() => navigate('/history')}>Statistics</Item>}
        </Card>

        <H4>Shared Workouts</H4>

        <Card>
          {workouts.length > 0 && <Item IconStart={FaList} arrow line onClick={() => navigate('/shared')}>Browse Workouts</Item>}
        </Card>
      </Content>      
    </Layout>
  ) : null
}