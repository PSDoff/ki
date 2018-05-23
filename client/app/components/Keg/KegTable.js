import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Tips } from '../Utils/Utils';

function CheckBoxCell(props) {
  const _onChange = (e) => {
    props.onChange(props.keg, e);
  };
  return (
    <input type="checkbox" onChange={_onChange} />
  );
}

function KegTable(props) {
  const { handleCheckBoxChange } = props;
  const columns = [{
    Cell: row => (<CheckBoxCell
      key={row.original._id}
      keg={row.original}
      onChange={handleCheckBoxChange}
    />),
    className: 'table-checkbox-col',
    width: 34,
    sortable: false,
    resizable: false,
  }, {
    Header: 'Created At',
    id: 'createdAt',
    accessor: d => new Date(d.createdAt).toLocaleString('en-US'), // formatted date
    className: 'clickable',
    width: 233,
    filterable: false,
  }, {
    Header: 'Description',
    id: 'name',
    accessor: 'name',
    Cell: row => <span><strong>{row.original.name.substring(0, 21)}</strong>&nbsp;{row.original.description.substring(0, 55)}</span>, // Custom cell components!
    className: 'clickable',
  }];

  return (
    <div>
      <ReactTable
        showPaginationTop={true}
        showPaginationBottom={true}
        noDataText="We're dry! There are no kegs yet!"
        defaultSorted={[
              {
                id: 'createdAt',
                desc: false,
              },
            ]}
        data={props.data}
        columns={columns}
        minRows="5"
        className="-striped -highlight"
        getTdProps={(state, rowInfo, column) => {
              return {
                onClick: () => {
                  if (!column.id) return; // The checkbox cell has no id and is not clickable
                    // navigate
                    props.history.push(`/kegs/${rowInfo.original._id}`);
                  },
              };
            }}
      />
    </div>
  );
}
CheckBoxCell.propTypes = {
  onChange: PropTypes.func.isRequired,
  keg: PropTypes.object.isRequired,
};
KegTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


export default withRouter(KegTable);
