import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";

const MyBlogScreen = ({ blogs }) => {
  const [isEditDelete, setIsEditDelete] = useState(false);

  useEffect(() => {
    setIsEditDelete(true);
  }, []);

  return (
    isEditDelete && (
      <>
        <h1>Click Blog to Edit, or Delete</h1>
        <HomeScreen allBlogs={blogs} isEditDelete={isEditDelete} />;
      </>
    )
  );
};

export default MyBlogScreen;
