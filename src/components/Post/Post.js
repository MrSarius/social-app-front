import Reaction from "../Reaction/Reaction";
import heart from "./heart.svg"
import laugh from "./laugh.svg"
import cry from "./cry.svg"

function Post({ post, username, updateThisPost }) {

  const reactWithEmoji = (emoji) => {
    if (username) {
      let newReactions = {...post.reactions};
      let newPost = {...post};

      let newList = null;
      if (emoji === "heart") {
        newList = [...post.reactions.heart];
        newList = addOrRemove(newList, username);
        newReactions.heart = newList;
      } else if (emoji === "laugh") {
        newList = [...post.reactions.laugh];
        newList = addOrRemove(newList, username);
        newReactions.laugh = newList;
      } else {
        newList = [...post.reactions.cry];
        newList = addOrRemove(newList, username);
        newReactions.cry = newList;
      }
      newPost.reactions = newReactions
      debugger;
      updateThisPost(newPost);
    }
  };

  const addOrRemove = (list, elem) => {
    if (list.includes(elem)) {
      list = list.filter(user => user !== elem);
    } else {
      list.push(elem)
    }
    return list;
  }

  return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTitle">
          <h2>{post.title}</h2>
        </div>
        <div className="postContent">
          <span>{post.content}</span>
        </div>
        <div className="postUsername">
          <span>@{post.username}</span>
        </div>
        <div className={"emojiContainer"}>

          <Reaction image={heart} count={post.reactions.heart.length}
            reactWithEmoji={() => reactWithEmoji("heart")}
          />

          <Reaction image={laugh} count={post.reactions.laugh.length}
            reactWithEmoji={() => reactWithEmoji("laugh")}
          />

          <Reaction image={cry} count={post.reactions.cry.length}
            reactWithEmoji={() => reactWithEmoji("cry")}
          />

        </div>
      </div>
    </div>
  );
}

export default Post;