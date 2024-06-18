import React, { useState } from 'react';
import styled from 'styled-components';
import { useTable, useFilters } from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Styles = styled.div`
  padding: 1rem;

  .header {
    text-align: center;
    margin-bottom: 1rem;
  }

  .header h1 {
    margin: 0;
    color: #179766;
  }

  .controls {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .controls label {
    margin-right: 0.5rem;
    font-weight: bold;
  }

  .react-datepicker-wrapper {
    width: auto;
  }

  .filters {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .filters label {
    margin-right: 0.5rem;
    font-weight: bold;
  }

  .filters input, .filters select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  table {
    width: 80%;
    margin: auto;
    border-spacing: 0;
    border: 1px solid #ddd;
    thead {
      background-color: #179766;
      color: #fff;
    }
    th, td {
      margin: 0;
      padding: 0.75rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      text-align: left;
      &:last-child {
        border-right: 0;
      }
    }
    tbody tr:hover {
      background-color: #f1f1f1;
    }
  }

  th {
    background-color: #179766;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 0.9rem;
  }

  td {
    font-size: 0.9rem;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:nth-child(odd) {
    background-color: #fff;
  }
`;

const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header },
}) => (
  <div>
    <label>{Header}:</label>
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${Header}`}
    />
  </div>
);

const ProductTable = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [planningPeriod, setPlanningPeriod] = useState('Monthly');
  const [productFilter, setProductFilter] = useState('');
  const [productFamilyFilter, setProductFamilyFilter] = useState('');
  const [plantLocationFilter, setPlantLocationFilter] = useState('');

  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        productFamily: 'Family 1',
        plantLocation: 'Location 1',
        quantity: 10,
        dueDate: '2024-06-01',
        currentStock: 5,
        productionOrders: 2,
      },
      {
        product: 'Product 2',
        productFamily: 'Family 2',
        plantLocation: 'Location 2',
        quantity: 20,
        dueDate: '2024-07-15',
        currentStock: 8,
        productionOrders: 3,
      },
      // Add more products here
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product',
        accessor: 'product',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Product Family',
        accessor: 'productFamily',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Plant Location',
        accessor: 'plantLocation',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
      },
      {
        Header: 'Current Stock',
        accessor: 'currentStock',
      },
      {
        Header: 'Production Orders',
        accessor: 'productionOrders',
      },
      {
        Header: 'Gantt Chart',
        accessor: 'gantt',
        Cell: ({ row }) => (
          <div style={{ backgroundColor: '#e0e0e0', height: '20px', position: 'relative' }}>
            <div
              style={{
                backgroundColor: '#4caf50',
                width: `${row.original.productionOrders * 10}%`,
                height: '100%',
              }}
            ></div>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters);

  const monthYearString = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <Styles>
      <div className="header">
        <h1>Master Production Schedule</h1>
      </div>
      <div className="controls">
        <div className="date-picker">
          <label>Select Month and Year:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div className="planning-period">
          <label>Select Planning Period:</label>
          <select
            value={planningPeriod}
            onChange={(e) => setPlanningPeriod(e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="filters">
        <div className="filter-group">
          <label>Filter by Product:</label>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            onBlur={() => setFilter('product', productFilter)}
          >
            <option value="">All</option>
            <option value="Product 1">Product 1</option>
            <option value="Product 2">Product 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Product Family:</label>
          <select
            value={productFamilyFilter}
            onChange={(e) => setProductFamilyFilter(e.target.value)}
            onBlur={() => setFilter('productFamily', productFamilyFilter)}
          >
            <option value="">All</option>
            <option value="Family 1">Family 1</option>
            <option value="Family 2">Family 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Plant Location:</label>
          <select
            value={plantLocationFilter}
            onChange={(e) => setPlantLocationFilter(e.target.value)}
            onBlur={() => setFilter('plantLocation', plantLocationFilter)}
          >
            <option value="">All</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={columns.length} style={{ textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
              {monthYearString}
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default ProductTable;
