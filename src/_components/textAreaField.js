import React from 'react';

/*Render text text area field*/
export const renderTextAreaField = ({
  input,
  label,
  type,
  setValue,
  onValueChange,
  meta: { touched, error }
}) => (
  <div className="field-wrapper">
    <textarea 
      {...input} 
      placeholder={label}
      value={setValue} 
      onChange={(e) => onValueChange(e)} ></textarea>
    {touched &&
      ((error && <p className="error-msg">{error}</p>))}
  </div>
);