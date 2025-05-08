import React, { useState } from 'react';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: '❓ How does Zenya work?',
      answer:
        'Zenya tracks live exchange rates, compares remittance services, and manages your multi-currency expenses, helping you make smarter financial decisions.',
    },
    {
      question: '❓ Can I track multiple currencies?',
      answer:
        'Yes, Zenya allows you to track and manage expenses across several currencies, providing a unified platform for your international finance needs.',
    },
    {
      question: '❓ Is Zenya secure?',
      answer:
        'Absolutely! We use industry-standard encryption to ensure your data is secure and protected.',
    },
    {
      question: '❓ Can I control Zenya from my mobile?',
      answer:
        'Yes, Zenya has both a mobile and web app that you can use to manage your finances from anywhere.',
    },
    {
      question: '❓ How often are currency rates updated?',
      answer:
        'Currency rates are updated in real-time so you can always make informed decisions.',
    },
  ];

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {questions.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>{item.question}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {activeIndex === index && (
            <div className="p-5 text-gray-500 dark:text-gray-400">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;