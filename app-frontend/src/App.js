import React, {useEffect, Fragment} from 'react';
import logo from './logo.svg';
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from 'react-table'
import './App.css';
import io from 'socket.io-client';
import {data} from "./json"
const url = "https://api.iextrading.com/1.0/tops";


function App() {

  const columns = React.useMemo(
    () => [
      {
        Header: "askPrice",
        accessor: "askPrice"
      },
      {
        Header: "askSize",
        accessor: "askSize"
      },
      {
        Header: "bidPrice",
        accessor: "bidPrice"
      },
      {
        Header: "bidSize",
        accessor: "bidSize"
      },
      {
        Header: "lastSalePrice",
        accessor: "lastSalePrice"
      },
      {
        Header: "lastSaleSize",
        accessor: "lastSaleSize"
      },
      {
        Header: "lastSaleTime",
        accessor: "lastSaleTime"
      },
      {
        Header: "lastUpdated",
        accessor: "lastUpdated"
      },
      {
        Header: "marketPercent",
        accessor: "marketPercent"
      },
      {
        Header: "sector",
        accessor: "sector"
      },
      {
        Header: "securityType",
        accessor: "securityType"
      },
      {
        Header: "symbol",
        accessor: "symbol"
      },
      {
        Header: "volume",
        accessor: "volume"
      }
    ],
    []
  );
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  )


  const getTable = async () => {
    try {
      
    
     
    } catch (error) {
     console.log("error", error);
     
    }

  }

  useEffect(()=>{
    getTable()
   
  }, [])



  let component = <div></div>;

  // Render the UI for your table

    component = (
      <Fragment>
        <div className="table-registros">
          {data.length > 0 ? (
           <Fragment>
             <table  className="table table-striped table-responsive" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
           </Fragment>
          ) : (
            <div className="alert alert-info">
              Falta que los registros se asignen a servidores
            </div>
          )}
        </div>
      </Fragment>
    );

    return component
}

export default App;
