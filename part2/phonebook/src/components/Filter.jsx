const Filter = ({ value, onChange, label = "filter shown with" }) => {
  return (
    <div>
      {label} <input value={value} onChange={onChange} />
    </div>
  )
}

export default Filter