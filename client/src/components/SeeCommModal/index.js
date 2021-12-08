import React, { useState, useEffect } from "react";
import { REMOVE_COMMENT } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import 'materialize-css';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import "./style.css";
import { Collapsible, CollapsibleItem } from 'react-materialize';
import {Zoom, Button } from '@mui/material';
import { useCycle, useAnimation, motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";


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

    const [isOpen, toggleOpen] = useCycle(false, true);

    const containerSpecs = {
      open: {
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
      },
      closed: {
        transition: { staggerChildren: 0.2, staggerDirection: -1 }
      }
    }

    const liSpecs = {
      open: {
        x: 0,
        opacity: 1,
        transition:{duration: 0.2}
      },
      closed: {
        x: 150,
        opacity: 0,
        transition:{duration: 0.2}
      }
    };

    const commControls = useAnimation()

    const handleAnimate = async () => {
      console.log("Animate!")
      toggleOpen();
      // await  commControls.start({ x: [150,0] })
    };

      return (
        <>
        <div>
        <Collapsible accordion>
  <CollapsibleItem
        expanded={false}
        header="SEE COMMENTS."
        node="div"
        onClick={handleAnimate}
      >
          <motion.ul animate={isOpen ? "open" : "closed"} variants={containerSpecs}>
    {props.commData.map(comment => {
       return (
          <motion.li 
          variants={liSpecs}
           key={comment._id} 
           className="row">
            <div className="col s12 m12">
              <div className="blue-grey darken-1">
                <div className="card-content white-text">

                {loggedUser._id === comment.author._id 
                ? (<div className="delete-box">
                    <h6 className="comment-author">By: {comment.author.username}</h6>
                    <AnimateSharedLayout  type="crossfade">

                    <motion.div transition={{ duration: 1}} layoutId={`btn-${comment._id}`} ><Button className="del-comm-btn" variant="contained" size="small" color="warning" endIcon={<DeleteForeverRoundedIcon />} onClick={() => handleTryDelete( comment._id)}>Delete Comment</Button></motion.div>
                    <AnimatePresence>

                    {/* <Zoom in={zoomOpen[comment._id]} timeout={{ enter: 1000, exit: 500 }} mountOnEnter unmountOnExit > */}
                          {zoomOpen[comment._id] && <motion.div transition={{ duration: 1}} layoutId={`btn-${comment._id}`} ><div className="comm-del">
                            <h5>Delete Forever?</h5>
                            <div className="comm-del-btns">
                            <Button variant="contained" color="error" onClick={() => handleDeleteComment(comment._id)}>Yes</Button>
                            <hr></hr>
                            <Button variant="contained" color="success" onClick={() => handleClose(comment._id)}>No</Button>
                            </div>
                          </div></motion.div>}
                        {/* </Zoom> */}
                        </AnimatePresence>

                        </AnimateSharedLayout>

                  </div>)
                  : (<h6 className="comment-author">By: {comment.author.username}</h6>) 
                  }
                  <p>{comment.content}</p>
                  <p>{comment.upvotes}</p>
                </div>
              </div>
            </div>
          </motion.li>

       )
     })
  }
  </motion.ul>
           </CollapsibleItem>
          </Collapsible>
        </div>
        </>
      );
    
};

export default SeeCommModal;


//====================
