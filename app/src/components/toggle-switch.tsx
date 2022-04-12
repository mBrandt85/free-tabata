import styled from 'styled-components'

interface Props {
  checked?: boolean
  onChange?: () => void
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 3.1rem;
  height: 1.4rem;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & input:checked + span {
    background-color: #2196F3;
  }

  & input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  & input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;

  &:before {
  position: absolute;
  content: "";
  height: .9rem;
  width: .9rem;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
`

export default function ToggleSwitch({ checked, onChange }: Props) {
  return (
    <Switch>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <Slider />
    </Switch>
  )
}