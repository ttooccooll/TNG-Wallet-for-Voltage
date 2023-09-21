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
import BitcoinBlockReward from './components/BlockReward';

function App() {
  // useState lets us store/update/pass data from inside of this component and also refresh the component when the data changes
  // Though this data will be lost on a refresh since we dont have a database
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getPrice = () => {
    // Axios is a library that makes it easy to make http requests
    // After we make a request, we can use the .then() method to handle the response asychronously
    // This is an alternative to using async/await
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      // .then is a promise that will run when the API call is successful
      .then((res) => {
        const formattedPrice = Number(res.data.data.amount).toFixed(5)
        setPrice(formattedPrice);
        updateChartData(formattedPrice);
      })
      // .catch is a promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  };

  const getWalletBalance = () => {
    // ToDo: Lookup how to move the X-API-Key to a .env file to keep it secret for when we push to Github
    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/wallet", { headers })
      .then((res) => {
        // Divide our balance by 1000 since it is denominated in millisats
        setBalance(res.data.balance / 1000);
      })
      .catch((err) => console.log(err));
  };

  const getTransactions = () => {
    // ToDo: Lookup how to move the X-API-Key to a .env file to keep it secret for when we push to Github
    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/payments", { headers })
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
    // setInterval will run whatever is in the callback function every damn second
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
        <h1 > BTC-1701-D  - - -  Capt. Nakamoto.S - - - UFSP </h1>
      </header>
      <div>
       <AudioPlayerComponent autoplay={true} />
      </div>
      <div className="row">
        <div className="button-holder">
          <Buttons />
        </div>
        <div className="button-next">
        </div>
        <div className="button-nextest">
        </div>
        <div className="button-nextestly">
        </div>
        <div className="button-nextiest">
          <p>
            <a 
            className="p"
            href="https://mempool.space/"
            target="_blank"
            rel="noopener noreferrer">
              MEM.SPC
            </a>
            <a 
            className="p"
            href="https://www.pleblab.com/"
            target="_blank"
            rel="noopener noreferrer">
              P.Lab
            </a>
            <a 
            className="p"
            href="https://www.st-minutiae.com/resources/rulesofacquisition.html"
            target="_blank"
            rel="noopener noreferrer">
              R0A
            </a>
            <a 
            className="p"
            href="https://bitfeed.live/"
            target="_blank"
            rel="noopener noreferrer">
              BIT.LIV
            </a>
            <a 
            className="p"
            href="https://bitcoin.org/bitcoin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="element"non-breaking-word>
              08-31-08
            </a>
            <a 
            className="p"
            href="https://lnvisualizer.com/"
            target="_blank"
            rel="noopener noreferrer">
              LN-VIS
            </a>
            <a 
            className="p"
            href="https://bitcoinexplorer.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="element"non-breaking-word>
              BTC-EXP
            </a>
            <a 
            className="p"
            href="https://www.youtube.com/watch?v=sZt6eU5REN8"
            target="_blank"
            rel="noopener noreferrer"
            color="#D45F10">
              12-25-2364
            </a>
            <PdfModal />
            <a 
            className="p"
            href="https://nakamotoinstitute.org/cypherpunk-manifesto/"
            target="_blank"
            rel="noopener noreferrer"
            color="#D45F10">
              03-09-93
            </a>
            <a 
            className="p"
            href="https://www.federalreserve.gov/cbdc-faqs.htm"
            target="_blank"
            rel="noopener noreferrer"
            color="#D45F10">
              FED-CBDC
            </a>
            <a 
            className="p"
            href="https://1ml.com/statistics"
            target="_blank"
            rel="noopener noreferrer"
            color="#D45F10">
              LN.1ML
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="balance-card">
          <div className="balance-content">
            <h2>Balance</h2>
            <p>{balance} satoshis</p>
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
          <Transactions transactions={transactions} />
        </div>
        <div className="row-itemz">
          <Chart chartData={chartData} />
        </div>
      </div>
      <div className="mostprefooter">
        <div class="content-container">
         <ul>
          {chartData &&
            chartData.map((dataPoint, index) => (
              <li key={index}>
                Stardate {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false })}, USD-BTC: {dataPoint.y}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="moreprefooter">
        <div class="content-container">
            <ul>
              {chartData &&
                chartData.map((dataPoint, index) => (
                  <li key={index}>
                    Stardate {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false })}, USD-BTC: {dataPoint.y}
                  </li>
               ))}
            </ul>
          </div>
        </div>
      <div className="prefooter">
        <div class="content-container">
          <ul>
            {chartData &&
              chartData.map((dataPoint, index) => (
                <li key={index}>
                  Stardate {new Date(dataPoint.x).toLocaleString('en-US', { hour12: false })}, USD-BTC: {dataPoint.y}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <footer>
        <p><BitcoinBlockHeight /></p>
        <p><BitcoinBlockReward /></p>
        <p><TotalBTC /></p>
        <p>security-status - <BitcoinDifficulty /></p>
      </footer>
      <div className="yessir">
        <div className="video-container" autoplay="true" >
          <VideoPlayer />
        </div>
        <p> - click for sound - - - - click for - </p>
        <PdfModal />
      </div>
    </div>
  );
}

export default App;
