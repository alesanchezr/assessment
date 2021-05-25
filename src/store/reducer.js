export const types = {
  setScore: "score - puntos",
  setQuiz: "quiz - prueba",
  setTemplate: "template",
  setStarted: "start - empezar",
  startTimer: "start_time - iniciar_temporizador"
}

export const initialStore = {
  started: false,
  score: 0,
  quiz: null,
  totalTime: 0,
  timer: 0,
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
    default:
      return state
  }
}

export default storeReducer
