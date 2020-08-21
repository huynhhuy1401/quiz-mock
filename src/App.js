import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useFetchQuestion } from './hooks/useFetchQuestions'
import Question from './Question'

const TOTAL_QUESTIONS = 25

function App() {
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const { loading, error, questions } = useFetchQuestion(gameStarted)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)

  const startQuiz = () => {
    setGameStarted(true)
  }

  const nextQuestion = () => {
    if (questionNumber === TOTAL_QUESTIONS - 1) {
      setGameOver(true)
    } else if (questionNumber < TOTAL_QUESTIONS - 1) {
      setQuestionNumber(questionNumber + 1)
    }
  }

  const onQuestionAnswer = (answer) => {
    const correctAnswer = questions[questionNumber].correct_answer
    if (answer === correctAnswer) {
      setScore(score + 1)
    }
    nextQuestion()
  }

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Quiz Demo</h1>
      {loading && <h3 className="mt-4">Loading questions...</h3>}
      {error && <h3 className="mt-4">Error, please reload</h3>}
      {!gameStarted && (
        <Button
          variant="outline-primary"
          className="mt-4 d-block w-25"
          onClick={startQuiz}
        >
          Start
        </Button>
      )}
      {!gameStarted && (
        <Button variant="outline-info" className="mt-4 d-block w-25">
          Instruction
        </Button>
      )}
      {questions.length !== 0 && !gameOver && (
        <Question
          question={questions[questionNumber]}
          onQuestionAnswer={onQuestionAnswer}
          questionNumber={questionNumber}
        />
      )}
      {gameStarted && gameOver && <h3>Total score: {score}</h3>}
    </Container>
  )
}

export default App
