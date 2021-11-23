import { useState, useRef } from "react"
import send from "./send.svg"
import loginSvg from "./login.svg"
import logoutSvg from "./logout.svg"

function PostWriter({ username, setUsername }) {
  const [content, setContent] = useState({ title: "", content: "", username: username })

  const sendBtn = useRef("")
  const inputUsername = useRef("")
  const titleField = useRef("")
  const contentField = useRef("")

  const submit = () => {
    const url = `${process.env.REACT_APP_API}/posts`
    fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      }
    ).then(res => {
      return res.json();
    })
      .then(res => {
        if (res.status == 'success') {
          titleField.current.value = "";
          contentField.current.value = "";
        }
      })
      .catch(err => { console.log(err) });
  }

  const refreshContent = () => {
    setContent(
      {
        ...content,
        title: titleField.current.value,
        content: contentField.current.value,
        username: username
      }
    );
  }

  const login = () => {
    setUsername(inputUsername.current.value)
  }

  const logout = () => {
    setUsername("")
  }

  var loggedIn = username !== "";

  return (
    <div className="PostWriter Post" >
      {loggedIn ?
        <div className={"postWrapper"}>
          <div className={"postWrapperWelcome"}>
            <h2>Hey {username}</h2>
            <h3>Tell us what's on your mind</h3>
          </div>

          <div className="postWrapperPost">
            <div className={"postWrapperTitle"}>
              <input placeholder="Title" type="text" ref={titleField} className="title" name="title" />
            </div>
            <div className={"postWrapperContent"}>
              <input placeholder="Write your content here..." ref={contentField} type="text" className="content" name="content" />
            </div>
          </div>

          <div className="emojiContainer">
            <input className="loginBtn btn" type="image" src={logoutSvg} onClick={logout} title="logout" />
            <input className="sendBtn btn" ref={sendBtn} type="image"
              onClick={() => {
                var classList = sendBtn.current.classList
                classList.remove("clicked")
                void sendBtn.current.offsetWidth;
                classList.add("clicked");
                refreshContent();
                submit();
              }} src={send} title="send"/>
          </div>
        </div>
        :
        <div className={"postWrapper"}>
          <div className={"postWrapperWelcome"}>
            <h2>Choose A Username</h2>
          </div>
          <div className="postWrapperTitle">
            <input type="text" placeholder="Username" ref={inputUsername} className="username" name="username" />
          </div>

          <div className="emojiContainer">
            <input className="loginBtn btn" type="image" src={loginSvg} onClick={login} title="login" />
          </div>
        </div>}
    </div >
  );
}

export default PostWriter;