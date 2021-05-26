export const types = {
  setScore: "score - puntos",
  setQuiz: "quiz - prueba",
  setTemplate: "template",
  setStarted: "start - empezar",
  startTimer: "start_timer - iniciar_temporizador",
  resetTimer: "reset_timer - reiniciar_temporizador",
  timerRef: "timerRef",
  setCurrentQuestion: "setCurrentQuestion",
  selectedAnswer: "Selected_Answer",
  setGetAnswer: "setGetAnswer",
  setFinishedQuiz: "setFinishedQuiz",
  setFinalScore: "setFinalScore",
  resetCurrentQuestion: "resetCurrentQuestion"
}

export const initialStore = {
  started: false,
  score: 0,
  quiz: null,
  totalTime: 0,
  timer: 0,
  timerRef: null,
  currentQuestion: 0,
  getAnswer: false,
  finalScore: false,
  selectedAnswer: "",
  templates: {
      correct: ['That\'s right!','Yes! Maybe you paid attention?','You seem to know most of the anwers','Keep it up!'],
      incorrect: ['Uhh no.', 'Nop, you are wrong dude.', 'Mmmmm... almost there, but no.', 'No! Have you been paying attention?']
  }
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.setStarted:
      return {
        ...state,
        started: true,
        // timer: action.payload
      }
    case types.startTimer:
      return {
        ...state,
        timer: action.payload
      }
    case types.timerRef:
      return {
        ...state,
        timerRef: action.payload
      }
    case types.resetTimer:
      return {
        ...state,
        timer: 0,
        started: false
      }

    case types.setCurrentQuestion:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      }
    case types.selectedAnswer:
      return {
        ...state,
        selectedAnswer: action.payload
      }
      // setGetAnswer
    case types.setGetAnswer:
      return {
        ...state,
        getAnswer: action.payload
      }
    case types.setScore: 
      return {
        ...state,
        score: action.payload
      }
    case types.setQuiz:
      return {
        ...state,
        quiz: action.payload
      }

    case types.setFinalScore:
      return {
        ...state,
        finalScore: action.payload
      }
    case types.resetCurrentQuestion:
      return {
        ...state,
        currentQuestion: 0
      }
      // finishedQuiz
    default:
      return state
  }
}

export default storeReducer
