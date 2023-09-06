import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BitcoinBlockHeight() {
  const [blockHeight, setBlockHeight] = useState(null);

  useEffect(() => {
    const getBlockHeight = () => {
      axios
        .get('https://blockchain.info/q/getblockcount')
        .then((res) => {
          // Corrected: Access the block height from `res.data`
          setBlockHeight(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getBlockHeight();

    // Fetch block height periodically (every minute, for example)
    const intervalId = setInterval(getBlockHeight, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>CBBH - {blockHeight}</p>
    </div>
  );
}

export default BitcoinBlockHeight;
