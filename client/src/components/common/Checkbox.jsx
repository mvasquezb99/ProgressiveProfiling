import React from "react";
import PropTypes from 'prop-types';
import { labelStyles } from "../../constants/styles";

export default function Checkbox({ name, label, handleChecked}) {

    const handleChange = () => {
        handleChecked(name)
    }

    return (
        <div className="flex space-x-2 items-start">
            <label htmlFor={name} className={`${labelStyles} text-xs mt-0.5`}>{label}</label>
            <input type="checkbox" name={name} id={name} className="h-fit mt-1" onClick={handleChange}/>
        </div>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    handleChecked: PropTypes.func
};
