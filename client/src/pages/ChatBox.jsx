import React from "react";

function ChatBox() {
  const sendMessgae = () => {
    //get socket id
  };
  return (
    <div className="text-white h-full w-full">
      <input type="text" className="text-black" />
      <button onClick={() => sendMessgae}>Send</button>
    </div>
  );
}

export default ChatBox;
