import React, { useEffect, useState } from "react";
import ShowUser from "./ShowUser";
import axios from "../../utils/axiosclient";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("user/suggestedUser");
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="bg-dark-2 text-white w-[30%] h-[100vh] overflow-y-scroll sticky top-0 right-0 z-2 p-10 border-l-2 border-gray-1">
      <div>
        <p className="font-bold text-2xl">Suggestions for you</p>

        <div className="flex flex-col gap-8 my-10">
          {users.map((item) => {
            return (
              <ShowUser
                key={item._id}
                name={item.name}
                username={item?.username ? item.username : item.name}
                id={item._id}
                avatar={item.avatar.url}
                isFollowedByCurrentUser={user?.followers?.some(
                  (follower) => follower._id === item._id
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
