import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { Content } from '../components/content'
import Layout from '../components/layout'
import { H1, H2 } from '../components/typography'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Layout
      title="Not Found 404"
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaHome }
      ]}
    >
      <Content vCenter hCenter>
        <H2>Path does not exists</H2>
        <H1>/sdgf</H1>
      </Content>      
    </Layout>
  )
}
