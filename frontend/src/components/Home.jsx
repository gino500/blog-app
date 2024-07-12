import HomeScreen from "../screens/HomeScreen";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAllBlogsMutation } from "../slices/blogsApiSlice";
import { setBlogs } from "../slices/blogsSlice";
import "../index.css";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState();

  const dispatch = useDispatch();
  const [callApiBlogs] = useAllBlogsMutation();

  async function fetchBlogs() {
    try {
      const res = await callApiBlogs().unwrap();
      dispatch(setBlogs(res.blogs));
      setAllBlogs(res.blogs);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (allBlogs) {
    return <HomeScreen key={allBlogs.id} allBlogs={allBlogs} />;
  }
};

export default Home;
