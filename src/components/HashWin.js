import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FunFacts.css";

function BitcoinHashWin() {
  const [hashWin, setHashWin] = useState(null);

  useEffect(() => {
    const getHashWin = () => {
      axios
        .get('https://blockchain.info/q/hashestowin')
        .then((res) => {
          setHashWin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getHashWin();

    const intervalId = setInterval(getHashWin, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="total-btc">HW - {hashWin}</p>
    </div>
  );
}

export default BitcoinHashWin;
