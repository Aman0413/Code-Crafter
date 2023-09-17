import React, { useEffect, useState } from "react";
import ShowUser from "../components/utils/ShowUser";
import axios from "../utils/axiosclient";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-hot-toast";

function Community() {
  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState(0);
  const suggestUsers = async () => {
    try {
      setProgress(50);
      const res = await axios.get("user/suggestedUser");
      console.log(res.data.data);
      setUsers(res.data.data);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    suggestUsers();
  }, []);

  return (
    <div className="text-white bg-dark-1 w-full h-screen px-4 ">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="text-2xl font-bold my-10">Community</h1>
      <div className=" w-full h-full overflow-y-auto flex flex-col gap-7 pb-20 px-4 ">
        {users &&
          users.map((user) => {
            return (
              <ShowUser
                key={user._id}
                id={user._id}
                name={user.name}
                username={user.username ? user.username : user.name}
                avatar={user.avatar?.url}
                view={true}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Community;
