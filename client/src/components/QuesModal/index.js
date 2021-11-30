import React, { Component, useState, useEffect } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
//* import Auth from '../utils/auth'; 

class QuesModal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }
  PostForm = () => {

  };

  render() {
    return (
      <div className="container">
        <div className="valign-wrapper">
          <a
            className="qModBtn waves-effect waves-light btn-large modal-trigger col s12"
            data-target="modal1"
          >
            Ask a Question
          </a>
        </div>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <div>
              <h4>Post Question and Details below</h4>
            </div>
            <div className="divider"></div>
            <div className="container">
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea
                            id="textarea1"
                            className="materialize-textarea"
                          ></textarea>
                          <label for="textarea1">Question Title</label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea
                            id="textarea1"
                            className="materialize-textarea"
                          ></textarea>
                          <label for="textarea1">
                            Question details and Examples
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="container">
            <div className="modal-footer">
              <button
                className="btn waves-effect waves-light col s6"
                type="submit"
                name="action"
              >
                Submit Question
                <i className="material-icons right">send</i>
              </button>
              <a className="modal-close waves-effect waves-light btn">Close</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuesModal;
