import React from 'react'

const Select = ({options, onChange}) => {
  const handleChange = (e) => onChange(e.target.value)
  return (
      <select onChange={handleChange}>
        {options.map((opt, i) => <option key={i} value={opt.value}>{opt.name}</option>)}
      </select>
  )
}

export default Select
