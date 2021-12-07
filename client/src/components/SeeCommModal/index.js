import React, { useState, useEffect } from "react";
import { REMOVE_COMMENT } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import 'materialize-css';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import "./style.css";
import { Collapsible, CollapsibleItem } from 'react-materialize';
import {Zoom, Button } from '@mui/material';


const SeeCommModal = (props) => {

  const [zoomOpen, setZoomOpen] = useState({});
  const [targetCommId, setTargetCommId] = useState(null);

  const [removeComment, watThis] = useMutation(REMOVE_COMMENT);

    let loggedUser;

    if(Auth.loggedIn()) {
      let { data } = Auth.getProfile();
      loggedUser = {...data}
      console.log("MEOW")
      console.log(loggedUser)
     };

     useEffect(() => {
      let tempState = {};
      props.commData.forEach(comm => {
        if(loggedUser._id === comm.author._id){
          tempState[comm._id] = false;
        }
      })
      setZoomOpen(tempState);

     },[props]);


    const handleClose = (commTarget) => {
  
      setZoomOpen({...zoomOpen, [commTarget]: false});
    };
  
    const handleTryDelete = (commTarget) => {    
      setTargetCommId(commTarget);
      setZoomOpen({...zoomOpen, [commTarget]: true});
    };
  
    const handleDeleteComment = async (commTarget) => {
      const { data: rmpData } = await removeComment({
        variables: { commentId: targetCommId, postId: props.postId },
      });
      setZoomOpen({...zoomOpen, [commTarget]: false});
      window.location.reload();        
    };


      return (
        <>
        <div>
        <Collapsible accordion>
  <CollapsibleItem
        expanded={false}
        header="SEE COMMENTS."
        node="div"
      >
    {props.commData.map(comment => {
       return (
          <div key={comment._id} className="row">
            <div className="col s12 m12">
              <div className="blue-grey darken-1">
                <div className="card-content white-text">

                {loggedUser._id === comment.author._id 
                ? (<div className="delete-box">
                    <h6 className="comment-author">By: {comment.author.username}</h6>
                    <Zoom in={zoomOpen[comment._id]} timeout={{ enter: 1000, exit: 500 }} mountOnEnter unmountOnExit >
                          <div className="comm-del">
                            <h5>Delete Forever?</h5>
                            <div className="comm-del-btns">
                            <Button variant="contained" color="error" onClick={() => handleDeleteComment(comment._id)}>Yes</Button>
                            <hr></hr>
                            <Button variant="contained" color="success" onClick={() => handleClose(comment._id)}>No</Button>
                            </div>
                          </div>
                        </Zoom>
                    <Button className="del-comm-btn" variant="contained" size="small" color="warning" endIcon={<DeleteForeverRoundedIcon />} onClick={() => handleTryDelete( comment._id)}>Delete Comment</Button>

                  </div>)
                  : (<h6 className="comment-author">By: {comment.author.username}</h6>) 
                  }
                  <p>{comment.content}</p>
                  <p>{comment.upvotes}</p>
                </div>
              </div>
            </div>
          </div>

       )
     })
  }
           </CollapsibleItem>
          </Collapsible>
        </div>
        </>
      );
    
};

export default SeeCommModal;