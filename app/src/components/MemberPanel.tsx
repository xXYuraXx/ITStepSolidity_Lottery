import { joinLottery } from "../blockchainUtils";

function MemberPanel() {

  const takePart = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    await joinLottery("1", username);
  }

  return (
    <div className="card p-3 my-3" style={{ width: "500px" }}>
      <h1>Member Panel</h1>
      <input className="my-2" type="text" id="username" placeholder="Enter your username" />
      <button type="button" className="btn btn-success" onClick={takePart}>
        Take Part
      </button>
    </div>
  );

}

export default MemberPanel