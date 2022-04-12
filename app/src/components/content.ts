import styled from 'styled-components'

interface Props {
  vCenter?: boolean
  hCenter?: boolean
}

export const Content = styled.div<Props>`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  flex-grow: 1;
  justify-content: ${({ hCenter }) => hCenter ? 'center' : 'start'};
  align-items: ${({ vCenter }) => vCenter ? 'center' : 'start'};
`