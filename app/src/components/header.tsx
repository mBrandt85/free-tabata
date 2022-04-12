import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import IconButton from './icon-button'
import { HeaderButton } from './layout'

interface Props {
  title: string
  buttonsStart: HeaderButton[]
  buttonsEnd: HeaderButton[]
}

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media screen 
    and (max-width: 599.98px) 
    and (orientation: portrait), 
    (max-width: 959.98px) 
    and (orientation: landscape)
  {
    height: 56px;
  }

  @media screen 
    and (min-width: 600px) 
    and (max-width: 839.98px) 
    and (orientation: portrait), 
    (min-width: 960px) 
    and (max-width: 1279.98px) 
    and (orientation: landscape)
  {
    height: 64px;
  }

  @media screen 
    and (min-width: 840px) 
    and (orientation: portrait), 
    (min-width: 1280px) 
    and (orientation: landscape)
  {
    height: 64px;
  }
`
const StyledButtons = styled.span`
  display: flex;
  padding: 8px;
` 

export default function Header({
  title,
  buttonsStart,
  buttonsEnd
}: Props) {
  const navigate = useNavigate()

  return (
    <StyledHeader>
      {buttonsStart.length > 0 && <StyledButtons>
        {buttonsStart.map(({ onClick, icon }, key) => <IconButton key={key} onClick={onClick && onClick} Icon={icon} />)}
      </StyledButtons>}
      
      <span style={{
        flexGrow: 1,
        fontWeight: 700,
        fontSize: '1.2rem',
        paddingTop: '13px',
        paddingRight: buttonsEnd.length > 0 ? '0' : '16px',
        paddingBottom: '16px',
        paddingLeft: buttonsStart.length > 0 ? '0' : '16px',
        color: '#eab8b2'
      }}>{title}</span>
      
      {buttonsEnd.length > 0 && <StyledButtons>
        {buttonsEnd.map(({ onClick, icon }, key) => <IconButton key={key} onClick={onClick && onClick} Icon={icon} />)}
      </StyledButtons>}
    </StyledHeader>
  )
}
