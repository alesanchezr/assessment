import { StoreContext } from "@store/StoreProvider";
import styles from "@styles/Home.module.css";
import { useContext } from "react";
import { types } from "@store/reducer";

export const Answer = () => {
  const [store, dispatch] = useContext(StoreContext);
  // const question = store.questions;

  return (
    <div className={styles.container} style={{ width: "100%", position: 'absolute', zIndex: 1, backgroundColor:"#FFFFFF"}}>
      <h2 className={styles.quiz_title}>
        {store.selectedAnswer}
      </h2>
    </div>
  );
};

export default Answer;
