import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import Chip from "@mui/material/Chip";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import CakeIcon from "@mui/icons-material/Cake";

import { green, amber } from "@mui/material/colors";
const TransactionType = ({ action, onClick }: any) => {
  return (
    <Chip
      icon={action === "MINT" ? <CakeIcon /> : <MoveDownIcon />}
      sx={{ color: action === "MINT" ? green["500"] : amber["500"] }}
      onClick={onClick}
      label={action}
    />
  );
};
export default function NFTHistoryTable({ rows }: any) {
  const handleRowClick = (row: any) => {
    window.open("https://ropsten.etherscan.io/tx/" + row.id);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell align="right">Transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <TransactionType
                  action={row.action}
                  onClick={() => handleRowClick(row)}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  style={{
                    textTransform: "none",
                  }}
                  onClick={() => handleRowClick(row)}
                  endIcon={<OpenInBrowserIcon />}
                >
                  {row.id.substr(0, 32) + "..."}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
