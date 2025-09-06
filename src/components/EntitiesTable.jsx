import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ButtonGroup,
  Stack,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import client from '../utils/client';

export default function EntitiesTable() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [schema, setSchema] = useState({ model: {}, ui: {}, uiTable: {} });

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    let active = true;

    client
      .request('getEntitySchema', { name })
      .then((res) => {
        if (active && res) setSchema(res);
      })
      .catch((err) => {
        console.error('Failed to load schema:', err);
      });

    return () => {
      active = false;
    };
  }, [name]);

  useEffect(() => {
    let active = true;

    client
      .request('getEntities', { name, query: '*' })
      .then((res) => {
        if (active && res) setData(res);
      })
      .catch((err) => {
        console.error('Failed to load data:', err);
      });

    return () => {
      active = false;
    };
  }, [schema]);

  const columns = useMemo(
    () => [
      {
        header: 'User Info',
        columns: [
          {
            accessorKey: 'username',
            header: 'Username',
            cell: info => info.getValue(),
          },
          {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            header: 'Full Name',
          },
          {
            accessorKey: 'email',
            header: 'Email',
          },
        ],
      },
      {
        header: 'Status Info',
        columns: [
          {
            accessorKey: 'role',
            header: 'Role',
          },
          {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
              const status = info?.getValue();
              const color = status?.toLowerCase() === 'active' ? 'success' : 'error';
              return <Chip label={status} color={color} size="small" />;
            },
          },
          {
            accessorKey: 'lastLogin',
            header: 'Last Login',
          },
          {
            id: 'actions',
            header: 'Actions',
            cell: info => (
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(info.row.original.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleView(info.row.original.id)}
                >
                  View
                </Button>
              </Stack>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (userId) => {
    navigate(`/entities/edit/${userId}`);
  };

  const handleView = (userId) => {
    navigate(`/entities/${userId}`);
  };

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid>
          <Typography variant="h4" component="h2">Users</Typography>
        </Grid>
        <Grid>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              size="small"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={() => navigate('/edit-entity')}>
              Add User
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableCell key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <Box
                            onClick={header.column.getToggleSortingHandler()}
                            sx={{
                              cursor: header.column.getCanSort() ? 'pointer' : 'default',
                              userSelect: 'none',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <Box component="span" sx={{ ml: 1, fontSize: '0.8rem' }}>
                              {{
                                asc: '↑',
                                desc: '↓',
                              }[header.column.getIsSorted()] ?? null}
                            </Box>
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} hover>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardContent sx={{ bgcolor: 'background.default' }}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <ButtonGroup size="small" variant="outlined">
              <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <FirstPageIcon />
              </Button>
              <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon />
              </Button>
              <Button disabled>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </Button>
              <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon />
              </Button>
              <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <LastPageIcon />
              </Button>
            </ButtonGroup>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
