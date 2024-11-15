import React from 'react';

const InputField = ({ placeholder, value, onChange, readOnly }) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="border border-gray-300 p-3 m-2 w-6xl rounded-lg"
            rows="4"
        />
    );
};

export default InputField;