import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditDelete from "../components/EditDelete";

const BlogScreen = ({ blog, isEditDelete }) => {
  const [tempName, setName] = useState("");

  const user = useSelector(state => state.users);
  const blogUser = user.blogUser.user;

  const date = new Date(blog.date_created);
  const formattedDate = date.toDateString();

  async function capitalizeName() {
    const tempName = await blogUser
      .split(" ")
      .map(tempName => {
        tempName.toLowerCase();
        return tempName[0].toUpperCase() + tempName.substring(1);
      })
      .join(" ");
    setName(tempName);
  }
  capitalizeName();

  return isEditDelete ? (
    <EditDelete blog={blog} tempName={tempName} formattedDate={formattedDate} />
  ) : (
    <div className=" max-h-fit w-100 h-3/4 flex justify-center align-middle">
      <section className=" bg-gray-700 flex mr-9 ml-9 mt-5  min-h-fit max-h-fit rounded-lg">
        <div className="max-w-[28%] min-w-52 ">
          <img
            className="bg-slate-300  max-w-[90%] max-h-[70%] rounded-lg "
            src={blog.image}
            alt="image placeholder"
          ></img>
          <address className="pr-4 mt-5 mb-2 pl-2  dark:text-white ">{`By: ${tempName}`}</address>
          <time className=" dark:text-white pl-2" dateTime={blog.date_created}>
            {formattedDate}
          </time>
        </div>

        <article className="pl-8 h-100 w-2/3 justify-center overflow-y-auto  ">
          <h5 className="mt-4 mb-4 text-2xl font-bold tracking-tight dark:text-white text-center">
            {blog.title}
          </h5>
          <p className=" mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
            {blog.text}
          </p>
        </article>
      </section>
    </div>
  );
};

export default BlogScreen;
