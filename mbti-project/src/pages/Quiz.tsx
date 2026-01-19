import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/mbtiData';
import { calculateMBTI } from '../utils/mbtiCalculator';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      // Finish
      const result = calculateMBTI(newAnswers);
      navigate('/result', { state: result });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-gray-500 font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                  ${answers[currentQuestion.id] === option.value 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <span className="text-lg font-medium">{option.text}</span>
                {answers[currentQuestion.id] === option.value && (
                  <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
