import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeeCommModal from "../components/SeeCommModal";
import AddAPost from "../components/Post";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_POST } from "../utils/mutations";
import { GET_TOPIC_BY_NAME } from "../utils/queries";
import "./styles/topic.css";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import M from "materialize-css";

const Topic = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const forumName = searchParams.get("name");

  const [removePost, watThis] = useMutation(REMOVE_POST);

    let loggedUser;

    if(Auth.loggedIn()) {
      let { data } = Auth.getProfile();
      loggedUser = {...data}
      // console.log("MEOW")
      // console.log(loggedUser)
     };


  const { loading, error, data } = useQuery(GET_TOPIC_BY_NAME, {
    variables: { name: searchParams.get("name") },
  });


  const postData = data?.getTopicByName || [];

  // console.log("PDiddy", postData)
  const postArray = postData.posts;

  const toastHTML = '<div><p>Delete Forever?</p><button className="btn-flat toast-action" onClick={handleDeletePost}>Yes</button><hr></hr><button className="btn-flat toast-action" onClick={M.Toast.dismissAll()}>No</button></div>';
  

  const handleDeletePost = async (event) => {

    let targetPostId = event.target.parentElement.dataset.postId;
    const { data: rmpData } = await removePost({
      variables: { postId: targetPostId, topicId: postData._id },
    });
    console.log("rmp", rmpData);
    console.log("waThs", watThis)

    // window.location.reload();

  };

  if(!Auth.loggedIn()){
    return (
    <div>
  <Link to="/account"><button>Login to View</button></Link></div>
    )
  }
  return (
    <>
    <div className="study-topics">
          <div className="container forum-topic">
            <div className="row forum-content">
              <div className="col s8">
                <h4 className="topic-header">
                  Welcome to the {forumName} Forum
                </h4>
              </div>
              <div className="col s4">
                {loading ? <p></p> : <AddAPost topicId={postData._id}/>}
              </div>
    {loading ? (<h2>LOADING.......</h2>)
    : postArray.map(post => {
      return (
              <div className="col s12 m12">
                <div className="darken-1 topic-card">
                  <div className="card-content topic-text">
                    {loggedUser._id === post.author._id 
                    ? <div className="post-author-plus"><h5 className="post-author">By: {post.author.username}</h5><div className="btn" data-postId={post._id} onClick={() => M.toast({html: toastHTML, classes: "toasty"})}><DeleteForeverRoundedIcon /></div></div> :
                    <h5 className="post-author">By: {post.author.username}</h5>
                    }
                    <span class="card-title">{post.question}</span>
                    <p>{post.content}</p>
                  </div>
                  {/* display flex on following div so that the button goes beside the input */}
                  <CommentForm postId={post._id} />
                  <div className="container comment-box card-action">
                    <h6 className="comments-header">
                      Comments{" "}
                      <span className="comments material-icons">forum</span>
                    </h6>
                    <SeeCommModal commData={post.comments} />
                  </div>
                </div>
              </div>)}
    )}
                </div>
          </div>
        </div>
        </>
    );
};

export default Topic;