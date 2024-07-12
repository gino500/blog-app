import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCreateBlogMutation } from "../slices/blogsApiSlice";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createBlogApi] = useCreateBlogMutation();

  const handleSubmit = e => {
    e.preventDefault();
    setId(userInfo._id);
    const updatedBlog = { id, image, title, text };
    createBlog(updatedBlog);
  };

  async function createBlog(updateApi) {
    if (image === "") return toast.error("Invalid image URL");

    try {
      const res = await createBlogApi(updateApi).unwrap();
      toast("Blog Created");
      if (res) navigate("/");
    } catch (error) {
      error.data.errors.forEach(error => toast.error(error.msg));
    }
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
            className="bg-slate-300 h-[20%] w-[80%] max-w-[90%] max-h-[70%] rounded-lg "
            alt="Your Image here"
          ></img>
          <input
            className=" border border-white"
            type="text"
            name=""
            id=""
            placeholder="Paste Image URL"
            onChange={e => setImage(e.target.value)}
          />

          <div className="w-60 m-5 ">
            <button
              type="submit"
              className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>

        <article className="pl-8 h-100 w-2/3 justify-center overflow-y-auto  ">
          <input
            className="mt-4 mb-4 text-2xl font-bold tracking-tight dark:text-white bg-transparent border border-white outline-none text-center "
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full h-full mb-3 font-normal text-lg text-gray-700 dark:text-gray-400 bg-transparent border border-white outline-none text-center"
            placeholder="Enter Text: Minimum 30 Characters "
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </article>
      </form>
    </div>
  );
};

export default CreateBlog;
