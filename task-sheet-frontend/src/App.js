import React, { useState } from 'react';
import axios from 'axios';
import InputField from './components/InputField';
import RecordTable from './components/RecordTable';

function App() {
    const [sequence, setSequence] = useState('');
    const [taskAssigned, setTaskAssigned] = useState('');
    const [status, setStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [records, setRecords] = useState([]);
    const [screenshot, setScreenshot] = useState(null);

    const saveRecord = async () => {
        const newRecord = { sequence, taskAssigned, status, remarks };
        await axios.post('http://localhost:5000/save-record', newRecord);
        setRecords([...records, newRecord]);
    };

    const takeScreenshot = async () => {
        const response = await axios.get('http://localhost:5000/screenshot', { responseType: 'arraybuffer' });
        const image = Buffer.from(response.data, 'binary').toString('base64');
        setScreenshot(`data:image/png;base64,${image}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Sheet</h1>
            <InputField placeholder="Sequence" value={sequence} onChange={e => setSequence(e.target.value)} />
            <InputField placeholder="Task Assigned" value={taskAssigned} onChange={e => setTaskAssigned(e.target.value)} />
            <InputField placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
            <InputField placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
            <button onClick={saveRecord} className="bg-blue-500 text-white p-2 rounded mt-2">Save Record</button>
            <RecordTable records={records} />
            <button onClick={takeScreenshot} className="bg-green-500 text-white p-2 rounded mt-2">Take Screenshot</button>
            {screenshot && <img src={screenshot} alt="Table Screenshot" className="mt-4" />}
        </div>
    );
}

export default App;