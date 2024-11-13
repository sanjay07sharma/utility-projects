import React from 'react';

const InputField = ({ placeholder, value, onChange }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border p-2 m-2 w-full"
        />
    );
};

export default InputField;