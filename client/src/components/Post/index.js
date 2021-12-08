import React, { useState } from "react";
import { CREATE_POST } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { useCycle, motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import Fab from '@mui/material/Fab';
import "./style.css"

export default function AddAPost(props) {
  const [postFormData, setPostFormData] = useState({ question: '', content: '', author: Auth.getProfile().data._id || "", topic: props.topicId });

  const [createPost, { error }] = useMutation(CREATE_POST);

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostFormData({ ...postFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("HEE0", postFormData)

      await createPost({
        variables: { question: postFormData.question,
          content: postFormData.content,
          author: postFormData.author,
          topic: postFormData.topic },
      });
      setPostFormData({
        ...postFormData,
        question: '',
        content: ''
      });

      window.location.reload();
  

    } catch (e) {
      console.error("error: ", e);
      console.error("queryError: ", error);
    }

   
  };
  const [isOpen, toggleOpen] = useCycle(false, true);
  const postVariants = {
    open: {
      transform: "rotate3d(1,-0.006,0,0deg)",
      transformOrigin: "bottom",
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration:1.2
      }
    },
    closed: {
      transform: "rotate3d(1,-0.006,0,90deg)",
      transformOrigin: "bottom",
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration:1.2

      }
    }
  };
  return (
    <motion.div
    className="post-btn-container"
    initial="closed"
    animate={isOpen ? "open" : "closed"}
    >

    <motion.div variants={postVariants} className="postForm">
      <form className="post-form" onSubmit={handleFormSubmit}>
        <div className='inputBox'>
          <label htmlFor="author">
            Your username
          </label>
          <input
            readOnly
            type="text"
            id="author"
            placeholder="Your username"
            name="username"
            value={Auth.getProfile().data.username || ""}

          />
        </div>
        <div className='inputBox'>
          <label htmlFor="postTitle">
            Post Title
          </label>
          <input
            type="text"
            id="question"
            placeholder="Your Post Title"
            name="question"
            value={postFormData.question}
            onChange={handleInputChange}
          />
        </div>

        <div className='inputBox'>
          <label htmlFor="postContent">
            Post Content
          </label>
          <input
            type="text"
            id="postContent"
            placeholder="Your Content"
            name="content"
            value={postFormData.content}
            onChange={handleInputChange}
          />
        </div>

        <div className='inputBox'>
          <button
            type="submit"
            variant="success"
            onClick={handleFormSubmit}
          >
            Add Post
          </button>
        </div>
      </form>
    </motion.div >
    <Fab onClick={() => toggleOpen()} color={isOpen ? "secondary":"primary"} aria-label="add">
        {isOpen ? <CancelTwoToneIcon /> : <AddBoxTwoToneIcon />}
      </Fab>
    </motion.div>
  );
};
