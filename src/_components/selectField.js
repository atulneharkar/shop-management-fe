import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export const renderSelectField = ({
  input,
  label,
  optionList,
  setValue,
  onValueChange,
  meta: { touched, error }
}) => (
  <div className="field-wrapper">
    <Select
      {...input} 
      value={setValue}
      options={optionList}  
      onChange={(e) => onValueChange(e)} />
    {touched &&
      ((error && <p className="error-msg">{error}</p>))}
  </div>
);