import axios from "axios";
import "./style.css";
import { useEffect, useRef, useState } from "react";

//taking i/p from textbox
function App() {
  let inputRef = useRef();
  let [message, setmessage] = useState("");
  let [messageList, setMessageList] = useState([]);

  useEffect(() => {
    //console.log("i am called");
    getallmsg();
  });

  let changemsg = (e) => {
    message = e.target.value;
    setmessage(message);
    //above 2 equal to setmessage(e.target.value);
  };
  let getallmsg = async () => {
    let url = `http://localhost:3001/messages`;
    let response = await axios.get(url);
    //console.log(response.data);
    messageList = [...response.data];
    //console.log(messageList);
    //re-render
    setMessageList(messageList);
  };

  let createnewmsg = async (reply) => {
    let url = `http://localhost:3001/message`;

    if (!inputRef.current.checkValidity()) {
      alert("invalid");
      return;
    }
    let data = {
      message: message,
      reply: reply,
    };

    await axios.post(url, data);
    setmessage("");
    getallmsg();
    window.scrollTo(5, document.body.scrollHeight);
  };
  let checkenter = (e) => {
    if (e.keyCode === 13) {
      createnewmsg(false);
    }
  };

  return (
    <div style={{ "background-color": "rgb(211, 211, 211)" }}>
      <p className="bg-success text-light sticky-top p-2 mb-0 ">
        &#9664; <i className="fa fa-user blue-color ms-2 me-2"></i>
        Pankaj Jogale
      </p>

      <main style={{ "background-color": "rgb(211, 211, 211)" }}>
        <div>
          {messageList.map((item, index) => (
            <div className="row justify-content-center ms-2 me-2">
              <div
                style={{ "background-color": "rgb(227, 219, 180)" }}
                className="col-12 col-md-6 border-4 border-dark "
              >
                <div
                  key={index}
                  className={
                    item.reply
                      ? "d-flex justify-content-end my-1"
                      : "d-flex justify-content-start my-1"
                  }
                >
                  <div className="badge text-bg-light">
                    {item.message}
                    <span className="ms-4">
                      {new Date(item.messageTime).getHours()}:
                      {new Date(item.messageTime).getMinutes()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row justify-content-center ms-2  me-2">
            <div className="col-12 col-md-6 border-4 border-dark push mb-4"></div>
          </div>
        </div>

        <footer>
          <div className="row justify-content-center ">
            <div className="col-12 col-md-6 ">
              <div className="d-flex ">
                <input
                  className="form-control form-control-sm "
                  type="text"
                  value={message}
                  placeholder="Type a message"
                  onChange={changemsg}
                  onKeyUp={checkenter}
                  ref={inputRef}
                  required
                  minLength={3}
                />
                <button onClick={() => createnewmsg(false)}>
                  <i className="material-icons mt-1">send</i>
                </button>

                <input
                  className="btn btn-dark btn-sm"
                  type="button"
                  value="Reply"
                  onClick={() => createnewmsg(true)}
                />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
export default App;
