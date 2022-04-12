import { IconType } from 'react-icons/lib'
import styled from 'styled-components'

interface Props {
  Icon: IconType
  onClick?: () => void
}

const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  padding: 8px;
  border: none;
  cursor: pointer;
  background-color: inherit;
  color: white;

  &:hover {
    color: lightgray;
  }
`

export default function IconButton({ 
  Icon,
  onClick
}: Props) {
  return (
    <StyledIconButton onClick={onClick}>
      {Icon && <Icon />}
    </StyledIconButton>
  )
}