import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Chatbox from "../components/Chat";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from "../utils/auth";

export default function Chat() {
    const { loading, data, error } = useQuery(GET_ME);

    useEffect(() => {
        if(!loading){
            console.log("===========")
            console.log(error)
        }
    });

    if (Auth.loggedIn()) {
        return (
            <div id="chat">
               <Chatbox />
    
            </div>
        );
    }
    return (
        <div id="chat">
     <Link to="/account"><button>Login to View</button></Link>
        

            


        </div>
    );
}

