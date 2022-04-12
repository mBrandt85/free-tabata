import { FormEvent } from 'react'
import { IconType } from 'react-icons/lib'
import { FaChevronRight } from 'react-icons/fa'
import styled from 'styled-components'

interface Props {
  id: string
  value?: string
  onChange?: (e: FormEvent<HTMLInputElement>) => void
  IconStart?: IconType
  IconEnd?: IconType
  arrow?: boolean
  onClick?: () => void
  margin?: string
  invalid?: boolean
  label?: string
}

interface StyledProps {
  invalid?: boolean
  margin?: string
}

const StyledDiv = styled.div<StyledProps>`
  font-size: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid ${({ invalid }) => invalid ? 'red' : 'lightgrey'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 25%);
  cursor: text;
  background-color: rgba(255, 255, 255, 25%);
  overflow: hidden;
  margin: ${({ margin }) => margin ? margin : '24px 0 0 0'};
`

const StyledInput = styled.input`
  padding: 8px;
  border: none;
  width: 100%;
  background-color: transparent;
  color: white;
  font-size: 1.1rem;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
}
`

const StyledLabel = styled.label<StyledProps>`
  width: 100%;
  display: block;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ invalid }) => invalid ? 'red' : 'lightgrey'};
  padding: 8px 8px 0 8px;
`

export default function Input({
  id,
  value,
  onChange,
  IconStart, 
  IconEnd,
  label,
  invalid,
  margin
}: Props) {
  return (
    <StyledDiv invalid={invalid} margin={margin}>
      {label && <StyledLabel htmlFor={id} margin={margin}>{label}</StyledLabel>}
      <div style={{ width: '100%' }}>
        {IconStart && <IconStart style={{ marginRight: '16px' }} />}
        <StyledInput onChange={onChange} id={id} value={value} />
        {IconEnd && <IconEnd style={{ marginLeft: '16px' }} />}
      </div>
    </StyledDiv>
  )
}