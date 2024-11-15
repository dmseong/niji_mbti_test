import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import questionData from './questions.json';

function TestPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const { name } = useParams(); //URL에서 name 파라미터 가져오기

    const calculateMBTI = (answers) => {
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        answers.forEach((answer) => {
            scores[answer]++;
        });
        const mbti = [
            scores.E > scores.I ? 'E' : 'I',
            scores.S > scores.N ? 'S' : 'N',
            scores.T > scores.F ? 'T' : 'F',
            scores.J > scores.P ? 'J' : 'P'
        ].join('');
        return mbti;
    };

    const handleSubmit = (selectedOption) => {
        // answers 상태 업데이트
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers, selectedOption];
            return updatedAnswers;
        });

        // step 업데이트
        setStep((prevStep) => prevStep + 1);
    };

    // answers와 step 변화를 추적
    useEffect(() => {
        if (step + 1 >= questionData.length) {
            const mbti = calculateMBTI(answers); // answers 상태를 기반으로 MBTI 계산
            console.log(mbti);
            navigate(`/result/${name}`, { state: { result : mbti } });
        }
    }, [step, answers, name, navigate]);

    const currentQuestion = questionData[step];
    const progress = (step / questionData.length) * 100;

    if (!currentQuestion) return null;

    return (
        <div className="frame">
            <div className="rectangle"></div>

            <div className="progress-bar-container">
                <div 
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <h1 className="qnum">{currentQuestion.qnum}</h1>
            <pre><h2 className="question">{currentQuestion.question}</h2></pre>

            <div>
                <pre className="options-container">
                    {currentQuestion.options.map((option) => (
                        <button
                            className="option"
                            key={option.value}
                            onClick={() => handleSubmit(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </pre>
            </div>
        </div>
    )
};

export default TestPage;