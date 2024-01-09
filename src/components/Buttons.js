import React, { useState } from "react";
import "./Buttons.css";
import PaymentsModal from "./PaymentsModal";

const playMP3 = () => {
  const audio = new Audio("/computerbeep_8.mp3");
  audio.play();
};

export const Buttons = ({ isLoggedIn, user }) => {
  const [modalState, setModalState] = useState({
    type: "",
    open: false,
  });

  return (
    <div>
      <div className="buttons">
        <button
          className="button"
          onClick={() => {
            playMP3();
            setModalState({
              type: "send",
              open: true,
            });
          }}
          disabled={!isLoggedIn}
        >
          Send
        </button>

        <button
          className="button"
          onClick={() => {
            playMP3();
            setModalState({
              type: "receive",
              open: true,
            });
          }}
          disabled={!isLoggedIn}
        >
          Receive
        </button>

        <a
          className="a"
          href="https://bitcoin.clarkmoody.com/dashboard/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playMP3}
        >
          Status
        </a>
      </div>
      
      {!isLoggedIn && (
        <p className="login-message">
        </p>
      )}

      <PaymentsModal modalState={modalState} setModalState={setModalState} user={user} />
    </div>
  );
};

export default Buttons;
