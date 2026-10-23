
import WelcomeForm from "./WelcomeForm";
import { useEffect, useState } from "react";
import "./App.css";

function getTimeLeft() {
  const now = new Date();
  let birthday = new Date(now.getFullYear(), 5, 3, 0, 0, 0);

  if (now >= birthday) {
    birthday = new Date(now.getFullYear() + 1, 5, 3, 0, 0, 0);
  }

  const difference = birthday.getTime() - now.getTime();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const letterMessage =
  "You make ordinary moments feel magical. If I could choose one person to meet in every lifetime, I would choose you every single time. You make my world brighter just by being in it. My Princess, you deserve endless happiness, beautiful memories, and all the love this world can offer. No matter how ordinary a day may seem, it becomes special when you're part of it. ❤️";

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  const [isBirthday, setIsBirthday] = useState(() => {
    const today = new Date();
    return today.getMonth() === 5 && today.getDate() === 3;
  });

  const [showLetter, setShowLetter] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [herName, setHerName] = useState("");

  // Update countdown and birthday status every second.
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setIsBirthday(
        now.getMonth() === 5 && now.getDate() === 3
      );

      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate the letter's text when the letter is opened.
  useEffect(() => {
    if (!showLetter) {
      setTypedMessage("");
      return;
    }

    let index = 0;

    const typingTimer = setInterval(() => {
      index++;

      setTypedMessage(letterMessage.slice(0, index));

      if (index >= letterMessage.length) {
        clearInterval(typingTimer);
      }
    }, 28);

    return () => clearInterval(typingTimer);
  }, [showLetter]);

  // Show the welcome quiz before revealing the main website.
  if (!isUnlocked) {
    return (
      <WelcomeForm
        onUnlock={(name) => {
          setHerName(name);
          setIsUnlocked(true);
        }}
      />
    );
  }

  return (
    <main className="page">
      {/* Background stars */}
      <div className="stars" aria-hidden="true">
        {Array.from({ length: 35 }, (_, index) => (
          <span
            className="star"
            key={index}
            style={{
              left: `${(index * 37 + 11) % 100}%`,
              top: `${(index * 53 + 7) % 100}%`,
              animationDelay: `${(index % 7) * 0.4}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Background glow */}
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      {/* Birthday confetti */}
      {isBirthday && (
        <div className="confetti-container" aria-hidden="true">
          {Array.from({ length: 60 }, (_, index) => (
            <span
              key={index}
              className="confetti"
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 10) * 0.3}s`,
                animationDuration: `${3 + (index % 5)}s`,
              }}
            >
              {index % 2 === 0 ? "♥" : "✦"}
            </span>
          ))}
        </div>
      )}

      <section className="birthday-card">
        <div className="crown">♕</div>

        <p className="eyebrow">A LITTLE WORLD MADE JUST FOR YOU</p>

        <h1>
          {isBirthday ? (
            <>
              Happy Birthday,
              <span>My Princess! ❤️</span>
            </>
          ) : (
            <>
              For My <span>Princess</span>
            </>
          )}
        </h1>

        <div className="heart-divider">
          <span>♡</span>
        </div>

        <p className="intro">
          {isBirthday ? (
            <>
              Today is all about you, my love. 💖
              <br />
              You deserve every beautiful thing in this world. ✨
            </>
          ) : (
            <>
              Somewhere between all the stars,
              <br />
              you became my favourite one. ✨
            </>
          )}
        </p>

        {/* Birthday surprise */}
        {isBirthday && (
          <div className="birthday-surprise">
            <span className="surprise-icon">🎂</span>

            <h2>Today Is Your Day!</h2>

            <p>
              May your smile shine brighter than every star
              and your heart always be surrounded by love. 💗
            </p>

            <div className="surprise-hearts">♡ ♥ ♡</div>
          </div>
        )}

        {/* Countdown label */}
        {!isBirthday && (
          <div className="birthday-label">
            <span className="tiny-heart">♥</span>
            COUNTING DOWN TO YOUR SPECIAL DAY
            <span className="tiny-heart">♥</span>
          </div>
        )}

        {/* Countdown timer */}
        {!isBirthday && (
          <div className="countdown">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINUTES", value: timeLeft.minutes },
              { label: "SECONDS", value: timeLeft.seconds },
            ].map((item) => (
              <div className="time-box" key={item.label}>
                <div className="time-number">
                  {String(item.value).padStart(2, "0")}
                </div>

                <div className="time-label">{item.label}</div>
              </div>
            ))}
          </div>
        )}

        <p className="birthday-date">♡ &nbsp; JUNE 3 &nbsp; ♡</p>

        <div className="separator">
          <span>✧</span>
        </div>

        <p className="love-message">
          If I could make one wish come true,
          <br />
          it would be to see you smile every day. 💗
        </p>

        {/* Animated love letter button */}
        <button
          className={`letter-button ${showLetter ? "letter-open" : ""}`}
          onClick={() => setShowLetter((previous) => !previous)}
          aria-expanded={showLetter}
          aria-controls="princess-love-letter"
        >
          {showLetter
            ? "Close My Little Secret ♥"
            : "💌 Open Your Little Surprise"}
        </button>

        {/* Animated love letter */}
        {showLetter && (
          <div
            className="love-letter letter-reveal"
            id="princess-love-letter"
          >
            <div className="envelope-glow">💌</div>

            <p className="letter-topline">
              A LITTLE LETTER FROM MY HEART
            </p>

            <h2>To My Princess 👑</h2>

            <div className="letter-divider">♡ ✦ ♡</div>

            <p className="letter-body">
              {typedMessage}

              {typedMessage.length < letterMessage.length && (
                <span className="typing-cursor" aria-hidden="true">
                  |
                </span>
              )}
            </p>

            {/* Reveal the ending after typing finishes */}
            {typedMessage.length === letterMessage.length && (
              <div className="letter-ending">
                <p>In every universe, it's still you. 💗</p>

                <p className="letter-signature">
                  With all my love,
                  <br />
                  <span>Forever yours ♥</span>
                </p>
              </div>
            )}
          </div>
        )}

        <p className="footer">MADE WITH ♡, JUST FOR YOU</p>
      </section>

      {/* Floating hearts */}
      <div className="floating-heart heart-one" aria-hidden="true">
        ♡
      </div>

      <div className="floating-heart heart-two" aria-hidden="true">
        ♥
      </div>

      <div className="floating-heart heart-three" aria-hidden="true">
        ♡
      </div>

      <div className="floating-heart heart-four" aria-hidden="true">
        ♥
      </div>
    </main>
  );
}

export default App;

