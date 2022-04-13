import React, { ReactNode } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material';

function BasicPagination({ onChange, count, page }: { count: number, page: number, onChange: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined }) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} color="primary" onChange={onChange} />
    </Stack>
  );
}

export { BasicPagination }