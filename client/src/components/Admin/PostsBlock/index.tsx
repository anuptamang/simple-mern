import { Box, Grid, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllPosts } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';
import { PostBlockProps } from '../../../types/post';
import { PostsIcon } from '../../UI/Icons';
import PostCreate from './PostCreate';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostList from './PostList';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useNavigate } from 'react-router-dom';

export default function PostsBlock() {
  const auth = useAuth();
  const dispatch = useAppDispatch() as any;
  const post = useAppSelector(postSelector) as any;
  const navigate = useNavigate();

  const [postBody, setPostBody] = useState(EditorState.createEmpty());
  const [thumbnail, setThumbnail] = useState<any>(null);

  const onPostBodyChange = (newPostBody: any) => {
    setPostBody(newPostBody);
  };

  const [rows, setRows] = useState<PostBlockProps[]>([]);
  const [editPost, setEditPost] = useState<PostBlockProps>();
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
      const toEdit = rows.find((row: PostBlockProps) => row.id === id);
      setEditPost(toEdit);
      setThumbnail(toEdit?.thumbnail);

      const blocksFromHtml = htmlToDraft(toEdit?.body);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      onPostBodyChange(editorState);
    }
  };
  const handleDelete = (id: string) => {
    handleOpenDelete();
    setDeleteId(id);
  };

  const columns = [
    { field: 'title', headerName: 'Post', width: 300, sortable: false },
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
        <GridActionsCellItem
          label="View"
          onClick={() => navigate(`/posts/${params.id}`)}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getAllPosts());
  }, [
    dispatch,
    post?.createPostSuccess,
    post?.updatePostSuccess,
    post?.deletePostSuccess,
  ]);

  useEffect(() => {
    if (post?.posts?.data) {
      const postsByUserID = post?.posts?.data?.filter(
        (item: any) => item.userID === auth.result?._id
      );

      const userPosts = postsByUserID?.map((post: PostBlockProps) => ({
        id: post._id,
        createdAt: dayjs(post.createdAt).format('MMMM D, YYYY'),
        author: auth?.result?.fullName,
        body: post.body,
        title: post.title,
        thumbnail: post.thumbnail,
        categories: post.categories,
        tag: post.tag,
      }));

      setRows(userPosts);
    }
  }, [auth.result?._id, auth.result?.fullName, post?.posts?.data]);

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

        <PostCreate
          setRows={setRows}
          open={open}
          handleClose={handleClose}
          onPostBodyChange={onPostBodyChange}
          postBody={postBody}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
        <PostEdit
          editPost={editPost}
          setRows={setRows}
          rows={rows}
          open={openEdit}
          handleClose={handleCloseEdit}
          onPostBodyChange={onPostBodyChange}
          postBody={postBody}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
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
