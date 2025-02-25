function Game() {
    return (
        <div className="gameOuter">
            <div className="gameInsideOuter">
                <div className="gameHead">SELECT YOUR GAMES</div>
                <div className="gameQuote">"Play, enjoy, and let the game bring out the best in you"</div>
                <div className="game">
                    {/* <a href="https://scratch.mit.edu/projects/1044819398/fullscreen/" className="game1" target="_blank"> */}
                    <div className="game1">
                        <div className="game1Inside">
                            <p className="gameDesc">A Jumbled Word Game is a fun and challenging puzzle where players unscramble mixed-up letters to form correct words.</p>
                            <a href="https://scratch.mit.edu/projects/1044819398/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>

                    <div className="game2">
                        <div className="game1Inside">
                            <p className="gameDesc">Fruit Ninja is a fast-paced arcade game where players slice flying fruits with a swipe while avoiding bombs to achieve high scores.</p>
                            <a href="https://scratch.mit.edu/projects/1040640763/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>

                    <div className="game3">
                        <div className="game1Inside">
                            <p className="gameDesc">Flappy Bird is a simple yet challenging arcade game where players navigate a bird through gaps between pipes by tapping the screen to keep it flying.</p>
                            <a href="https://scratch.mit.edu/projects/1044798295/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;