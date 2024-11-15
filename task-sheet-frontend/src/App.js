import React, { useState } from 'react';
import axios from 'axios';
import InputField from './components/InputField';
import RecordTable from './components/RecordTable';

function App() {
    const initialRows = [
        { sequence: 'Meetings & Calls', taskAssigned: '', status: '', remarks: '' },
        { sequence: 'Consultant Queries', taskAssigned: '', status: '', remarks: '' },
        { sequence: 'Consultant Management', taskAssigned: '', status: '', remarks: '' },
        { sequence: 'HR & Payroll Updates', taskAssigned: '', status: '', remarks: '' },
        { sequence: 'Billing and Documentation', taskAssigned: '', status: '', remarks: '' }
    ];

    const [rows, setRows] = useState(initialRows);
    const [records, setRecords] = useState([]);
    const [screenshot, setScreenshot] = useState(null);

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const saveRecord = async () => {
        await axios.post('http://localhost:5000/save-record', rows);
        setRecords([...records, ...rows]);
    };

    const clearRecord = async () => {
        await axios.post('http://localhost:5000/clear-records', rows);
        setRows(initialRows);
        setRecords([]);
    };

    const takeScreenshot = async () => {
        const response = await axios.get('http://localhost:5000/screenshot', { responseType: 'arraybuffer' });
        const image = Buffer.from(response.data, 'binary').toString('base64');
        setScreenshot(`data:image/png;base64,${image}`);
    };

    return (
        <div className="w-full h-full min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Sheet</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-6xl">
                {rows.map((row, index) => (
                    <div key={index} className="mb-4 w-full">
                        <InputField placeholder="Sequence" value={row.sequence} readOnly />
                        <InputField placeholder="Task Assigned" value={row.taskAssigned} onChange={e => handleInputChange(index, 'taskAssigned', e.target.value)} />
                        <select
                            value={row.status}
                            onChange={e => handleInputChange(index, 'status', e.target.value)}
                            className="border border-gray-300 p-3 m-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Status</option>
                            <option value="done">Done</option>
                            <option value="pending">Pending</option>
                        </select>
                        <InputField placeholder="Remarks" value={row.remarks} onChange={e => handleInputChange(index, 'remarks', e.target.value)} />
                    </div>
                ))}

                <div className="flex justify-between">
                    <button onClick={saveRecord} className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600">Save Record</button>
                    <button onClick={clearRecord} className="bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600">Clear Record</button>
                    <button onClick={takeScreenshot} className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600">Take Screenshot</button>
                </div>
            </div>

            <div className="mt-8 w-full">
                <RecordTable records={records} />
            </div>

            {screenshot && <img src={screenshot} alt="Table Screenshot" className="mt-8 mx-auto shadow-lg rounded-lg" />}
        </div>
    );
}

export default App;