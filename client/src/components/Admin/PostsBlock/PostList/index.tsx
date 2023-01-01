import { DataGrid } from '@mui/x-data-grid'

const PostList = ({ columns, rows }: any) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableColumnMenu
        disableColumnSelector
        disableColumnFilter
        sx={{
          background: 'none',
          color: '#333',
          '.MuiDataGrid-virtualScroller': {
            marginTop: '75px !important',
          },
          '.MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
          },
          '.MuiDataGrid-columnHeaders': {
            marginBottom: '20px',
            background: '#fff !important',
            borderRadius: '10px',
          },
          '.MuiDataGrid-row': {
            marginBottom: '20px',
            background: '#fff !important',
            borderRadius: '10px',
            width: '100%',
          },
          '.MuiDataGrid-row:hover': {
            background: '#fff',
          },
          '.MuiDataGrid-cell': {
            outline: '0 !important',
            border: '0 !important',
          },
          '.MuiDataGrid-footerContainer': {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
          },
          '.MuiToolbar-root': {
            color: '#333',
          },
        }}
      />
    </div>
  )
}

export default PostList
