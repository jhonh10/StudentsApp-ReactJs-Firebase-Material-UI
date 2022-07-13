import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export default function SkeletonTable() {
  return (
    <TableContainer sx={{ minWidth: 800 }}>
      <Table>
        <TableBody>
          <TableRow>
            {/* I need refactor to array.map  */}
            <TableCell>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={70} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
