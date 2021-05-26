import { StoreContext } from "@store/StoreProvider";
import styles from "@styles/Home.module.css";
import { useContext } from "react";
import { types } from "@store/reducer";
import Answer from "../Answer"

const quizCard = () => {
  const [store, dispatch] = useContext(StoreContext);
  const question = store.quiz
  const currentQuestion = store.currentQuestion

  const getRandom = (type) => {
    const index = Math.floor(Math.random() * store.templates[type].length);
    return store.templates[type][index];
  }

  // TODO: enable function when option is selected

  const getResponse = () => {
    dispatch({
      type: types.setGetAnswer,
      payload: true
    })
    setTimeout(() => {
      dispatch({ 
        type: types.setGetAnswer,
        payload: false
      })
    }, 1300)
  }

  // Usar if para lenght

  // const nextQuestion = () => {
  //   currentQuestion + 1
  // }

  const selectAnswer = () => {
    dispatch({
      type: types.selectedAnswer,
      payload: getRandom("correct")
    })
    getResponse()

    if(currentQuestion < question.length - 1){
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
 
  
  // const renderError = () => {
  //   if(!error){ 
  //     return;
  //   } else {
  //     getRandom("error")
  //   }
  // }
  // console.log("ESTAMOS EN CARD", question[0].options)


  console.log("QUESTION::", question)
  console.log("QUESTION_LENGTH::", question.length)
  // console.log("CURRENT_QUESTION::", question[currentQuestion])
  // console.log("ANSWER_OPTIONS", question[0].options)

  return (
    <div className={styles.container}>
      {store.getAnswer === true ? <Answer/> : null}

    {store.finalScore === false ? (
      <>
        <h1 className={styles.quiz_title}>
          {question[currentQuestion].title}
        </h1>

        <div className={styles.quiz_grid}>
          {Array.isArray(question[0].options) && question[0].options.map(option => {
            return (
              <button onClick={selectAnswer} key={option.id} className={styles.quiz_card}>
                <h2>{option.title} &rarr;</h2>
              </button>
            )
          })}
        </div>
      </>
    ) : (
      <h1>Finished time: {store.timer} Sec</h1>
    )}
    </div>
  );
};

export default quizCard;