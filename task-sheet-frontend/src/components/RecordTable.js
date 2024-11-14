import React from 'react';

const RecordTable = ({ records }) => {
    return (
        <table className="table-auto border-collapse border border-gray-400 w-full mt-4">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Sequence</th>
                    <th className="border border-gray-300 p-2">Task Assigned</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Remarks</th>
                </tr>
            </thead>
            <tbody className>
                {records.map((record, index) => (
                    <tr key={index}>
                        <td className="border border-gray-300 p-2">{record.sequence}</td>
                        <td className="border border-gray-300 p-2">{record.taskAssigned}</td>
                        <td className="border border-gray-300 p-2">{record.status}</td>
                        <td className="border border-gray-300 p-2">{record.remarks}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4"><br /></td>
                </tr>
            </tbody>
        </table>
    );
};

export default RecordTable;