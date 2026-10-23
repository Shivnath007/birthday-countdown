
import { useState } from "react";
import "./WelcomeForm.css";

const questions = [
  {
    question: "Who is your favourite person? 🥹❤️",
    type: "text",
    placeholder: "Tell me who... 💗",
  },
  {
    question: "Who is your favourite human to annoy? 😂❤️",
    type: "text",
    placeholder: "Your answer...",
  },
  {
    question: "Who is your forever person? ♾️❤️",
    type: "text",
    placeholder: "Think carefully... 💕",
  },
  {
    question: "What's one thing about us that makes you smile? 💗",
    type: "text",
    placeholder: "Something that makes you happy...",
  },
  {
    question: "What's your favourite memory with me? 🥰",
    type: "textarea",
    placeholder: "Tell me about that special moment...",
  },
  {
    question: "If our story had a title, what would you name it? 📖",
    type: "text",
    placeholder: "Our story would be called...",
  },
  {
    question: "What's one thing you want us to do together someday? ✨",
    type: "textarea",
    placeholder: "Something you dream of doing together...",
  },
  {
    question: "Who is the bigger baby between us? 🧸",
    type: "choice",
    options: [
      "Me 🙈",
      "You 😂",
      "Both of us ❤️",
    ],
  },
  {
    question: "If I stole your favourite food, what would you do? 😂",
    type: "choice",
    options: [
      "Share it anyway 🥹",
      "Steal yours back 😈",
      "Demand a treat as compensation 🍫",
    ],
  },
  {
    question: "Are you ready to unlock your little surprise? 🎁❤️",
    type: "choice",
    options: [
      "YESSS! 💖",
      "Of course, silly! 🥹",
      "Unlock it already! 😘",
    ],
  },
];

function WelcomeForm({ onUnlock }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [direction, setDirection] = useState("next");

  const current = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentQuestion] || "";

  function updateAnswer(value) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: value,
    }));

    setError("");
  }

  function handleNext() {
    if (!String(currentAnswer).trim()) {
      setError("Choose an answer first, Princess. 💗");
      return;
    }

    if (isLastQuestion) {
      onUnlock();
      return;
    }

    setDirection("next");
    setCurrentQuestion((previous) => previous + 1);
    setError("");
  }

  function handlePrevious() {
    if (currentQuestion === 0) return;

    setDirection("previous");
    setCurrentQuestion((previous) => previous - 1);
    setError("");
  }

  return (
    <main className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-crown">♕</div>

        <p className="welcome-eyebrow">
          A LITTLE WORLD MADE JUST FOR YOU
        </p>

        <h1>
          Hello, <span>My Princess! ♡</span>
        </h1>

        <p className="welcome-message">
          Before you enter this little world,
          <br />
          answer a few little questions for me. 💌
        </p>

        <div className="quiz-progress">
          <div className="quiz-progress-info">
            <span>YOUR LITTLE QUIZ 💗</span>
            <span>
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div
            className="quiz-progress-track"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={questions.length}
            aria-valuenow={currentQuestion + 1}
            aria-label="Quiz progress"
          >
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <section
          className={`quiz-question quiz-${direction}`}
          key={currentQuestion}
        >
          <h2>{current.question}</h2>

          {current.type === "text" && (
            <input
              type="text"
              value={currentAnswer}
              onChange={(event) => updateAnswer(event.target.value)}
              placeholder={current.placeholder}
              aria-label={current.question}
              autoComplete="off"
            />
          )}

          {current.type === "textarea" && (
            <textarea
              value={currentAnswer}
              onChange={(event) => updateAnswer(event.target.value)}
              placeholder={current.placeholder}
              aria-label={current.question}
              rows={4}
            />
          )}

          {current.type === "choice" && (
            <div className="quiz-options">
              {current.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`quiz-option ${
                    currentAnswer === option ? "selected" : ""
                  }`}
                  aria-pressed={currentAnswer === option}
                  onClick={() => updateAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="welcome-error" role="alert">
              {error}
            </p>
          )}
        </section>

        <div className="quiz-navigation">
          <button
            type="button"
            className="previous-button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="unlock-button"
            onClick={handleNext}
          >
            {isLastQuestion ? "Unlock My Surprise 💖" : "Next ♡"}
          </button>
        </div>

        <p className="welcome-footer">
          NO WRONG ANSWERS, JUST LOVE ♥
        </p>
      </div>
    </main>
  );
}

export default WelcomeForm;
