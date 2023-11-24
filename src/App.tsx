import { Content } from "./components/content/Main";
import { Header } from "./components/header/Main";

import './App.css';
import 'styles/global.css'
import 'styles/_variables.css'
import { Flex } from 'antd';

function App() {
  return (
    <Flex vertical>
      <Header />
      <Content />
    </Flex>
  );
}

export default App;
