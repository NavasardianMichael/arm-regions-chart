import { Flex } from 'antd'
import 'styles/_variables.css'
import 'styles/global.css'
import { Content } from './components/content/Main'
import { Header } from './components/header/Main'
import './App.css'

function App() {
  return (
    <Flex vertical>
      <Header />
      <Content />
    </Flex>
  )
}

export default App
