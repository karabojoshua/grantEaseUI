import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from '../functions/EnahancedTableFunctions';

///////////////////////TABLE HEADERS INCL TABLE HEADING//////////////////////
function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="h2"
          >
            Users
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Stack direction="row" spacing={2}>
            {/* <Button color="secondary">Secondary</Button> */}
            <Button variant="contained" color="success" 
                // onClick={handleClick(row.id)}
            >
              Activate
            </Button>
            <Button variant="outlined" color="error">
              Ban 
            </Button>
          </Stack>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
////////////////////////////TABLE HEAD CELLS///////////////////////////////////
const headCells = [
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: 'Account ID',
    },
    {
      id: 'userId',
      numeric: false,
      disablePadding: false,
      label: 'User ID',
    },
    {
      id: 'role',
      numeric: false,
      disablePadding: false,
      label: 'Role',
    },{
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'status',
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'action',
    },
  ];  
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
/////////////////////////SOME MORE TABLE STUFF///////////////////////////////
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

////////////////////////////////////////////////////////////////////////////
//////////////////////////// BEGIN USERS EXPORT ////////////////////////////
////////////////////////////////////////////////////////////////////////////

export default function UsersTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setMyRows] = React.useState([]);
  const [forceUpdate, setForceUpdate] = React.useState(false); // State variable to force re-render

  /////////////////////////// FETCH USERS ///////////////////////////////////
  const myrows = React.useMemo(() => {
    return [];
  }, []);
  const createData = React.useCallback((id, userId, role, banned) => {
    let status = "";
    if(banned === 0){
        status = 'Active'
    }else{
        status = 'Banned'
    }
    return {
      id,
      userId,
      role,
      status
    };
  }, []);
  const updateRowsWithApiData = React.useCallback((rows, apiData) => {
    // Map through each item in apiData
    apiData.forEach(apiItem => {
      // Extract relevant data from apiItem
      const { id, userId, role, banned} = apiItem;
      // Check if a row with the same id already exists in rows
      const existingRow = rows.find(row => row.id === id);
      // If a matching row is found, update it with the new data
      if (existingRow) {
        existingRow.userId = userId;
        existingRow.role = role;
        existingRow.banned = banned;
      }
      // If no matching row is found, create a new row with the API data and push it to rows
      else {
        rows.push(createData(id, userId, role, banned));
      }
    });
    setMyRows(rows);
  }, [createData]);
  const getUsers = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Optionally handle the error here
      return null;
    }
  }, []);

  const fetchUsers = React.useCallback(async () => {
    try {
      const data = await getUsers();
      // Do something with the fetched data
      myrows.splice(0, myrows.length);
      updateRowsWithApiData(myrows, data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Optionally handle the error here
    }
  }, [myrows, getUsers, updateRowsWithApiData]);
  ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// END FETCH USERS ////////////////////////////
  React.useEffect(() => {
    fetchUsers(); // Fetch initial user data when component mounts
  }, [fetchUsers]);
  
  /////////////////////REQUEST TO BAN SELECTED USERS/////////////////////////
  const toggleBanOnUser = (id, banOrActivate) => { 
    ///banOrActivate E {0,1} where 0 is acivate & 1 is ban
    fetch('http://localhost:5000/toggleBanOnUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            toggleBan: banOrActivate
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error updating ban');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, status: banOrActivate === 1 ? "Banned" : "Active" };
          }
          return row;
        });
        setMyRows(updatedRows); // Update myRows state
        setForceUpdate(prev => !prev); // Force re-render
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if(event.target.type === "checkbox"){
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    }
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [rows, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        id={`user-checkbox-${row.id}`}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align='right'
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.userId}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell className={row.status} align="left">{row.status} </TableCell>
                    <TableCell>
                    {
                      row.status === "Banned" ? 
                      <Button variant="contained" color="success" onClick={() => toggleBanOnUser(row.id, 0)}>Activate</Button> :
                      <Button variant="outlined" color="error" onClick={() => toggleBanOnUser(row.id, 1)}>Ban</Button>
                    }                    
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}