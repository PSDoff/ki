import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';
import KegForm from './KegForm';

function KegAddBox(props) {
  const {
    show, okLabel, onAdd, onCancel, onNameChange, onDescriptionChange, kegName, kegDescription, onDismiss,
  } = props;
  if (!show) return null;
  return (
    <div className="fixed-bottom-right">
      <div className="alert-head" >
        <strong>Add a new keg</strong>
        <button className="close" onClick={onDismiss}>&times;</button>
      </div>
      <Alert bsStyle="success">
        <KegForm
          okLabel={okLabel}
          onSubmit={onAdd}
          onCancel={onCancel}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          kegName={kegName}
          kegDescription={kegDescription}
        />
      </Alert>
    </div>
  );
}

KegAddBox.defaultProps = {
  show: false,
  kegName: '',
  kegDescription: '',
  okLabel: 'Submit',
};
KegAddBox.propTypes = {
  show: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  kegDescription: PropTypes.string,
  kegName: PropTypes.string,
  okLabel: PropTypes.string,
};
export default KegAddBox;
