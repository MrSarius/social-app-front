import './App.css';
import Feed from './components/Feed/Feed';
import cloudFlareLogo from "./cloudflare_logo.svg"
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <img className={"logo"} src={cloudFlareLogo} alt="Logo" />
      <h1>Cloudflare Social App</h1>
      <Feed username={username} setUsername={setUsername} />
    </div>
  );
}

export default App;
