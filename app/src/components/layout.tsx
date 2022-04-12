import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { IconType } from 'react-icons'
import styled from 'styled-components'

import Header from './header'

interface Props {
  children: ReactNode
  title: string
  buttonsStart?: HeaderButton[]
  buttonsEnd?: HeaderButton[]
}

export interface HeaderButton {
  onClick?: () => void
  icon: IconType
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen 
    and (max-width: 599.98px) 
    and (orientation: portrait), 
    (max-width: 959.98px) 
    and (orientation: landscape)
  {
    max-width: 100%;
    padding-bottom: 56px;
  }

  @media screen 
    and (min-width: 600px) 
    and (max-width: 839.98px) 
    and (orientation: portrait), 
    (min-width: 960px) 
    and (max-width: 1279.98px) 
    and (orientation: landscape)
  {
    margin: 0 auto;
    max-width: 800px;
    padding-bottom: 64px;
  }

  @media screen 
    and (min-width: 840px) 
    and (orientation: portrait), 
    (min-width: 1280px) 
    and (orientation: landscape)
  {
    margin: 0 auto;
    max-width: 1100px;
    padding-bottom: 64px;
  }
`

export default function Layout({ children, title, buttonsStart = [], buttonsEnd = [] }: Props) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Header title={title} buttonsStart={buttonsStart} buttonsEnd={buttonsEnd} />

      {children}
    </Container>
  )
}