import { joinLottery } from "../blockchainUtils";

function MemberPanel() {

  const takePart = async () => {
    await joinLottery("1");
  }

  return (
    <div className="card p-3 my-3" style={{ width: "500px" }}>
      <h1>Member Panel</h1>
        <button type="button" className="btn btn-success" onClick={takePart}>
          Take Part
        </button>
    </div>
  );

}

export default MemberPanel