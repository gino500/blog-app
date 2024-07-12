import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCommentMutation } from "../slices/blogsApiSlice";
import { setComments } from "../slices/commentSlice";
import CommentScreen from "../screens/CommentScreen";

const Comments = ({ blog }) => {
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const { comments } = useSelector(state => state.comments);

  const dispatch = useDispatch();
  const [callCommentsApi] = useGetCommentMutation();

  async function fetchComments() {
    try {
      const res = await callCommentsApi(blog._id).unwrap();
      dispatch(setComments(res));
      setCommentsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [dispatch]);

  return commentsLoaded && <CommentScreen comments={comments} blog={blog} />;
};

export default Comments;
