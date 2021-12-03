import React from "react";
// import { REMOVE_COMMENT } from "../../utils/mutations";
// import { useMutation } from '@apollo/client';
// import Auth from '../../utils/auth';
import "./style.css";
import { Collapsible, CollapsibleItem } from 'react-materialize';


const SeeCommModal = (props) => {


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
                  <h6 className="comment-author">By: {comment.author.username}</h6>
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