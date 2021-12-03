import React, { useEffect } from "react";
import Category from "../components/Category";
import "./styles/forum.css";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_TOPICS, GET_ME } from "../utils/queries";

const Forum = () => {
  const { loading, error, data } = useQuery(GET_TOPICS);
  const { loading: loading2, data: data2, error: error2 } = useQuery(GET_ME);
  
  useEffect(() => {
    if(!loading2){
        console.log("===========")
        console.log(data2)
    }
});
  const topicData = data?.getTopics || [];
  if (Auth.loggedIn()) {
    return (
      <div className="study-forum">
     
      <div className="topics container">
        <ul className="collection with-header topics-border">
          <li className="collection-header">
            <h3 className="select-topic">SELECT A TOPIC</h3>
          </li>
          {loading ? (
            <div className="topic-loading">Loading...</div>
          ) : (
            <div className="codetopic">
              {topicData.map((topic) => (
                <Category key={topic._id} name={topic.name} />
              ))}
            </div>
          )}
        </ul>
      </div>
</div>
    );
}
return (
  <div id="chat">
     <Link to="/account"><button>Login to View</button></Link>
  

      


  </div>
);
};

export default Forum;
