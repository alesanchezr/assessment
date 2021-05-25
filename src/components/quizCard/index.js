import { StoreContext } from "@store/StoreProvider";
import styles from "@styles/Home.module.css";
import { useContext, useEffect } from "react";
import { types } from "@store/reducer";

{/* <p>{store.templates.incorrect[Math.floor(Math.random() * store.templates.incorrect.length)]}</p> */}

const quizCard = () => {
  const [store, dispatch] = useContext(StoreContext);
  // const [1]

  const getRandom = (type) => {
    const index = Math.floor(Math.random() * store.templates[type].length);
    return store.templates[type][index];
  }

  // useEffect(() => {
  //   if(store.started === true) {
  //     setInterval(() => {
        
  //       // this.setState({ seconds: this.state.seconds + 1 });
  //     }, 1000)
  //   }
  // }), []

  let question = store.quiz
  // console.log("ESTAMOS EN CARD", question[0].options)
  
  return (
    <div className={styles.container}>
      <p>{store.timer} sec</p>
      <h1 className={styles.quiz_title}>
        {question[0].title}
      </h1>

      <div className={styles.quiz_grid}>
        {Array.isArray(question[0].options) && question[0].options.map(option => {
          return (
            <button key={option.id} className={styles.quiz_card}>
              <h2>{option.title} &rarr;</h2>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default quizCard;