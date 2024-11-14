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

    const clearRecord = async() => {
        await axios.post('http://localhost:5000/clear-records', rows);
        setRows(initialRows);
        setRecords([...records, ...rows]);
    };

    const takeScreenshot = async () => {
        const response = await axios.get('http://localhost:5000/screenshot', { responseType: 'arraybuffer' });
        const image = Buffer.from(response.data, 'binary').toString('base64');
        setScreenshot(`data:image/png;base64,${image}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Sheet</h1>

            {rows.map((row, index) => (
                <div key={index}>
                    <InputField placeholder="Sequence" value={row.sequence} readOnly />
                    <InputField placeholder="Task Assigned" value={row.taskAssigned} onChange={e => handleInputChange(index, 'taskAssigned', e.target.value)} />
                    <select
                        value={row.status}
                        onChange={e => handleInputChange(index, 'status', e.target.value)}
                        className="border p-2 m-2 w-full"
                    >
                        <option value="">Select Status</option>
                        <option value="done">Done</option>
                        <option value="pending">Pending</option>
                    </select>
                    <InputField placeholder="Remarks" value={row.remarks} onChange={e => handleInputChange(index, 'remarks', e.target.value)} />
                </div>
            ))}

            <button onClick={saveRecord} className="bg-blue-500 text-white p-2 rounded mt-2">Save Record</button>
            <button onClick={clearRecord} className="bg-red-500 text-white p-2 rounded mt-2">Clear Record</button>
            <RecordTable records={records} />
            <button onClick={takeScreenshot} className="bg-green-500 text-white p-2 rounded mt-2">Take Screenshot</button>
            {screenshot && <img src={screenshot} alt="Table Screenshot" className="mt-4" />}
        </div>
    );
}

export default App;