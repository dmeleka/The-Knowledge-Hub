import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Question from './Question';
import { useParams } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import Navbar from '../Home/Navbar';

const exam = {
    duration: 60,
    title: 'Exam2',
    questions: [
        {
            title: 'What is the capital of France?',
            imageURL:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png',
            choices: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 0,
        },
        {
            title: 'What is the capital of Germany?',
            imageURL:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png',
            choices: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 2,
        },
        {
            title: 'What is the capital of Italy?',
            imageURL:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png',
            choices: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 3,
        },
        {
            title: 'What is the capital of Spain?',
            imageURL:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png',
            choices: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 0,
        },
        {
            title: 'What is the capital of England?',
            imageURL:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png',
            choices: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 1,
        },
    ],
};

const useStyles = makeStyles((theme) => ({
    exam: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40rem',
        padding: '1rem',
    },
    mainFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '1rem',
    },
    checkAnswerBtn: {
        backgroundColor: '#9c9797',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        marginRight: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#595757',
        },

        '&:disabled': {
            backgroundColor: '#9c9797',
            cursor: 'not-allowed',
        },
    },

    nextBtn: {
        backgroundColor: '#383838',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#121212',
        },
    },

    startBtn: {
        backgroundColor: '#383838',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#121212',
        },
    },

    alert: {
        margin: '1rem 0',
    },
}));

const initialState = {
    currentQuestion: 0,
    answer: null,
    numberOfCorrectAnswers: 0,
};

// export function Exam({ questions, title, duration }) {
const Exam = () => {

    const classes = useStyles();
    const [start, setStart] = useState(false);
    const [questionState, setQuestionState] = useState(initialState);
    const [alert, setAlert] = useState(null);
    let once = true

    const { CourseTitle } = useParams()
    const { ExamTitle } = useParams()
    const [exam, setExam] = useState({ duration: 0, title: '', questions: [] })

    Axios.get(`http://localhost:8000/courses/getExam/${CourseTitle}/${ExamTitle}`
    ).then(res => {
        setExam({
            ...exam,
            duration: res.data.duration,
            title: res.data.title,
            questions: res.data.questions
        })
    })

    const updateAnswer = (answerText) => {
        const answerNumber =
            exam?.questions[questionState.currentQuestion].choices.indexOf(
                answerText
            );
        // console.log(answerNumber);
        setQuestionState({ ...questionState, answer: answerNumber });
    };

    const handleNextQuestion = () => {
        setAlert(null);

        setQuestionState({
            ...questionState,
            currentQuestion: questionState.currentQuestion + 1,
        });

        if (questionState.numberOfCorrectAnswers === exam?.questions.length && once) {
            Axios.post(`http://localhost:8000/trainee/updateProgress/${CourseTitle}/${ExamTitle}`, {}, {
                headers: { "x-access-token": localStorage.getItem("token") }
            }).then(res => {
                console.log(res.data)
            })
            once = false
        }
    };

    const handleCheckAnswer = () => {
        const currentQuestion = exam?.questions[questionState.currentQuestion];
        // console.log(currentQuestion.answer);
        if (questionState.answer !== currentQuestion.answer) {
            setAlert({
                title: 'Incorrect answer. Please try again.',
                text: `The correct answer is ${currentQuestion.choices[currentQuestion.answer]
                    }`,
                type: 'error',
            });
        } else {
            setAlert({
                title: 'Good job!',
                text: `This is the correct answer`,
                type: 'success',
            });
        }

        setQuestionState({
            ...questionState,
            numberOfCorrectAnswers:
                questionState.answer === currentQuestion.answer
                    ? questionState.numberOfCorrectAnswers + 1
                    : questionState.numberOfCorrectAnswers,
            answer: null,
        });
    };

    return (
        <>
            <Navbar />
            <div className={classes.exam}>
                <header>
                    <h1>Short Exam: {exam?.title}</h1>
                    <p
                        style={{
                            color: 'gray',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                        }}
                    >
                        {exam?.title} | {exam?.questions.length} questions |{' '}
                        {exam?.duration} minutes
                    </p>
                </header>
                {alert && (
                    <Alert severity={alert.type} className={classes.alert}>
                        <AlertTitle>{alert.title}</AlertTitle>
                        {alert.text}
                    </Alert>
                )}
                <main>
                    {start && questionState.currentQuestion !== exam.questions.length && (
                        <>
                            <div>
                                <Question
                                    title={exam?.questions[questionState.currentQuestion].title}
                                    imageURL={
                                        exam?.questions[questionState.currentQuestion].imageURL
                                    }
                                    choices={exam?.questions[questionState.currentQuestion].choices}
                                    number={questionState.currentQuestion + 1}
                                    onSolved={updateAnswer}
                                />
                            </div>
                            <div className={`${classes.mainFooter}`}>
                                <button
                                    onClick={handleCheckAnswer}
                                    className={`${classes.checkAnswerBtn}`}
                                    disabled={questionState.answer === null}
                                >
                                    Check answer
                                </button>
                                <button
                                    onClick={handleNextQuestion}
                                    className={`${classes.nextBtn}`}
                                >
                                    {questionState.currentQuestion === exam.questions.length - 1
                                        ? 'See the results'
                                        : 'Next'}
                                </button>
                            </div>
                        </>
                    )}
                    {questionState.currentQuestion === exam?.questions.length && (
                        <>
                            {questionState.numberOfCorrectAnswers ===
                                exam?.questions.length && (
                                    <div className={`${classes.all}`}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <AiOutlineStar
                                                style={{
                                                    fontSize: '5rem',
                                                    color: '#f9d71c',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            />
                                        </div>
                                        <h1>
                                            You Passed!.
                                        </h1>
                                        <p>
                                            You got {questionState.numberOfCorrectAnswers} out of{' '}
                                            {questionState.numberOfCorrectAnswers}
                                        </p>
                                    </div>
                                )}

                            {questionState.numberOfCorrectAnswers !==
                                exam?.questions.length && (
                                    <div className={`${classes.notAll}`}>
                                        {/* sad icon */}
                                        <h1>
                                            Go Study!{' '}
                                            <span role='img' aria-label='emoji'>
                                                😊
                                            </span>
                                        </h1>
                                        <p>
                                            You got {questionState.numberOfCorrectAnswers} out of{' '}
                                            {exam?.questions.length}
                                        </p>
                                    </div>
                                )}
                        </>
                    )}
                </main>
                <footer>
                    {!start && (
                        <button
                            onClick={() => {
                                setStart(true);
                            }}
                            className={`${classes.startBtn}`}
                        >
                            Start Exam
                        </button>
                    )}
                </footer>
            </div>
        </>
    );
}

export default Exam