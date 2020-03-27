import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, dados }) => {
  return (
    <table>
      <TableHeader columns={columns} />
      <TableBody columns={columns} dados={dados} />
    </table>
  );
};

export default Table;
