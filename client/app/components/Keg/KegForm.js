import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

function KegForm(props) {
  return (
    <form>
      <div className="input-group">
        <span className="input-group-addon">Name</span>
        <input
          id="name"
          type="text"
          className="form-control"
          name="name"
          placeholder="Optional"
          value={props.kegName}
          maxLength="144"
          onChange={props.onNameChange}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="13"
          id="keg"
          value={props.kegDescription}
          maxLength="610"
          onChange={props.onDescriptionChange}
        />
      </div>
      <ButtonGroup vertical block>
        <Button type="submit" bsStyle="success" onClick={props.onSubmit}>{props.okLabel}</Button>
        <Button type="button" onClick={props.onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
}

KegForm.defaultProps = {
  kegName: '',
  kegDescription: '',
  okLabel: 'Submit',
};
KegForm.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  kegDescription: PropTypes.string,
  kegName: PropTypes.string,
  okLabel: PropTypes.string,
};
export default KegForm;
