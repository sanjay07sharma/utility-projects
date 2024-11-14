import React from 'react';

const InputField = ({ placeholder, value, onChange, readOnly }) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="border p-2 m-2 w-full"
        />
    );
};

export default InputField;