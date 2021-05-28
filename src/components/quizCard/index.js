import { Fragment, useEffect } from "react";
import { StoreContext } from "@store/StoreProvider";
import styles from "@styles/Home.module.css";
import checkBox from "@styles/multiselect.module.css";
import { useContext } from "react";
import { types } from "@store/reducer";
import Answer from "../Answer"
import Link from "next/link";

const QuizCard = () => {
  const [store, dispatch] = useContext(StoreContext);
  const questions = store.questions
  const currentQuestion = store.currentQuestion
  let boxes = document.getElementsByName("isMultiselect");

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
      dispatch({
        type: types.setMultiAnswerSelection,
        payload: []
      })
      boxesArr.find(i => i.checked === true ? i.checked = false : null)
    }, 1300)
  }

  let multiselection = []
  console.log("CAJAS::", boxes)
  var boxesArr = Array.prototype.slice.call(boxes, 0);
  let checkedBoxes

  console.log("BOXESSS__", boxesArr)
  const verifyCurrentCheckbox = () => {

      checkedBoxes = boxesArr.filter((checkbox) => {
        return checkbox.checked;
      });

    multiselection = checkedBoxes.map((checkbox) => {
      return parseInt(checkbox.value);
    })
    dispatch({
      type: types.setMultiAnswerSelection,
      payload: multiselection
    })

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

  const submitMultiselect = () => {
    let verifyError = store.multiAnswerSelection.find(score => score === 0)

    if(verifyError === 0) {
      console.log("INCORRECT", verifyError)
      return selectAnswer(verifyError)
    } else {
      console.log("CORRECTO?", 1)
      return selectAnswer(1)
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
          {Array.isArray(questions[currentQuestion].options) && questions[currentQuestion].options.map((option, i) => {
            return (
              <Fragment key={i}  >
                {questions[currentQuestion].question_type === "SELECT" ? (
                  <button
                    onClick={() => selectAnswer(option.score)}
                    className={styles.quiz_card}>
                    <h2 style={{ fontWeight: "normal" }}>
                      {option.title}
                    </h2>
                  </button>
                ) : questions[currentQuestion].question_type === "MULTISELECT" ? (
                  <>
                    <label className={checkBox.multiSelect_label}>

                      <input
                        value={option.score}
                        name='isMultiselect'
                        type='checkbox'
                        onChange={(e) => verifyCurrentCheckbox()}
                        className={checkBox.buton_input}
                      />
                      <h2 className={checkBox.button_span} style={{ fontWeight: "normal" }}>
                        {option.title}
                      </h2>
                    </label>
                  </>
                ) : <p>an error occurred, please report to your teacher</p>}
              </Fragment>
            )
          })}
        </div>

          {questions[currentQuestion].question_type === "MULTISELECT" ? (
            <>
              {store.multiAnswerSelection.length <= 1 ? (
                <button
                  disabled
                  className={styles.quiz_card}
                  style={{ textAlign: "center" }}
                >
                  <h2 style={{ fontWeight: "normal" }}>
                    Select more than 1 options
                  </h2>
                </button>
              ) : (
                <button
                  onClick={() => submitMultiselect()}
                  className={styles.quiz_card}
                  style={{ textAlign: "center" }}
                >
                  <h2 style={{ fontWeight: "normal" }}>
                    Confirm Selection
                  </h2>
                </button>
              )}

            </>
          ) : null}

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

export default QuizCard;