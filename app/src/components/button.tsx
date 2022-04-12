import { ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import { FaChevronRight } from 'react-icons/fa'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  IconStart?: IconType
  IconEnd?: IconType
  arrow?: boolean
  onClick?: () => void
}

const StyledButton = styled.button`
  font-size: 1em;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 8px black;
  cursor: pointer;
  background-color: lightgray;

  &:hover {
    background-color: white;
  }
`

export default function Button({ 
  children, 
  IconStart, 
  IconEnd, 
  arrow,
  onClick
}: Props) {
  return (
    <StyledButton onClick={onClick}>
      {IconStart && <IconStart style={{ marginRight: '16px' }} />}
      <span style={{ flexGrow: 1 }}>{children}</span>
      {IconEnd && <IconEnd style={{ marginLeft: '16px' }} />}
      {arrow && <FaChevronRight style={{ marginLeft: '16px' }} />}
    </StyledButton>
  )
}