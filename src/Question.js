import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

const Question = ({ question, onQuestionAnswer, questionNumber }) => {
  const [userAnswer, setUserAnswer] = useState('')

  const answerQuestion = () => {
    onQuestionAnswer(userAnswer)
  }

  return (
    <>
      <Card className="w-100 mt-2 bg-light">
        <Card.Header className="bg-dark text-white">
          Question {questionNumber + 1} of 25
        </Card.Header>

        <Card.Body className="px-3 py-4">
          <Card.Title>
            <h3>{question.question}</h3>
          </Card.Title>
          <Image
            src="https://picsum.photos/300/200"
            className="rounded mb-2"
          ></Image>
          <div>
            {question.answers.map((answer) => (
              <div className="mb-2">
                <Form.Check
                  custom
                  key={answer}
                  type="radio"
                  label={answer}
                  id={answer}
                  onChange={() => setUserAnswer(answer)}
                  checked={answer === userAnswer}
                ></Form.Check>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={answerQuestion} variant="outline-dark">
              Next Question
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Question
