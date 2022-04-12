import styled from 'styled-components'

interface Props {
  bgColor?: string
  margin?: string
}

export const Card = styled.div<Props>`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 8px black;
  background-color: ${({ bgColor }) => bgColor ? bgColor : 'white'};
  margin: ${({ margin }) => margin && margin};
  color: black;
  overflow: hidden;

  & * h1,
  & * h2,
  & * h3,
  & * h4,
  & * h5,
  & * h6,
  & * p {
    color: #010101;
  }
`