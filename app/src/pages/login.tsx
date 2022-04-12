import { 
  GoogleAuthProvider,
  signInWithRedirect
 } from 'firebase/auth'
import { FaGoogle } from 'react-icons/fa'

import { Card } from '../components/card'
import { Content } from '../components/content'
import Item from '../components/item'
import Layout from '../components/layout'
import { H1 } from '../components/typography'
import { auth } from '../firebase'

export default function Home() {
  const login = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await signInWithRedirect(auth, provider)
  }

  return (
    <Layout
      title="Free Tabata"
    >
      <Content>
        <H1>Sign in with Google</H1>

        <Card>
          <Item
            arrow
            onClick={login}
            IconStart={FaGoogle}
          >
            Sign in
          </Item>
        </Card>
      </Content>      
    </Layout>
  )
}