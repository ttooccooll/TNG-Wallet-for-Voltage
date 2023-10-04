import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./PaymentsModal.css";
import QRCode from 'qrcode.react';

const PaymentsModal = ({ modalState, setModalState }) => {
  // Our state for the info we will send to either generate a new invoice or pay an invoice
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: "",
  });
  // Our state for storing the invoice we created to be paid
  const [invoice, setInvoice] = useState("");
  // Our state for the invoice we paid
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: "",
    checkingId: "",
  });

  const playMP3 = () => {
    const audio = new Audio("/tng_warp7.mp3");
    audio.play();
  };

  const playMP4 = () => {
    const audio = new Audio("/computerbeep_69.mp3");
    audio.play();
  };

  const apiKey = process.env.REACT_APP_X_API_KEY;

  const handleSend = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault();

    const headers = {
      "X-Api-Key": apiKey,
    };
    const data = {
      bolt11: formData.invoiceToPay,
      out: true,
    };
    axios
      .post("https://48f31a1603.d.voltageapp.io/api/v1/payments", data, { headers })
      .then((res) =>
        setPaymentInfo({
          paymentHash: res.data.payment_hash,
          checkingId: res.data.checking_id,
        })
      )
      .catch((err) => console.log(err));

    return;
  };

  const handleReceive = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault();

    const headers = {
      "X-Api-Key": apiKey,
    };
    const data = {
      amount: formData.amount,
      out: false,
      // ToDo: Add additional form for user to be able to customize the memo
      memo: "LNBits",
    };
    axios
      .post("https://48f31a1603.d.voltageapp.io/api/v1/payments", data, { headers })
      .then((res) => setInvoice(res.data.payment_request))
      .catch((err) => console.log(err));

    return;
  };

  // Function to clear all of our state when we close the modal
  const clearForms = () => {
    setModalState({
      type: "",
      open: false,
    });
    setInvoice("");
    setPaymentInfo({
      paymentHash: "",
      checkingId: "",
    });
    setFormData({
      amount: 0,
      invoiceToPay: "",
    });
  };

  return (
    <Modal
      isOpen={modalState.open}
      style={{
        content: {
          top: "20%",
          left: "40%",
          right: "40%",
          bottom: "auto",
          backgroundColor: "black",
        },
      }}
      contentLabel="Example Modal"
      appElement={document.getElementById("root")}
    >
      <p
        className="close-button"
        onClick={() => { clearForms(); playMP4(); }}
      >
        X
      </p>
      {/* If it is a send */}
      {modalState.type === "send" && (
        <form>
          <label>invoice coordinates</label>
          <input
            type="text"
            value={formData.invoiceToPay}
            onChange={(e) =>
              setFormData({ ...formData, invoiceToPay: e.target.value })
            }
          />
          <button className="button" onClick={(e) => { handleSend(e); playMP3(); }}>
            Engage
          </button>
        </form>
      )}
      {/* If it is a receive */}
      {modalState.type === "receive" && (
        <form>
          <label>enter amount</label>
          <input
            type="number"
            min="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          <button className="button" onClick={(e) => { handleReceive(e); playMP3(); }}>
            Engage
          </button>
        </form>
      )}
      {/* If we are displaying our newly created invoice */}
      {invoice && (
        <section>
          <h6>Invoice created</h6>
          <div className="qr-code-container">
            <QRCode value={invoice} size={128} fgColor="#000" bgColor="#fff" />
          </div>
          <p>{invoice}</p>
        </section>
      )}
      {/* If we are displaying the status of our successful payment */}
      {paymentInfo.paymentHash && (
        <section>
          <h6>Payment sent</h6>
          <p>Payment hash: {paymentInfo.paymentHash}</p>
          <p>Checking id: {paymentInfo.checkingId}</p>
        </section>
      )}
    </Modal>
  );
};

export default PaymentsModal;
