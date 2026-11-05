import './FormField.css';

function FormField({
  label,
  type = 'text',
  value,
  placeholder = '',
  onChange,
  options = [],
  name,
}) {
  return (
    <label className="form-field">

      {label && (
        <span className="form-field__label">
          {label}
        </span>
      )}

      {type === 'select' ? (
        <select
          className="form-field__control"
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">
            {placeholder ||
              'Seleccionar'}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}

        </select>
      ) : (
        <input
          className="form-field__control"
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

    </label>
  );
}

export default FormField;