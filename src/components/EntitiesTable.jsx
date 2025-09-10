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
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Box,
  Paper,
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id} colSpan={header.colSpan} sx={{ width: 'auto' }}>
                    {header.isPlaceholder ? null : (
                      <Box
                        onClick={header.column.getToggleSortingHandler()}
                        sx={{
                          cursor: header.column.getCanSort() ? 'pointer' : 'default',
                          userSelect: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={5}
        rowsPerPage={10}
        page={1}
      />
    </Paper>
  );
}
