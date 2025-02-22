import { useNavigate } from 'react-router-dom';
function FirstPageBody() {
    const navigate = useNavigate();

    return(
        <>
            <div className="firstPageBody">
                <div className='bodyChild'>
                    <h1 className='introLines'>Mood based Suggestions</h1>
                    <p className='introSentence'>Expresto detects your mood by analyzing facial expressions. It provides personalized recommendations for activities, music, and content based on how you're feeling.</p>
                    <button className='startedBtn' onClick={() => {navigate("/loginPage")}}>
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