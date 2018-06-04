import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/* Library */
import ReactTooltip from 'react-tooltip';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info ? (
        <img
          data-tip="This site uses Gravatar so if you want a profile image, use a Gravatar email, you can change this later in your profile settings"
          className="note-small"
          src={info}
          alt="note ^_^"
        />
      ) : null}
      <ReactTooltip place="right" type="warning" effect="float" />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
