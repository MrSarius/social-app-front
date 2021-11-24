import { useRef } from "react"

function Reaction({ image, count, reactWithEmoji }) {
    const btn = useRef("")

    return (
        <div className="Reaction">
            <div className="reactionCount">{count}</div>
            <input className="emojiBtn btn" ref={btn} type="image" alt="react"
                onClick={() => {
                    let currBtn = btn.current;
                    currBtn.classList.remove("clicked");
                    void currBtn.offsetWidth;
                    currBtn.classList.add("clicked");
                    reactWithEmoji()
                }} src={image} />
        </div>
    );
}

export default Reaction;