import Post from "../Post/Post";
import { useState, useEffect, useRef } from "react";
import refresh from "./refresh.svg"

function Feed({username}) {
    const [posts, setPosts] = useState([])
    const refreshBtn = useRef("")

    const fetchPosts = () => {
        const url = `${process.env.REACT_APP_API}/posts`
        fetch(url)
        .then(response => response.json())
        .then(postsList => setPosts(postsList))
        .catch(err => {console.log("could not load posts")})
    }

    useEffect(() => {
        fetchPosts();
        //setInterval(fetchPosts, 5000); TODO enable for final app
    }, [])

    return (
        <div className="Feed">
            <input className="refreshBtn btn" ref={refreshBtn} type="image"
                onClick={() => {
                    var classList = refreshBtn.current.classList
                    classList.remove("rotate")
                    void refreshBtn.current.offsetWidth;
                    classList.add("rotate");
                    fetchPosts();
                }} src={refresh} />
            {posts.map(post =>
                <Post postObject={post} username={username} />
            )}
        </div>
    );
}

export default Feed;