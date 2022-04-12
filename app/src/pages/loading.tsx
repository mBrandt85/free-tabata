import { keys } from "@mui/system"
import { animated, useSpring } from "react-spring"
import styled from "styled-components"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 16px;
  color: white;
  font-weight: 900;
  letter-spacing: 4px;
  line-height: 32px;
  text-transform: uppercase;
`

export default function Loading({ value = [] }: { value: string[] }) {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1 },
      { opacity: 0 },
    ],
    from: { opacity: 0 },
  })
  
  return (
    <StyledContainer>
      {value.map((text, key) => (
        <animated.span key={key} style={styles}>{text}</animated.span>
      ))}
    </StyledContainer>
  )
}
