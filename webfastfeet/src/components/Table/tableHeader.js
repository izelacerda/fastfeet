import React, { PureComponent } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends PureComponent {
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.label}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
