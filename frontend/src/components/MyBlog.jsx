import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyBlogScreen from "../screens/MyBlogScreen";

const MyBlog = () => {
  const [blogs, setBlogs] = useState();

  const { userInfo } = useSelector(state => state.auth);
  const { blogData } = useSelector(state => state.blogs);

  const filteredBlogs = blogData.filter(blog => blog.user === userInfo._id);

  useEffect(() => {
    setBlogs(filteredBlogs);
  }, []);

  return blogs && <MyBlogScreen key={blogs._id} blogs={blogs} />;
};

export default MyBlog;
