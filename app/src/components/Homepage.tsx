import { useState } from "react";
import { getIsManager } from "../blockchainUtils";
import ManagerPanel from "./ManagerPanel";
import MemberPanel from "./MemberPanel";

function Homepage() {
    const [isManager, setIsManager] = useState<boolean | null>(null);

    const handleEnterClick = async () => {
        const managerStatus = await getIsManager();
        setIsManager(managerStatus);
    };


    return (
        <>
            <div style={{ minHeight: '60vh' }} className="container">

                <button onClick={handleEnterClick} type="button" className="btn btn-primary my-3">Enter</button>
                {isManager !== null && (
                    <div>
                        {isManager ?
                        <ManagerPanel />
                        : <MemberPanel />}
                    </div>
                )}

            </div>
        </>
    )
}

export default Homepage