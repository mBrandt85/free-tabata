import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { Content } from '../components/content'
import Layout from '../components/layout'
import { Text } from '../components/typography'

export default function Error({ value }: { value?: string }) {
  const navigate = useNavigate()

  return (
    <Layout
      title="Error"
      buttonsStart={[
        { onClick: () => navigate('/'), icon: FaHome }
      ]}
    >
      <Content vCenter hCenter>
        {value && <Text margin='0'>{value}</Text>}
      </Content>      
    </Layout>
  )
}
