import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FaChevronRight } from 'react-icons/fa'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  IconStart?: IconType
  IconEnd?: IconType
  badge?: number | string | null
  arrow?: boolean
  onClick?: () => void
  line?: boolean
  bgColor?: string
  padding?: string
  center?: boolean
}

interface StyledProps {
  line?: boolean
  bgColor?: string
  padding?: string 
  onClick?: () => void
}

interface StyledContentProps {
  center?: boolean
  btnClick?: () => void
}

const StyledItem = styled.div<StyledProps>`
  display: flex;
  width: 100%;
  padding: ${({ padding }) => padding ? padding : '16px'};
  background-color: ${({ bgColor }) => bgColor ? bgColor : 'white'};
  border-bottom: ${({ line }) => line && '1px solid lightgray'};
  color: ${({ onClick }) => onClick ? 'rgb(90, 70, 220)' : '#333333'};

  &:hover {
    background-color: ${({ onClick }) => onClick && '#EEEEEE'};
    cursor: ${({ onClick }) => onClick && 'pointer'};
  }
`

const StyledContent = styled.div<StyledContentProps>`
  flex-grow: 1;
  margin-top: -0.6px;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => center && 'center'};
  font-weight: ${({ btnClick }) => btnClick && '700'};
  font-size: ${({ btnClick }) => btnClick && '0.9rem'};
  letter-spacing: ${({ btnClick }) => btnClick && '0.2px'};
`

const StyledBadge = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 0.4px;
  font-size: .8rem;
  font-weight: 700;
`

export default function Item({ 
  children, 
  IconStart, 
  IconEnd,
  badge,
  arrow,
  onClick,
  line,
  center
}: Props) {
  return (
    <StyledItem onClick={onClick} line={line}>
      {IconStart && <IconStart style={{ marginRight: '16px' }} />}
      <StyledContent center={center} btnClick={onClick}>{children}</StyledContent>
      {badge && <StyledBadge>{badge}</StyledBadge>}
      {IconEnd && <IconEnd style={{ marginLeft: '16px' }} />}
      {arrow && <FaChevronRight style={{ marginLeft: '16px' }} />}
    </StyledItem>
  )
}