import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import Buttons from "./components/Buttons";
import Transactions from "./components/Transactions";
import axios from "axios";
import "./App.css";
import VideoPlayer from './components/VideoPlayer';
import AudioPlayerComponent from './components/AudioPlayer';
import BitcoinBlockHeight from './components/BlockHeight';
import TotalBTC from './components/TotalBitcoin'
import BitcoinDifficulty from './components/Difficulty'
import PdfModal from './components/PdfModal';
import WhitePaper from './components/WhitePaper';
import BitcoinBlockReward from './components/BlockReward';
import BitcoinHashWin from './components/HashWin';

function App() {
  // useState lets us store/update/pass data from inside of this component and also refresh the component when the data changes
  // Though this data will be lost on a refresh since we dont have a database
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const playMP3 = () => {
    const audio = new Audio("/tng_swoosh_clean.mp3");
    audio.play();
  };

  const apiKey = process.env.REACT_APP_X_API_KEY;

  const getPrice = () => {
    // Axios is a library that makes it easy to make http requests
    // After we make a request, we can use the .then() method to handle the response asychronously
    // This is an alternative to using async/await
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      // .then is a promise that will run when the API call is successful
      .then((res) => {
        const formattedPrice = Number(res.data.data.amount).toFixed(4)
        setPrice(formattedPrice);
        updateChartData(formattedPrice);
      })
      // .catch is a promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  };

  const getWalletBalance = () => {
    const headers = {
      "X-Api-Key": apiKey,
    };
    axios
      .get("http://bigbadpc.local:3007/api/v1/wallet", { headers })
      .then((res) => {
        // Divide our balance by 1000 since it is denominated in millisats
        setBalance(res.data.balance / 1000);
      })
      .catch((err) => console.log(err));
  };

  const getTransactions = () => {
    const headers = {
      "X-Api-Key": apiKey,
    };
    axios
      .get("http://bigbadpc.local:3007/api/v1/payments", { headers })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateChartData = (currentPrice) => {
    const timestamp = Date.now();
    // We are able to grab the previous state to look at it and do logic before adding new data to it
    setChartData((prevState) => {
      // If we have no previous state, create a new array with the new price data
      if (!prevState)
        return [
          {
            x: timestamp,
            y: Number(currentPrice),
          },
        ];
      // If the timestamp or price has not changed, we dont want to add a new point
      if (
        prevState[prevState.length - 1].x === timestamp ||
        prevState[prevState.length - 1].y === Number(currentPrice)
      )
        return prevState;
      // If we have previous state than keep it and add the new price data to the end of the array
      return [
        // Here we use the "spread operator" to copy the previous state
        ...prevState,
        {
          x: timestamp,
          y: Number(currentPrice),
        },
      ];
    });
  };

  // useEffect is a 'hook' or special function that will run code based on a trigger
  // The brackets hold the trigger that determines when the code inside of useEffect will run
  // Since it is empty [] that means this code will run once on page load
  useEffect(() => {
    getPrice();
    getWalletBalance();
    getTransactions();
  }, [getPrice]);

  useEffect(() => {
    // setInterval will run whatever is in the callback function every friggin second
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
      getTransactions();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header >
        <h1 > BTC-1701-D -- United Federation of Sovereign Individuals </h1>
      </header>
      <div>
       <AudioPlayerComponent autoplay={true} />
      </div>
      <div className="row">
        <div className="button-holder-holder">
          <div className="button-holder">
            <Buttons />
          </div>
        </div>
        <div className="button-next">
          <div className="insidebutton-next"></div>
        </div>
        <div className="button-nextest">
          <div className="insidebutton-nextest"></div>
        </div>
        <div className="button-nextestly">
          <div className="insidebutton-nextestly"></div>
        </div>
        <div className="button-nextiest">
          <div className="insidebutton-nextiest">
            <p>
              <a 
              className="p"
              href="https://mempool.space/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer">
                MEM.SPC
              </a>
              <a 
              className="p"
              href="https://www.pleblab.com/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer">
                P.Lab
              </a>
              <a 
              className="p"
              href="https://www.st-minutiae.com/resources/rulesofacquisition.html"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer">
                R0A
              </a>
              <a 
              className="p"
              href="https://bitfeed.live/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer">
                BIT.LIV
              </a>
              <div>
              <WhitePaper />
              </div>
              <a 
              className="p"
              href="https://lnvisualizer.com/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer">
                LN-VIS
              </a>
              <a 
              className="p"
              href="https://bitcoinexplorer.org/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer"
              class="element"non-breaking-word>
                BTC-EXP
              </a>
              <a 
              className="p"
              href="https://www.youtube.com/watch?v=sZt6eU5REN8"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer"
              color="#D45F10">
                12-25-2364
              </a>
              <div>
              <PdfModal />
              </div>
              <a 
              className="p"
              href="https://nakamotoinstitute.org/cypherpunk-manifesto/"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer"
              color="#D45F10">
                03-09-93
              </a>
              <a 
              className="p"
              href="https://www.youtube.com/watch?v=YRyioZK6BOc"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer"
              color="#D45F10">
                5.P0T
              </a>
              <a 
              className="p"
              href="https://1ml.com/statistics"
              onClick={playMP3}
              target="_blank"
              rel="noopener noreferrer"
              color="#D45F10">
                LN.1ML
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="balance-card">
          <div className="balance-content">
            <h2>Satoshis</h2>
            <p>{balance}</p>
          </div>
        </div>
        <div className="balance-card">
          <div className="balance-content">
              <h2>USD-BTC</h2>
              <p>{price}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          <div className="row-itemer">
            <Transactions transactions={transactions} />
          </div>
        </div>
        <div className="row-itemz">
          <Chart chartData={chartData} />
        </div>
      </div>
      <div className="mostprefooter">
        <div className="inside-footer">
         <div class="content-container">
          <ul>
            {chartData &&
              chartData.map((dataPoint, index) => (
                <li key={index}>
                  {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false }).replace(/\//g, '.')}, USD-BTC: {dataPoint.y}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="moreprefooter">
        <div className="inside-footer">
          <div class="content-container">
            <ul>
              {chartData &&
                chartData.map((dataPoint, index) => (
                  <li key={index}>
                    Stardate {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false }).replace(/\//g, '.')}, USD-BTC: {dataPoint.y}
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="prefooter">
        <div className="inside-footer">
          <div class="content-container">
            <ul>
              {chartData &&
                chartData.map((dataPoint, index) => (
                  <li key={index}>
                    Stardate {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false }).replace(/\//g, '.')}, USD-BTC: {dataPoint.y}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <h5>
          <p><BitcoinBlockHeight /></p>
          <p><TotalBTC /></p>
          <p><BitcoinBlockReward /></p>
          <p><BitcoinHashWin /></p>
          <p className="right">
            <BitcoinDifficulty />
          </p>
        </h5>
      </footer>
      <div className="yessir">
        <h3>
        <div className="video-container" autoplay="true" >
          <VideoPlayer />
        </div>
        <p> - click for sound - - - - - - - - - - click for - </p>
        <PdfModal />
        </h3>
      </div>
    </div>
  );
}

export default App;
