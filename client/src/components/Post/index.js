import React, { useState } from "react";
import { CREATE_POST } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';


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

      const { data } = await createPost({
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
    }

   
  };

  return (
    <div className="postForm">
      <form onSubmit={handleFormSubmit}>
        <div classname='inputBox'>
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
        <div classname='inputBox'>
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

        <div classname='inputBox'>
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

        <div classname='inputBox'>
          <button
            type="submit"
            variant="success"
            onClick={handleFormSubmit}
          >
            Add Post
          </button>
        </div>
      </form>
    </div >
  );
};
