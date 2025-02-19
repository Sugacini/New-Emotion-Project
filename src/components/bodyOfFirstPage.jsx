import './bodyOfFirstPage.css';
function FirstPageBody() {
    return(
        <>
            <div className="firstPageBody">
                <div className='bodyChild'>
                    <h1 className='introLines'>Mood based Suggestions</h1>
                    <p className='introSentence'>Expresto detects your mood by analyzing facial expressions. It provides personalized recommendations for activities, music, and content based on how you're feeling.</p>
                    <button className='startedBtn'>
                         Get Started
                    </button>                
                </div>
                <div className='bodyChild'>
                    <img src="emojis.gif" className='gif'/>
                </div>
            </div>

        </>
    )
}

export default FirstPageBody;