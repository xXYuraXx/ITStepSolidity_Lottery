import { useEffect, useState } from "react";
import { getMembers, getWinnerInfo, type Participant } from "../blockchainUtils";

function ParticipantsAndWinner() {
  const [members, setMembers] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  
  const loadData = async () => {
    const mems = await getMembers();
    if (mems) setMembers(mems);
    
    const win = await getWinnerInfo();
    if (win) {
      setWinner(win);
    } else {
      setWinner(null);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-3 my-3" style={{ width: "500px" }}>
      <h2>Lottery Info</h2>
      
      {winner && (
        <div className="alert alert-success my-2">
          <h4>Last Winner</h4>
          <p className="mb-0"><strong>Nickname:</strong> {winner.username}</p>
          <p className="mb-0"><strong>Address:</strong> {winner.addr}</p>
        </div>
      )}

      <h4 className="mt-3">Participants ({members.length})</h4>
      {members.length > 0 ? (
        <ul className="list-group my-2">
          {members.map((m, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span><strong>{m.username}</strong></span>
              <small className="text-muted" style={{ fontSize: '0.7em' }}>{m.addr}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No participants yet</p>
      )}
    </div>
  );
}

export default ParticipantsAndWinner;
