import React from "react";
import "./Transactions.css";

export const Transactions = ({ transactions }) => {
  // ToDo: Improve tx parsing to display internal payments, incomplete payments, and further verify the transactions we are listing out
  const parseTx = (tx) => {
    // turn unix timestamp into a date
    // Todo: format date further to include hours, minutes, and seconds
    const date = new Date(tx.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US").replace(/\//g, '.');
    // ToDo: Handle pending payments since we are currently ignoring them and not displaying them on our past transactions list
    if (tx.pending) return null;

    if (tx.amount > 0) {
      return (
        <div key={tx.checking_id} className="t">
          <p className="t">Inbound - {tx.bolt11.substring(0, 30)}</p>
          <p className="t">+{tx.amount / 1000} satoshis</p>
          <p className="t">{formattedDate}</p>
        </div>
      );
    }

    if (tx.amount < 0) {
      return (
        <div id={tx.checking_id} key={tx.checking_id} className="t">
          <p className="t">Outbound - {tx.bolt11.substring(0, 30)}</p>
          <p className="t">{tx.amount / 1000} satoshis</p>
          <p className="t"> Stardate {formattedDate}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h4 className="tr">Transactions</h4>
      {transactions.map((transaction) => {
        return parseTx(transaction);
      })}
    </div>
  );
};

export default Transactions;
