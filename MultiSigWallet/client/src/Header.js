import React from "react";

function Header({approvers, quorum}) {
    return (
        <header>

        Approvers:
        <ul>
            {approvers.map(approver => <li>{approver}</li>)}
        </ul>
        Quorum: {quorum}
        </header>

    )
}
export default Header;
