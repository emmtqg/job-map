import React from 'react';
import Select from 'react-select';

export function Filter({ id, selectedValue, options, defaultValue, onChange }) {

  return (
    <Select 
      key={id}
      id={id}
      value={selectedValue}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  )
}

export default Filter;