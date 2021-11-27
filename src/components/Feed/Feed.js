import Post from "../Post/Post";
import PostWriter from '../PostWriter/PostWriter';
import { useState, useEffect, useRef } from "react";
import refresh from "./refresh.svg"

function Feed({ username, setUsername }) {
    const [posts, setPosts] = useState([]);
    const refreshBtn = useRef("");

    const submitPost = async (post) => {
        try {
            const url = `${process.env.REACT_APP_API}/posts`;
            let res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })

            res = await res.text();

            if (res === 'success') {
                return true;
            }
            return false;
        } catch (e) {
            console.log("could not submit post", e);
            return false
        }

    };

    const addPostToFeed = async (post) => {
        let submittedPost = await submitPost(post);
        if (submittedPost) {
            setPosts([post, ...posts]);
        }
    };

    const updatePostInFeed = async (index, updatedPost) => {
        let submittedPost = await submitPost(updatedPost);
        if (submittedPost) {
            let newPosts = [...posts];
            newPosts[index] = updatedPost;
            setPosts(newPosts);
        }
    };

    const fetchPosts = () => {
        var classList = refreshBtn.current.classList;
        classList.remove("rotate");
        void refreshBtn.current.offsetWidth;
        classList.add("rotate");
        const url = `${process.env.REACT_APP_API}/posts`;
        fetch(url)
            .then(response => response.json())
            .then(postsList => setPosts(postsList))
            .catch(err => { console.log("could not load posts") });
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="Feed">
            <PostWriter username={username} setUsername={setUsername} addPostToFeed={addPostToFeed} />
            <input className="refreshBtn btn" ref={refreshBtn} type="image" alt="refresh"
                onClick={() => {
                    fetchPosts();
                }} src={refresh} />
            {posts.map((post, index) =>
                <Post key={index} post={post} username={username} updateThisPost={(newPost) => { updatePostInFeed(index, newPost); }} />
            )}
        </div>
    );
}

export default Feed;