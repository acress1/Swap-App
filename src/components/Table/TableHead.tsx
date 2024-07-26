import React from "react";

const TableHead: React.FC = () => {
    return (
        <thead>
            <tr>
                <th>Date</th>
                <th>Outbound</th>
                <th>Inbound</th>
                <th>Position</th>
                <th>Email</th>
                <th className="FOR">FOR:</th>
                <th className="FOR">Early</th>
                <th className="FOR">Late</th>
                <th className="FOR">LTA</th>
                <th className="FOR">DO</th>
                <th className="FOR">Note</th>
                <th>Sent</th>
            </tr>
        </thead>
    );
};

export default TableHead;