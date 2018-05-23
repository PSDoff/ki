import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Dialog from 'react-bootstrap-dialog';
import KegAddBox from '../Keg/KegAddBox';
import KegTable from '../Keg/KegTable';
import AdminHeader from './AdminHeader';
import callApi from '../Utils/ApiCaller';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleDismissAdd = this.handleDismissAdd.bind(this);
    this.handleDeleteKegs = this.handleDeleteKegs.bind(this);
    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleAddKeg = this.handleAddKeg.bind(this);
    this.handleCancelAddKeg = this.handleCancelAddKeg.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);

    this.state = {
      kegs: [],
      selectedIds: [],
      showAdd: false,
      kegName: '',
      kegDescription: '',
    };
  }
  componentDidMount() {
    // Close add box on escape key
    document.addEventListener('keydown', this.escFunction, false);

    // fetch kegs
    callApi('kegs').then((res) => {
      this.setState({
        kegs: res.data.kegs,
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }
  // Functions to control add form
  handleNameChange(e) {
    this.setState({ kegName: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ kegDescription: e.target.value });
  }
  handleAddKeg(e) {
    e.preventDefault();
    this.dialog.show({
      body: 'Do you want to add this keg?',
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Yes',
          () => {
            this.doAdd();
          },
          'btn-success'
        ),
      ],
    });
  }

  handleCancelAddKeg() {
    this.setState({
      kegName: '',
      kegDescription: '',
      showAdd: false,
    });
  }

  doAdd() {
    return callApi('kegs', 'post', {
      keg: {
        name: this.state.kegName,
        description: this.state.kegDescription,
      },
    }).then((res) => {
      const newKegs = this.state.kegs;
      newKegs.push(res.data.keg);
      this.setState({
        kegs: newKegs,
        kegName: '',
        kegDescription: '',
        showAdd: false,
      });
    }).catch(() => this.dialog.showAlert('Could not save this keg'));
  }

  handleCheckBoxChange(keg, e) {
    let newSelectedIds = this.state.selectedIds;
    if (e.target.checked) {
      newSelectedIds.push(keg._id);
    } else {
      newSelectedIds = newSelectedIds.filter(id => keg._id !== id);
    }
    this.setState({
      selectedIds: newSelectedIds,
    });
  }

  handleDeleteKegs() {
    if (this.state.selectedIds.length === 0) {
      return;
    }
    this.dialog.show({
      body: 'Do you want to delete the selected kegs ?',
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
    let newKegs = this.state.kegs;
    let newSelectedIds = this.state.selectedIds;
    this.state.selectedIds.forEach((idToDelete) => {
      callApi(`kegs/${idToDelete}`, 'delete').then(() => {
        // remove kegs from state
        newKegs = newKegs.filter(keg => keg._id !== idToDelete);
        newSelectedIds = newSelectedIds.filter(id => id !== idToDelete);
        this.setState({
          kegs: newKegs,
          selectedIds: newSelectedIds,
        });
      })
        .catch(() => { this.dialog.showAlert('Could not delete these kegs'); });
    });
  }

  handleDismissAdd(e) {
    e.preventDefault();
    this.setState({ showAdd: false });
  }

  handleShowAdd() {
    this.setState({ showAdd: true });
  }

  escFunction(event) {
    // Close add box on escape
    if (event.keyCode === 27) {
      this.handleDismissAdd(event);
    }
  }

  render() {
    return (
      <div>
        <AdminHeader />

        <ButtonGroup>
          <Button bsStyle="primary" onClick={this.handleShowAdd}>Add</Button>
          <Button onClick={this.handleDeleteKegs} disabled={this.state.selectedIds.length === 0}>Delete</Button>
        </ButtonGroup>

        <KegTable
          data={this.state.kegs}
          handleCheckBoxChange={this.handleCheckBoxChange}
        />

        <KegAddBox
          show={this.state.showAdd}
          onDismiss={this.handleDismissAdd}
          okLabel="Add this keg"
          onAdd={this.handleAddKeg}
          onCancel={this.handleCancelAddKeg}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          kegName={this.state.kegName}
          kegDescription={this.state.kegDescription}
        />

        <Dialog ref={(el) => { this.dialog = el; }} />
      </div>
    );
  }
}

export default Admin;
