const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

//shuffles questions randomly, showing randomized question on the current question container //
let shuffledQuestions, currentQuestionIndex
//start and next buttons for code quiz game //
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// function used to start the code quiz game, next button hidden on purpose //
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
// function to set container's question //
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
// function with conditional statement,
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
// function used to clear container's state with a loop
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
// function with array that returns a live collection that updates, 
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
// function that takes and element and sees if its correct or false //  
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}
// removes classes instead of adding them //
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// questions for the code quiz containeer
const questions = [
  {
    question: 'Which one of these is an example of a loop?',
    answers: [
      { text: 'for/of', correct: true },
      { text: 'and/but', correct: false }
    ]
  },
  {
    question: 'Css does what in a website?',
    answers: [
      { text: 'Styling', correct: true },
      { text: 'text filing', correct: false },
      { text: 'functionality', correct: false },
      { text: 'transcoding', correct: false }
    ]
  },
  {
    question: 'You need the ! when typing DOCTYPE html.',
    answers: [
      { text: 'False', correct: false },
      { text: 'True', correct: true }
    
    ]
  },
  {
    question: 'What are chrome DevTools used for?',
    answers: [
      { text: 'To browse the web.', correct: false },
      { text: 'To debug errors on your code.', correct: true },
      { text: 'To make orders online.', correct: false },
      { text: 'To size and zoom your the current webpage.', correct: false }
    ]
  },
  {
    question: 'Modern web applications can do what?',
    answers: [
      { text: 'Synchronize visual elements between users across locations', correct: true },
      { text: 'Display intergalactic channels for public information', correct: false },
      { text: 'Algorithmically predict user preferences based on historic choices', correct: true },
      { text: 'Predict the future', correct: false }
    ]
  },
  {
    question: 'Nearly 50 percent of all professional developers are self taught.',
    answers: [
      { text: 'false', correct: false },
      { text: 'true', correct: true }
    ]
  }
]