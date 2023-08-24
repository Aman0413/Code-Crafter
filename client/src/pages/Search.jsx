import React, { useEffect, useState } from "react";
import ShowUser from "../components/utils/ShowUser";
import axios from "../utils/axiosclient";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/slices/userSlice";

function Search() {
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState([]);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    try {
      if (e.target.value === "") {
        setUserProfile([]);
      }
      const res = await axios.get("user/search", {
        params: {
          searchQuery: e.target.value,
        },
      });
      setUserProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getMyProfile());
    console.log("SEARCH PAGE", user);
  }, []);
  return (
    <div className="text-white w-full h-full bg-dark-1 p-10">
      <div>
        <h2 className="text-3xl font-bold">Search</h2>
      </div>

      <div className="my-8">
        <input
          type="text"
          className="bg-dark-2 w-full p-5 rounded-lg placeholder-gray-1 placeholder:text-xl text-xl outline-none focus:outline-gray-1"
          placeholder="Seach Users"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-6">
        {userProfile.length > 0 &&
          userProfile.map((item) => {
            return (
              <ShowUser
                name={item.name}
                username={item?.username ? item.username : item.name}
                avatar={item.avatar.url}
                key={item._id}
                id={item?._id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Search;
