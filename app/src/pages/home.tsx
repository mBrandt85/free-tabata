import { FaChartLine, FaLightbulb, FaList, FaPlay, FaPlus, FaUser, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { useAppState } from '../providers/app-state'
import { useUi } from '../providers/ui'
import { Card } from '../components/card'
import { Content } from '../components/content'
import Item from '../components/item'
import Layout from '../components/layout'
import { H1, H4, H5, H6, Text } from '../components/typography'

export default function Home() {
  const { user, workouts, history, workout } = useAppState()
  const { setBackdrop } = useUi()
  const navigate = useNavigate()

  return user ? (
    <Layout
      title="Free Tabata"
      buttonsEnd={[
        { onClick: () => {
          setBackdrop(true)
          setTimeout(() => setBackdrop(false), 2000)
        }, icon: FaLightbulb },
        { onClick: () => navigate('/user'), icon: FaUser }
      ]}
    >
      <Content>
        <H1>{user.displayName ?? user.displayName}</H1>

        {history.length > 0 ? (
          <Card>
            <Item line>
              <H6 margin="0">LAST WORKOUT</H6>
              <H4 margin="0">{history[0].name}</H4>
              <Text fontSize="0.9rem" margin="8px 0 0 0" color="#999">Completed yesterday</Text>
            </Item>

            <Item IconStart={FaPlay} arrow onClick={() => navigate('/workouts/run/:id')}>Repeat Workout</Item>
          </Card>
        ) : <Text margin="0" fontStyle="italic">No Workouts logged... yet!</Text>}

        <H4>My Workouts</H4>

        <Card>
          {workouts.length > 0 && <Item
            IconStart={FaList} 
            arrow 
            line 
            onClick={() => navigate('/workouts')}
            badge={workouts.length}
          >
            My Workouts
          </Item>}

          <Item
            IconStart={workout.name !== '' || workout.tabatas.length > 0 ? FaEdit : FaPlus}
            arrow
            line
            badge={workout.name !== '' || workout.tabatas.length > 0 ? 'Draft' : null}
            onClick={() => navigate('/workouts/compose')}
          >
            Compose Workout
          </Item>

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