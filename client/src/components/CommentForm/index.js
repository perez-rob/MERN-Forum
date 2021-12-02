import React, { useState, useEffect} from "react";
import { CREATE_COMMENT } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import "./style.css";

export default function CommentForm(props) {
  const [postFormData, setPostFormData] = useState({ content: '', author: Auth.getProfile().data._id || "", upvotes: 0 });

  const [createComment, { error }] = useMutation(CREATE_COMMENT);

 
  const parentPost = props.postId;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostFormData({ ...postFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      console.log("HEE0", postFormData, "parent:",parentPost)

      const { data } = await createComment({
        variables: {content: postFormData.content,
          author: postFormData.author,
          upvotes: postFormData.upvotes,
        postId: parentPost },
      });
      setPostFormData({
        ...postFormData,
        content: ''
      });

      window.location.reload();
  
    } catch (e) {
      console.error("error: ", e);
    }
  };
  return (
   
    <form className="comment-form" onSubmit={handleFormSubmit}>
    <div className="input-field comment-input col s8">
      <input
        id={parentPost}
        type="text"
        className="validate"
        name="content"
        value={postFormData.content}
        onChange={handleInputChange}
      ></input>
      <label for={parentPost}>Enter your comments here</label>
    </div>
    <button
      className="btn waves-effect waves-light col s2 postBtn"
      type="submit"
      name="action"
      onClick={handleFormSubmit}
    >
      Comment
      <i className="material-icons right">send</i>
    </button>
  </form>
  
  );
}
