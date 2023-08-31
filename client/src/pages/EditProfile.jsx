import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/slices/userSlice";
import MyAvatar from "../components/utils/MyAvatar";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosclient";
import Loader from "../components/utils/Loader";
import DeleteAccountModal from "../components/DeleteAccountModal";

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    about: "",
    profileImg: "",
  });

  useEffect(() => {
    dispatch(getMyProfile());
    setUserDetails({
      name: user?.name,
      username: user?.username,
      about: user?.about,
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setProfileImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  const updateProfile = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.put("user/profile", {
        name: userDetails?.name,
        username: userDetails?.username,
        about: userDetails?.about,
        image: profileImg,
      });

      if (res.status === 200) {
        toast.success("Profile Updated");
        dispatch(getMyProfile());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const changePassword = async () => {
    try {
      const res = axios.post("auth/changePassword", {
        oldPassword: password,
        newPassword: newPassword,
      });

      toast.promise(res, {
        loading: "Changing...",
        success: (data) => {
          return data.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-dark-1 text-white w-full h-full px-10 py-10 mb-20 md:mb-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-extrabold text-3xl">Edit Profile</h2>
        <p className=" ">Make any changes</p>
      </div>

      <form className="flex flex-col  mt-10 gap-10 " onSubmit={updateProfile}>
        <div className="flex items-center gap-6">
          {/* <img id="preview_img" alt="" /> */}
          {profileImg ? (
            <div className="md:w-36 w-28 h-20 md:h-28 rounded-full ">
              <MyAvatar image={profileImg} />
            </div>
          ) : (
            <div className="md:w-36 w-28 h-20 md:h-28 rounded-full ">
              <MyAvatar image={user?.avatar?.url} />
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
            class="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-dark-1 file:text-primary-500"
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <label htmlFor="name" className="font-bold ">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 rounded-md bg-dark-3 border border-gray-1 focus:outline-none "
            value={userDetails?.name}
            onChange={(e) => {
              setUserDetails({ ...userDetails, name: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label htmlFor="username" className="font-bold ">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-3 rounded-md bg-dark-3 border border-gray-1 focus:outline-none "
            value={userDetails?.username}
            onChange={(e) => {
              setUserDetails({ ...userDetails, username: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label htmlFor="aboutyou" className="font-bold ">
            About You
          </label>
          <textarea
            name=""
            id="aboutyou"
            cols="30"
            rows="10"
            className="w-full p-3 rounded-md bg-dark-3 border border-gray-1 focus:outline-none "
            value={userDetails?.about}
            onChange={(e) => {
              setUserDetails({ ...userDetails, about: e.target.value });
            }}
          />
        </div>
        <button className="bg-primary-500 text-center rounded-md font-bold p-3 text-[1.1rem] active:scale-95 transition-all ease-in-out duration-200 ">
          {loading ? <Loader /> : "Update"}
        </button>
      </form>

      <div className="mt-10 flex flex-col gap-5">
        <h2 className="text-2xl font-bold my-4">Change Password</h2>
        <div className="flex flex-col w-full gap-4 ">
          <label htmlFor=" Old-Password" className="font-bold ">
            Old Password
          </label>
          <input
            type="text"
            id="Old-Password"
            className="w-full p-3 rounded-md bg-dark-3 border border-gray-1 focus:outline-none "
            placeholder="Old Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <label htmlFor="new-password" className="font-bold ">
            New Password
          </label>
          <input
            type="text"
            id="new-password"
            className="w-full p-3 rounded-md bg-dark-3 border border-gray-1 focus:outline-none "
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className="mt-5 bg-primary-500 rounded-md font-bold p-3 text-[1.1rem] active:scale-95 transition-all ease-in-out duration-200 "
          onClick={changePassword}
        >
          Save
        </button>
      </div>

      <div className="mt-32">
        <h3 className="text-2xl font-bold my-4">Danger Zone</h3>
        <button
          className="mt-5 bg-red-600 rounded-md font-bold p-3 text-[1.1rem] w-full active:scale-95 transition-all ease-in-out duration-200 "
          onClick={() => setShowDeleteModal(true)}
        >
          Delete My Account
        </button>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal show={showDeleteModal} hide={setShowDeleteModal} />
      )}
    </div>
  );
}

export default EditProfile;
