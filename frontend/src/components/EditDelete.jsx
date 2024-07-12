import React, { useState } from "react";
import {
  useAllBlogsMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../slices/blogsApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlogs, clearBlogs } from "../slices/blogsSlice";
import { toast } from "react-toastify";
import deleteIcon from "../assets/delete-icon.svg";

const EditDelete = ({ blog, tempName, formattedDate }) => {
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [blogDelete, setBlogDelete] = useState(false);
  const [id, setId] = useState(blog._id);
  const [image, setImage] = useState(blog.image);
  const [title, setTitle] = useState(blog.title);
  const [text, setText] = useState(blog.text);

  const notifyChanges = () => toast("Changes Saved");
  const notifyDelete = () => toast("Blog Removed");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [callApiBlogs] = useAllBlogsMutation();
  const [updateApi] = useUpdateBlogMutation();
  const [deleteApi] = useDeleteBlogMutation();

  const handleSubmit = e => {
    e.preventDefault();
    const updatedBlog = { id, image, title, text };

    if (blogUpdate) {
      updateBlog(updatedBlog);
      setBlogUpdate(false);
    }

    if (blogDelete) {
      deleteBlog();
      setBlogDelete(false);
    }
  };

  async function updateBlog(updatedBlog) {
    try {
      const userRes = await updateApi(updatedBlog).unwrap();
      let refetchBlogs = false;

      if (userRes) {
        notifyChanges();
        dispatch(clearBlogs());
        refetchBlogs = true;
      }

      if (refetchBlogs) {
        try {
          const res = await callApiBlogs().unwrap();
          dispatch(setBlogs(res.blogs));
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteBlog() {
    const res = await deleteApi(blog._id).unwrap();
    notifyDelete();
    navigate("/");
  }

  return (
    <div className=" max-h-fit w-100 h-3/4 flex justify-center align-middle">
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        className=" bg-gray-700 flex mr-9 ml-9 mt-5  min-h-fit max-h-fit rounded-lg"
      >
        <div className="max-w-[28%] min-w-52 ">
          <img
            className="bg-slate-300  max-w-[90%] max-h-[60%] rounded-lg "
            src={blog.image}
            alt="image placeholder"
          ></img>
          <input
            className=" border border-white"
            type="text"
            name=""
            id=""
            placeholder="Paste Image URL"
            onChange={e => setImgUrl(e.target.value)}
          />
          <address className="pr-4 mt-5 mb-2 pl-2  dark:text-white ">{`By: ${tempName}`}</address>
          <time className=" dark:text-white pl-2" dateTime={blog.date_created}>
            {formattedDate}
          </time>
          <div className="w-60 m-5 ">
            <button
              type="submit"
              className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setBlogUpdate(true)}
            >
              Save Changes
            </button>
            <button
              className="mt-5 ml-5 block items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setBlogDelete(true)}
            >
              <img src={deleteIcon} alt="" />
            </button>
          </div>
        </div>

        <article className="pl-8 h-100 w-2/3 justify-center overflow-y-auto  ">
          <input
            className="mt-4 mb-4 text-2xl font-bold tracking-tight dark:text-white text-center bg-transparent border border-white outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full h-full mb-3 font-normal text-lg text-gray-700 dark:text-gray-400 bg-transparent border border-white outline-none"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </article>
      </form>
    </div>
  );
};

export default EditDelete;
