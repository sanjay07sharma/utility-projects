import React from 'react';

const RecordTable = ({ records }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 w-1/4">Sequence</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 w-1/4">Task Assigned</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 w-1/4">Status</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm border-b border-gray-300 w-1/4">Remarks</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {records.map((record, index) => (
                        <tr key={index} className="bg-gray-100 border-b border-gray-300">
                            <td className="py-3 px-4 border-r border-gray-300 break-words">{record.sequence}</td>
                            <td className="py-3 px-4 border-r border-gray-300 break-words">{record.taskAssigned}</td>
                            <td className="py-3 px-4 border-r border-gray-300 break-words">{record.status}</td>
                            <td className="py-3 px-4 break-words">{record.remarks}</td>
                        </tr>
                    ))}
                    {records.length === 0 && (
                        <tr>
                            <td colSpan="4" className="py-3 px-4 text-center text-gray-500">No records available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecordTable;