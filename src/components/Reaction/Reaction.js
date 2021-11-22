import { useRef } from "react"

function Reaction({ emojiSvg, count, inc }) {
    const btn = useRef("")

    return (
        <div className="Reaction">
            <div className="reactionCount">{count}</div>
            <input className="emojiBtn btn" ref={btn} type="image"
                onClick={() => {
                    let currBtn = btn.current;
                    currBtn.classList.remove("clicked");
                    void currBtn.offsetWidth;
                    currBtn.classList.add("clicked");
                    inc();
                }} src={emojiSvg} />
        </div>
    );
}

export default Reaction;