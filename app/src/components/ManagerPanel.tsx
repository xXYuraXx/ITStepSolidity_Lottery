import { useEffect, useState } from "react";
import { getBalance, getWinner, loteryRandom } from "../blockchainUtils";

function ManagerPanel() {
  const [balance, setBalance] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    getBalance().then((bal) => setBalance(bal));
  }, []);

  const handleStartLottery = async () => {
    const winner = await getWinner();
    setWinner(winner);
    setBalance(0);
  }

  return (
    <div className="card p-3 my-3" style={{ width: "500px" }}>
      <h1>Manager Panel</h1>
      <h3>Balance: {balance !== null ? balance : "Loading..."}</h3>
      <button type="button" className="btn btn-primary" onClick={handleStartLottery}>
        Start Lottery
      </button>
      <p>Winner: {winner !== null ? winner : "No winner yet"}</p>
    </div>
  );

}

export default ManagerPanel