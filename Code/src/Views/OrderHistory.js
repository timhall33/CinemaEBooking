import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(orderNum, movie, total) {
  return { orderNum, movie, total };
}

const rows = [
  createData('e6hty99012', 'AOT', 10.00 ),
  createData('b6hty99012', 'idk', 6.00),

];

export default function CustomizedTables() {
  return (
    
    <TableContainer component={Paper}>
        <Typography component="h1" variant="h5" align='center'>
            Order History
        </Typography>
      <Table sx={{ maxWidth: 540 }} aria-label="customized table" align='center'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Number</StyledTableCell>
            <StyledTableCell> Movie Title</StyledTableCell>
            <StyledTableCell> Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.orderNum}>
              <StyledTableCell component="th" scope="row">
                {row.orderNum}
              </StyledTableCell>
              <StyledTableCell>{row.movie}</StyledTableCell>
              <StyledTableCell>{row.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}