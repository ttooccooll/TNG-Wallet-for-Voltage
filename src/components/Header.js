import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Header.css";

Modal.setAppElement("#root");

const playMP3 = () => {
  const audio = new Audio("/computerbeep_8.mp3");
  audio.play();
};

const playMP5 = () => {
  const audio = new Audio("/tng_swoosh_clean.mp3");
  audio.play();
};

const playMP6 = () => {
  const audio = new Audio("/largeexplosion4.mp3");
  audio.play();
};

const playMP7 = () => {
  const audio = new Audio("/tng_poweringup.mp3");
  audio.play();
};

const playMP8 = () => {
  const audio = new Audio("/denybeep.mp3");
  audio.play();
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "black",
    color: "white",
  },
  overlay: {
    background: "black",
    opacity: .6
  }
};

const Header = ({ isLoggedIn, user }) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rank: ""
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post(`${backendUrl}/users/login`, formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoginModalIsOpen(false);
        setUserCreated(false);
        setFormData({
          username: "",
          password: "",
          rank: ""
        });

        playMP7();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [setError] = useState("");

  const [signupError, setSignupError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();

      // Check if the selected rank is "Plebian"
  if (formData.rank !== "Plebian") {
    // Handle the case where the rank is not "Plebian"
    playMP8();
    setSignupError(`There are no ${formData.rank}s in bitcoin.`);
    setFlashMessage(true);
      return; // Exit the function without making the API call
    }

    axios
      .post(`${backendUrl}/users/register`, formData)
      .then((res) => {
        if (res.status === 201) {
          setUserCreated(true);
          setSignupModalIsOpen(false);
          setLoginModalIsOpen(true);
          setFormData({
            username: "",
            password: "",
            rank: ""
          });
          playMP7();
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred during signup. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    playMP6();

    setTimeout(() => {
      window.location.reload();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Apply the shake animation to the body during the 10-second delay
    document.body.classList.add('shake');
    setTimeout(() => {
      document.body.classList.remove('shake');
    }, 11000);
  };

  return (
    <div className="header-container">
      <div className="auth-container">
        {isLoggedIn ? <p className="user">Plebian {user.username}</p> : null}

        {isLoggedIn ? (
          <button className="auth-button" onClick={handleLogout}>
            Self Destruct
          </button>
        ) : (
          <>
            <button
              className="auth-button"
              onClick={() => {playMP3(); setLoginModalIsOpen(true)}}
            >
              Login
            </button>
            <button
              className="auth-button"
              onClick={() => {playMP3(); setSignupModalIsOpen(true)}}
            >
              Signup
            </button>
          </>
        )}
      </div>
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={() => {playMP5(); setLoginModalIsOpen(false)}}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2>Login</h2>
        {userCreated && (
          <p>Your user was successfully created. You can now login.</p>
        )}
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </Modal>
      <Modal
        isOpen={signupModalIsOpen}
        onRequestClose={() => {playMP5(); setSignupModalIsOpen(false);setError("");}}
        style={customStyles}
        contentLabel="Signup Modal"
      >
        <h2>Signup</h2>
        {signupError && <p className={`error-message ${flashMessage ? 'flash' : ''}`}>{signupError}</p>}
        <form onSubmit={handleSignup}>
          <label>
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <label>
            Rank:
            <select
                value={formData.rank}
                onChange={(e) =>
                  setFormData({ ...formData, rank: e.target.value })
                }
            >
              <option value="Ensign">Ensign</option>
              <option value="Lieutenant">Lieutenant</option>
              <option value="Commander">Commander</option>
              <option value="Captain">Captain</option>
              <option value="Admiral">Admiral</option>
              <option value="Plebian">Plebian</option>
            </select>
          </label>
          <button type="submit">Signup</button>
        </form>
      </Modal>
    </div>
  );
};

export default Header;