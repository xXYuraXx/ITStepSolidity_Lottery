import { useEffect, useState } from "react";
import { getBalance, getMembersCount, getWinner, type Participant } from "../blockchainUtils";

function ManagerPanel() {
  const [balance, setBalance] = useState<number | null>(null);
  const [membersCount, setMembersCount] = useState<number | null>(null);
  const [winner, setWinner] = useState<Participant | null>(null);

  useEffect(() => {
    getBalance().then((bal) => setBalance(bal));
    getMembersCount().then((count) => setMembersCount(count));
  }, []);

  const handleStartLottery = async () => {
    const winner = await getWinner();
    setWinner(winner);
    setBalance(0);
    setMembersCount(0);
  }

  return (
    <div className="card p-3 my-3" style={{ width: "500px" }}>
      <h1>Manager Panel</h1>
      <h3>Balance: {balance !== null ? balance : "Loading..."}</h3>
      <h3>Members Count: {membersCount !== null ? membersCount : "Loading..."}</h3>
      <button type="button" className="btn btn-primary" onClick={handleStartLottery}>
        Start Lottery
      </button>
      {winner !== null ? (
        <>
          <p className="my-2">Winner Name: {winner.username}<br />
          Winner Address: {winner.addr}</p>
        </>
      ) : (
        <p>No winner yet</p>
      )}
    </div>
  );

}

export default ManagerPanel