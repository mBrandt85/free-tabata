import { useEffect } from "react"
import { FaArrowLeft, FaPlus, FaEdit, FaSave, FaUndo, FaTrashAlt } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"

import { useAppState } from "../../../providers/app-state"
import { Card } from "../../../components/card"
import { Content } from "../../../components/content"
import Input from "../../../components/input"
import Item from "../../../components/item"
import Layout from "../../../components/layout"
import { H4, H6 } from "../../../components/typography"
import ToggleSwitch from "../../../components/toggle-switch"

export default function ComposeWorkout() {
  const { dispatch, workouts, workout } = useAppState()
  const navigate = useNavigate()
  const { id: idx } = useParams()
  const id = Number(idx)

  useEffect(() => {
    if (workouts[id]) dispatch({ type: 'SET_WORKOUT', workout: workouts[id] })
    return () => { if (idx) dispatch({ type: 'CLEAR_WORKOUT' }) } 
  }, [])

  return (
    <Layout
      title="Compose Workout"
      buttonsStart={[
        { onClick: () => navigate('/workouts'), icon: FaArrowLeft }
      ]}
      buttonsEnd={workout.name !== '' || workout.tabatas.length > 0 ? [
        idx ? { 
          onClick: () => {
            dispatch({ type: 'DELETE_WORKOUT', id })
            navigate('/workouts')
          }, icon: FaTrashAlt
        } : {
          onClick: () => {
            dispatch({ type: 'CLEAR_WORKOUT' })
            navigate('/workouts/compose')
          }, icon: FaUndo
        },
        { onClick: () => {
          idx ? dispatch({ type: 'UPDATE_WORKOUT', id })
          : dispatch({ type: 'ADD_WORKOUT' })
          navigate('/workouts')
        }, icon: FaSave }
      ] : []}
    >
      <Content>
        <Input
          id="name"
          label="Name"
          value={workout?.name ? workout.name : ''}
          onChange={e => dispatch({
            type: 'SET_WORKOUT',
            workout: {
              ...workout,
              name: e.currentTarget.value
            }
          })}
        />

        {workout.tabatas.map(({ name, exercises }, tabataIdx) => (
          <Card key={tabataIdx} margin="24px 0 0 0">
            <Item line>
              <H6 margin="0">TABATA</H6>
              <H4 margin="0">{name}</H4>
            </Item>
            <Item
              onClick={() => dispatch({
                type: 'SET_WORKOUT',
                workout: {
                  ...workout,
                  tabatas: workout.tabatas.filter((_, index) => index !== tabataIdx)
                }
              })}
              IconStart={FaTrashAlt}
              key={`addExerciseItem${tabataIdx}`}
              line
            >
              Remove Tabata
            </Item>
            <Item
              onClick={() => console.log('ediiiiiit')}
              IconStart={FaEdit}
              key={`addExerciseItem2${tabataIdx}`}
              arrow
            >
              Edit Tabata
            </Item>
          </Card>
        ))}

        <Card margin="24px 0 0 0">
          <Item
            onClick={() => dispatch({
              type: 'SET_WORKOUT',
              workout: {
                ...workout,
                tabatas: [
                  ...workout.tabatas,
                  { name: `Tabata #${workout.tabatas.length + 1}`, exercises: [] }
                ]
              }
            })}
            IconStart={FaPlus}
          >
            Add Tabata
          </Item>
        </Card>

        <Card margin="24px 0 0 0">
          <Item>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Share Workout
              <ToggleSwitch
                checked={workout.shared}
                onChange={() => dispatch({
                  type: 'SET_WORKOUT',
                  workout: {
                    ...workout,
                    shared: !workout.shared
                  }
                })}
              />
            </div>
          </Item>
        </Card>
      </Content>
    </Layout>
  )
}
