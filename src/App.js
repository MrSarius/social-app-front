import './App.css';
import Feed from './components/Feed/Feed';
import PostWriter from './components/PostWriter/PostWriter';
import cloudFlareLogo from "./cloudflare_logo.svg"
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <img className={"logo"} src={cloudFlareLogo} alt="Logo" />
      <h1>Cloudflare Social App</h1>
      <PostWriter username={username} setUsername={setUsername} />
      <Feed username={username} />
    </div>
  );
}

export default App;
