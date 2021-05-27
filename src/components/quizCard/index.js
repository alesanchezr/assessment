import { StoreContext } from "@store/StoreProvider";
import styles from "@styles/Home.module.css";
import { useContext } from "react";
import { types } from "@store/reducer";
import Answer from "../Answer"
import Link from "next/link";

const quizCard = () => {
  const [store, dispatch] = useContext(StoreContext);
  const questions = store.questions
  const currentQuestion = store.currentQuestion

  const getRandom = (type) => {
    const index = Math.floor(Math.random() * store.templates[type].length);
    return store.templates[type][index];
  }

  const verifyAnswer = (score) => {
    if(score === 1){

      dispatch({ 
        type: types.setGetCorrect,
        payload: true
      })
      dispatch({
        type: types.setScore
      })
      setTimeout(() => {
        dispatch({ 
          type: types.setGetCorrect,
          payload: false
        })
      }, 1300)
      return getRandom("correct")
    } else {
      return getRandom("incorrect")
    }
  }

  // TODO: enable function when option is selected

  const getResponse = (score) => {
    dispatch({
      type: types.setGetAnswer,
      payload: true
    })
    dispatch({
      type: types.setSelectedAnswer,
      payload: verifyAnswer(score)
    })
    setTimeout(() => {
      dispatch({ 
        type: types.setGetAnswer,
        payload: false
      })
    }, 1300)
  }

  // TODO: e.target.value será util para MULTYSELECT
  const selectAnswer = (score) => {
    getResponse(score)

    if(currentQuestion < questions.length - 1){
      dispatch({ 
        type: types.setCurrentQuestion
      })
    } else {
      clearInterval(store.timerRef)
      dispatch({
        type: types.setFinalScore,
        payload: true
      })
    }
  }

  return (
    <div className={styles.container}>

    {store.getAnswer === true ? <Answer /> : null}

    {store.showFinalScore === false ? (
      <>
        <h1 className={styles.quiz_title}>
          {questions[currentQuestion].title}
        </h1>

        <div className={styles.quiz_grid}>
          {Array.isArray(questions[currentQuestion].options) && questions[currentQuestion].options.map(option => {
            return (
              <button 
                key={option.id} 
                onClick={() => selectAnswer(option.score)} 
                className={styles.quiz_card}>
                <h2 style={{fontWeight: "normal"}}>
                  {option.title} 
                </h2>
              </button>
            )
          })}
        </div>
      </>
    ) : (
      <>
      <Link href={"/"} >
       <a style={{position:"absolute", fontSize: "25px", top: 50, left: 80 }}>
        Back to Home
      </a> 
      </Link>

      <span style={{fontSize: "75px", margin: "20px 0"}}>
        {Math.floor(((store.score) / questions.length) * 100)}% accuracy
      </span>
      <span style={{fontSize: "30px", margin: "20px 0"}}>
        Your Score: {store.score} / {questions.length}<br/>
      </span>
      <span style={{fontSize: "30px", margin: "20px 0"}}>
        Finished in: {store.timer} Seconds
      </span>
      </>
    )}
    </div>
  );
};

export default quizCard;