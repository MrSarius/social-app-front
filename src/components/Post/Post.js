import Reaction from "../Reaction/Reaction";
import { useState } from "react";
import heart from "./heart.svg"
import laugh from "./laugh.svg"
import cry from "./cry.svg"

function Post({ postObject, username }) {

  const [heartCount, setHeartCount] = useState(postObject.reactions.heart.length);
  const [laughtCount, setLaughtCount] = useState(postObject.reactions.laugh.length);
  const [cryCount, setCryCount] = useState(postObject.reactions.cry.length);

  const updatePost = () => {
    const url = `${process.env.REACT_APP_API}/posts`
    fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObject)
      }
    ).then(res => {
      return res.json();
    })
      .then(res => {
        console.log(res) //TODO handle success?
      })
      .catch(err => { console.log(err) }); //TODO handle error? TODO link for user
  }

  const inc = (emoji) => {
    if (username) {
      if (emoji == "heart") {
        postObject.reactions.heart = addOrRemove(postObject.reactions.heart, username);
        setHeartCount(postObject.reactions.heart.length);
      } else if (emoji == "laugh") {
        postObject.reactions.laugh = addOrRemove(postObject.reactions.laugh, username);
        setLaughtCount(postObject.reactions.laugh.length);
      } else {
        postObject.reactions.cry = addOrRemove(postObject.reactions.cry, username);
        setCryCount(postObject.reactions.cry.length);
      }
      console.log(postObject);
      updatePost();
    }
  }

  const addOrRemove= (list, elem) => {
    if (list.includes(elem)) {
      list = list.filter(user => user !== elem);
    } else {
      list.push(elem)
    }
    return list;
  }

  return (
    <div className="Post">
      <div class="postWrapper">
        <div class="postTitle">
          <h2>{postObject.title}</h2>
        </div>
        <div class="postContent">
          <span>{postObject.content}</span>
        </div>
        <div class="postUsername">
          <a href="https://www.google.de">@{postObject.username}</a>
        </div>
        <div class="emojiContainer">
          <Reaction emojiSvg={heart} count={heartCount} inc={() => inc("heart")} />
          <Reaction emojiSvg={laugh} count={laughtCount} inc={() => inc("laugh")} />
          <Reaction emojiSvg={cry} count={cryCount} inc={() => inc("cry")} />
        </div>
      </div>
    </div>
  );
}

export default Post;