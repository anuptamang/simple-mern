import { Comments } from 'types/post';
import SingleComment from './SingleComment';

type CommentsListProps = {
  comments: Comments[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsList;
