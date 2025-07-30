import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Table, Badge, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

export default function EntitiesList() {
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const [data] = useState([
    {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'User',
      status: 'Active',
      lastLogin: '2025-07-28',
    },
    {
      id: 2,
      username: 'janesmith',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2025-07-29',
    },
    {
      id: 3,
      username: 'mikejohnson',
      email: 'mike@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2025-07-25',
    },
  ]);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

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
              const status = info.getValue();
              const variant = status.toLowerCase() === 'active' ? 'success' : 'danger';
              return <Badge bg={variant}>{status}</Badge>;
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
              <ButtonToolbar>
                <ButtonGroup size="sm">
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(info.row.original.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleView(info.row.original.id)}
                  >
                    View
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
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
    navigate(`/edit-entity/${userId}`);
  };

  const handleView = (userId) => {
    // Implement view functionality
    console.log('View user:', userId);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-0">Users</h2>
        </Col>
        <Col xs="auto">
          <Row className="g-3 align-items-center">
            <Col>
              <Form.Control
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search all columns..."
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate('/edit-entity')}>
                Add User
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover>
              <thead className="bg-light">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={header.column.getCanSort() ? 'cursor-pointer user-select-none' : ''}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span className="ms-1">
                              {{
                                asc: '↑',
                                desc: '↓',
                              }[header.column.getIsSorted()] ?? null}
                            </span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="bg-light">
          <Row className="align-items-center justify-content-center">
            <Col xs="auto">
              <ButtonGroup size="sm">
                <Button
                  variant="outline-secondary"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<<'}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </Button>
                <Button variant="outline-secondary" disabled>
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {'>'}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {'>>'}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}
