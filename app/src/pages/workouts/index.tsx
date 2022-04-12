import { Fragment } from "react"
import { FaArrowLeft, FaCog, FaEdit, FaPlay, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import { useAppState } from "../../providers/app-state"
import { Card } from "../../components/card"
import { Content } from "../../components/content"
import Item from "../../components/item"
import Layout from "../../components/layout"
import { H4, H6, Text } from "../../components/typography"

export default function Workouts() {
  const { workout, workouts } = useAppState()
  const navigate = useNavigate()

  return (
    <Layout
      title="Workouts"
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaArrowLeft }
      ]}
      buttonsEnd={[
        { onClick: () => navigate('/workouts/compose'), icon: workout.name !== '' || workout.tabatas.length > 0 ? FaEdit : FaPlus }
      ]}
    >
      <Content>
        {workouts.length > 0 && workouts.map(({ name: workoutName, tabatas }, workoutKey) => (
          <Card margin="24px 0 0 0" key={workoutKey}>
            <Item line>
              <H4 margin="0">{workoutName}</H4>

              {tabatas.length > 0 && tabatas.map(({ name: tabataName, exercises }, tabataKey) => (
                <Fragment key={workoutKey + tabataKey}>
                  <H6 margin="6px 0 0 0">{tabataName}</H6>
                  {exercises.length > 0 && exercises.map(({ name: exerciseName, muscles }, exerciseKey) => (
                    <Text margin="0" key={workoutKey + tabataKey + exerciseKey}>
                      {exerciseName}
                    </Text>
                  ))}
                </Fragment>
              ))}
            </Item>

            <Item
              arrow
              line
              IconStart={FaCog} 
              onClick={() => navigate(`/workouts/compose/${workoutKey}`)}
            >
              Manage Workout
            </Item>

            <Item
              arrow
              IconStart={FaPlay}
              onClick={() => navigate(`/run/${workoutKey}`)}
            >
              Start Workout
            </Item>
          </Card>
        ))}
      </Content>
    </Layout>
  )
}
