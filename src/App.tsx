import { Content } from "./components/content/Main";
import { Header } from "./components/header/Main";

import './App.css';
import 'styles/global.css'
import 'styles/_variables.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
