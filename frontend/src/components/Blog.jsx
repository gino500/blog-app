import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserMutation } from "../slices/usersApiSlice";
import { setUser } from "../slices/userSlice";
import BlogScreen from "../screens/BlogScreen";
import Comments from "./Comments";

const Blog = () => {
  const [userLoaded, setUserLoaded] = useState(false);

  const location = useLocation();
  const { blog } = location.state;
  const { isEditDelete } = location.state;

  const dispatch = useDispatch();
  const [userApi] = useGetUserMutation();

  async function fetchUser() {
    try {
      const userRes = await userApi(blog.user).unwrap();
      dispatch(setUser(userRes));
      setUserLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  return (
    userLoaded && (
      <>
        <BlogScreen blog={blog} isEditDelete={isEditDelete} />
        <Comments blog={blog} isEditDelete={isEditDelete} />
      </>
    )
  );
};

export default Blog;
