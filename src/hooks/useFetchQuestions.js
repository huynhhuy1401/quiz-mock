import { useState, useEffect } from 'react'

const BASE_URL = 'https://opentdb.com/api.php?amount=25&type=multiple'

function shuffleArr(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function useFetchQuestion(gameStarted) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true)
        const res = await (await fetch(BASE_URL)).json()
        setLoading(false)
        const questions = res.results.map((question) => ({
          ...question,
          answers: shuffleArr([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }))
        console.log(questions)
        setQuestions(questions)
      } catch (error) {
        setError(true)
      }
    }

    if (gameStarted) fetchQuestion()
  }, [gameStarted])

  return { loading, error, questions }
}
