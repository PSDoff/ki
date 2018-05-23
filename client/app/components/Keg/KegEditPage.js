import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Dialog from 'react-bootstrap-dialog';
import Button from 'react-bootstrap/lib/Button';
import callApi from '../Utils/ApiCaller';

import KegForm from './KegForm';

class KegEditPage extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEditKeg = this.handleEditKeg.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeleteKeg = this.handleDeleteKeg.bind(this);
    this.state = {
      redirect: false,
      kegName: '',
      kegDescription: '',
    };
  }

  componentDidMount() {
    // fetch keg to edit
    callApi(`kegs/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          kegName: res.data.keg.name,
          kegDescription: res.data.keg.description,
        });
      })
    // redirect if not found
      .catch(() => this.setState({ redirect: true }));
  }

  // Functions to control add form
  handleNameChange(e) {
    this.setState({ kegName: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ kegDescription: e.target.value });
  }

  handleEditKeg(e) {
    e.preventDefault();
    this.dialog.show({
      body: 'Do you want to edit this keg ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doEdit();
          },
          'btn-success'
        ),
      ],
    });
  }

  handleCancel() {
    this.setState({ redirect: true });
  }

  doEdit() {
    return callApi(`kegs/${this.props.match.params.id}`, 'post', {
      keg: {
        name: this.state.kegName,
        description: this.state.kegDescription,
      },
    }).then(() => {
      // TODO alert for edit success
      this.setState({ redirect: true });
    }).catch(() => this.dialog.showAlert('Could not edit this keg'));
  }

  handleDeleteKeg() {
    this.dialog.show({
      body: 'Do you want to delete this keg ?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doDelete();
          },
          'btn-danger'
        ),
      ],
    });
  }

  doDelete() {
    callApi(`kegs/${this.props.match.params.id}`, 'delete')
    // redirect after delete
      .then(() => this.setState({ redirect: true }))
      .catch(() => { this.dialog.showAlert('Could not delete this keg'); });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin" />;
    }
    return (
      <div>
        <div className="alert-head" >
          <h1>Edit your keg</h1>
        </div>

        <KegForm
          okLabel="Update this keg"
          onSubmit={this.handleEditKeg}
          onCancel={this.handleCancel}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          kegName={this.state.kegName}
          kegDescription={this.state.kegDescription}
        />

        <Button bsStyle="danger" onClick={this.handleDeleteKeg}>Delete it</Button>

        <Dialog ref={(el) => { this.dialog = el; }} />
      </div>
    );
  }
}

KegEditPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default KegEditPage;
