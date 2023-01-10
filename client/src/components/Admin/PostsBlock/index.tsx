import { Box, Grid, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllPosts } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';
import { PostProps } from '../../../types/post';
import { PostsIcon } from '../../UI/Icons';
import PostCreate from './PostCreate';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostList from './PostList';
import dayjs from 'dayjs';

export default function PostsBlock() {
  const auth = useAuth();
  const dispatch = useAppDispatch() as any;
  const post = useAppSelector(postSelector) as any;

  const postsByUserID = post?.posts?.data?.filter(
    (item: any) => item.userID === auth.result?._id
  );

  const userPosts = postsByUserID?.map((post: any) => ({
    id: post._id,
    createdAt: dayjs(post.createdAt).format('MMMM D, YYYY'),
    author: auth?.result?.fullName,
    body: post.body,
  }));

  const [rows, setRows] = useState<PostProps[]>(
    userPosts?.length > 0 ? userPosts : []
  );
  const [editPost, setEditPost] = useState<PostProps>();
  const [deleteId, setDeleteId] = useState<string>('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleEdit = (id: string) => {
    handleOpenEdit();
    if (rows.length > 0) {
      const toEdit = rows.find((row: PostProps) => row.id === id);
      setEditPost(toEdit);
    }
  };
  const handleDelete = (id: string) => {
    handleOpenDelete();
    setDeleteId(id);
  };

  const columns = [
    { field: 'body', headerName: 'Post', width: 300, sortable: false },
    // { field: 'status', headerName: 'Status', width: 150, sortable: false },
    { field: 'createdAt', headerName: 'Date', width: 300, sortable: false },
    {
      field: 'author',
      headerName: 'Author',
      width: 150,
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 70,
      getActions: (params: any) => [
        <GridActionsCellItem
          label="Edit"
          onClick={() => handleEdit(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Delete"
          onClick={() => handleDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" sx={{ color: '#C1C6DB' }}>
        Posts
      </Typography>
      <Grid container justifyContent="flex-end">
        <Box
          onClick={handleOpen}
          sx={{
            background: '#fff',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px',
            marginBottom: '40px',
            cursor: 'pointer',
          }}
        >
          <PostsIcon sx={{ color: '#333' }} />
        </Box>

        <PostCreate setRows={setRows} open={open} handleClose={handleClose} />
        <PostEdit
          editPost={editPost}
          setRows={setRows}
          rows={rows}
          open={openEdit}
          handleClose={handleCloseEdit}
        />
        <PostDelete
          setRows={setRows}
          rows={rows}
          deleteId={deleteId}
          open={openDelete}
          handleClose={handleCloseDelete}
        />
      </Grid>
      {rows.length < 1 ? (
        'No Posts Available!'
      ) : (
        <PostList rows={rows} columns={columns} />
      )}
    </>
  );
}
