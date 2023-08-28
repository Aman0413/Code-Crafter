import React, { useEffect, useState } from "react";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState(0);

  const getUsers = async () => {
    try {
      setProgress(30);
      const res = await axios.get("/admin/allUsers");
      setProgress(100);
      console.log(res.data.data);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setProgress(0);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="bg-dark-1 text-white">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div class="min-w-screen min-h-screen  flex justify-center  font-sans overflow-hidden ">
        <div class="w-full lg:w-5/6 ">
          <div class="bg-dark-2 shadow-md rounded-lg my-6 ">
            <table class="min-w-max w-full table-auto rounded-lg">
              <thead>
                <tr class="bg-dark-2 text-white uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Sno</th>
                  <th class="py-3 px-6 text-center">Users</th>
                  <th class="py-3 px-6 text-center">Role</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                {users &&
                  users.map((user, index) => {
                    return (
                      <tr
                        key={index}
                        class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                      >
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">{index + 1}</div>
                        </td>
                        <td class="py-3 px-6   flex items-center justify-center ">
                          <div class="flex items-center ">
                            <div class="mr-2 ">
                              <img
                                class="w-6 h-6 rounded-full"
                                src={user.avatar?.url}
                                alt={user.name}
                              />
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex items-center justify-center">
                            <span
                              class={` ${
                                user.role === "admin"
                                  ? "bg-green-200 text-green-600"
                                  : "bg-purple-200 text-purple-600"
                              }  py-1 px-3 rounded-full text-xs`}
                            >
                              {user.role}
                            </span>
                          </div>
                        </td>

                        <td class="py-3 px-6 text-center">
                          <div class="flex item-center justify-center">
                            <div class="w-6 mr-2 transform hover:text-primary-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
