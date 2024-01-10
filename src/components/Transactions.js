import React from "react";
import "./Transactions.css";

// This component renders a list of transactions, each transaction is an object with multiple properties.
const Transactions = ({ transactions }) => {
  console.log(transactions)
  // This helper function takes a timestamp and formats it to a human-readable date-time string.
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).replace(/\//g, '.');
  };

  // This helper function formats a transaction's value. If the transaction is a send, it prepends a '-'; otherwise, a '+'.
  // The formatted value is returned as a string.
  const formatValue = (value, send) => {
    return `${send ? "-" : "+"}${value} sats`;
  };

  // This helper function creates a descriptive string for the transaction.
  // If the transaction is not settled, it returns 'Unpaid invoice'.
  // Otherwise, it uses parts of the payment request to describe the transaction.
  const formatDescription = (tx) => {
    let description;
    if (tx.settled === false) {
      description = "en route";
    } else {
      description = `${
        tx.send === false ? "Outbound -" : "Inbound -"
      } ${tx.payment_request.substring(0, 35)}...`;
    }
    return description;
  };

  // This creates a new sorted array of transactions, ordered from newest to oldest.
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // The returned JSX displays a list of sorted transactions, where each transaction includes a description, a value, and a date.
  return (
    <div>
      <h4 className="tr">Transactions</h4>
      {sortedTransactions.map((tx) => (
        <div
          key={tx.id}
          className={`tx-item ${tx.settled === 0 ? "en route" : ""}`}
        >
          <p className="t">{formatDescription(tx)}</p>
          <p className="t">{formatValue(tx.value, tx.send)}</p>
          <p className="t">Stardate {formatDate(tx.created_at)} UTC</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;