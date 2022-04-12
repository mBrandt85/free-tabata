import { 
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useContext, 
  useEffect, 
  useState 
} from 'react'
import { a, useTransition } from 'react-spring'
import styled from 'styled-components'

interface UiContext {
  setBackdrop: Dispatch<SetStateAction<boolean>>
}

const Ui = createContext({} as UiContext)

const BackdropDiv = styled(a.div)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 80%);
  width: 100%;
  height: 100%;
`

export default function UiProvider({ children }: { children: ReactNode }) {
  const [backdrop, setBackdrop] = useState<boolean>(false)

  const backdropTransition = useTransition(backdrop, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  useEffect(() => {
    if (backdrop) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [backdrop])

  return <Ui.Provider value={{
    setBackdrop
  }}>
    {children}
    {backdropTransition((styles, show) => show && <BackdropDiv style={styles} />)}
  </Ui.Provider>
}

export const useUi = () => useContext(Ui)