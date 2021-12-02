import React, { useState, useRef, useEffect } from "react";
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
// import M from "materialize-css";
import { Zoom, Box, Button } from '@mui/material';

//!================================================

//*================================================
const Topic = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const forumName = searchParams.get("name");

  const [snackOpen, setSnackOpen] = useState({});
  const [targetPostId, setTargetPostId] = useState(null);


  // const SlideTransition = (props) => {
  //   return <Slide {...props} direction="down" container={snackContainer.current} />;
  // }

  
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

  // const toastHTML = '<div><p>Delete Forever?</p><button className="btn-flat toast-action" onClick={handleDeletePost}>Yes</button><hr></hr><button className="btn-flat toast-action" onClick={M.Toast.dismissAll()}>No</button></div>';
  
  useEffect(() => {
    if(!loading){
    postArray.forEach(post => {
      if(loggedUser._id === post.author._id){
        setSnackOpen({...snackOpen, [post._id]: false})
      }
    })
  }

  },[loading])
  
  

  const handleClose = (postTarget) => {
  
    setSnackOpen({...snackOpen, [postTarget]: false});
  };

  const handleTryDelete = (event, postTarget) => {    
    setTargetPostId(event.target.parentElement.dataset.postId);
    setSnackOpen({...snackOpen, [postTarget]: true});
  };

  const handleDeletePost = async (postTarget) => {
    setSnackOpen({...snackOpen, [postTarget]: false});
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
                <h4 className="topic-header" >
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
                <div className="darken-1 topic-card" >
                  
                  <div className="card-content topic-text">
                    {loggedUser._id === post.author._id 
                    ? 
                    <div className="post-author-plus">
                        <h5 className="post-author">By: {post.author.username}</h5>

                        <Zoom in={snackOpen[post._id]} mountOnEnter unmountOnExit >
                          <div className="toasty">
                            <h5>Delete Forever?</h5>
                            <Button variant="contained" color="error" onClick={() => handleDeletePost(post._id)}>Yes</Button>
                            <hr></hr>
                            <Button variant="contained" color="success" onClick={() => handleClose(post._id)}>No</Button>
                          </div>
                        </Zoom>

                        <Button className="del-comm-btn" variant="contained" size="small" color="warning" endIcon={<DeleteForeverRoundedIcon />}data-postId={post._id} onClick={(e) => handleTryDelete(e, post._id)}>Delete Post</Button>

                      </div>
                         :
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