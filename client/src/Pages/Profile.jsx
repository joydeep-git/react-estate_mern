import React, { useEffect, useState } from "react";

import { FaEyeSlash, FaPen } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import { CircularProgressBar } from "react-percentage-bar";

import { useSelector, useDispatch } from "react-redux";

import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signInStart, signInFailure, signOutSuccess } from "../redux/user/userSlice.js";

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { app } from "../Firebase.js";

const Profile = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector(state => state.user);

  const [userData, setUserData] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(undefined);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);

  const handleFile = (img) => {

    const storage = getStorage(app);

    const imgName = new Date().getTime() + img.name;

    const storageRef = ref(storage, imgName);

    const uploadImg = uploadBytesResumable(storageRef, img);

    uploadImg.on("state_changed", (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setUploadPerc(Math.round(progress));
    },
      (err) => {
        alert(err);
      },
      () => {
        getDownloadURL(uploadImg.snapshot.ref).then(
          (downloadUrl) => {
            setUserData({
              ...userData,
              avatar: downloadUrl
            })
          }
        )
      }
    )
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateStatus(true);
      }

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

    setUserData({
      ...userData,
      password: ''
    });
  };

  const handleDeleteAccount = async () => {
    const ans = confirm("WANT TO DELETE THE ACCOUNT?");

    if (ans) {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        alert("USER DELETED");
      }
    }
  };

  const handleSignOut = async () => {

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signout");

      const data = await res.json();

      if (data.status === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signOutSuccess());
      }

    } catch (err) {
      alert(err);
    }
  };

  const handleShowListings = async () => {

    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);

      const data = await res.json();

      if (data.success === false) {
        alert("Please Sign Out and Sign-in again");
        return;
      }

      setUserListings(data);

    } catch (err) {
      alert(err.message);
    }

    setShowList(!showList);
  };

  useEffect(() => {
    setTimeout(() => {
      setUpdateStatus(false);
    }, 2500);
  }, [updateStatus]);

  const navigation = (link) => {
    navigate(link)
  };

  const deleteListing = async (id) => {

    const res = confirm("WANT TO DELETE THIS PROPERTY? ")

    if (res) {
      try {
        const res = await fetch(`/api/listing/delete/${id}`, {
          method: "DELETE"
        });

        const data = await res.json();

        if (data.success === false) {
          alert(data.message);
          return;
        }

        const newListings = userListings.filter((item) => item._id !== id);

        setUserListings(newListings);

      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between my-6 p-3 ">

      <h1 className="uppercase text-2xl font-bold m-5">profile</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 items-center bg-slate-100 p-6 rounded-md max-w-md w-full'>

        <div
          className="relative flex items-center justify-center m-auto w-44 h-44 rounded-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            uploadPerc === 0 || uploadPerc === 100
              ? <img
                className={`rounded-full w-full h-full transition-all ${isHovered ? "filter grayscale(80%)" : ""
                  }`}
                src={userData.avatar || currentUser.avatar}
                alt="Image"
              />
              : <CircularProgressBar
                animation={true}
                roundLineCap={true}
                percentage={uploadPerc}
                text={'Uploading'}
                percentageAnimation={true} />
          }

          {isHovered && (
            <label
              title="Change Image"
              htmlFor="file"
              className=" absolute flex item-center justify-center bg-gray-100 opacity-50 text-xl rounded-md [clip-path: circle] cursor-pointer w-full h-full rounded-full"
            >
              <FaPen className="flex self-center" />
            </label>
          )}

          <input
            type="file"
            name="file"
            id="file"
            className="absolute hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
        </div>

        {
          error
            ? <p className="text-red-600">{error}</p>
            : <p>UPLOAD IMAGES UPTO 2 MB and Click UPDATE</p>
        }

        {
          updateStatus ? <p className="text-green-500 text-xl uppercase">User updated successfully!</p> : null
        }

        <input
          type="text"
          name="username"
          id="username"
          placeholder='Username '
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder='Email'
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <div className="border border-slate-500 rounded-md w-full focus:outline-none flex flex-row gap-0 items-center pr-3">

          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            placeholder='Password'
            className='border-none p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
            onChange={handleChange}
            value={userData?.password}
          />

          {
            userData?.password
              ? showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} className="cursor-pointer text-2xl" />
                : <IoEyeOutline onClick={() => setShowPassword(true)} className="cursor-pointer text-2xl" />
              : null
          }

        </div>

        <button
          disabled={loading}
          type="submit"
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full uppercase'>
          {loading ? "Loading..." : "update"}
        </button>

        <button
          type="button"
          onClick={() => navigation('/create-listing')}
          className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full uppercase'>
          create listing
        </button>

        <div className="flex flex-row list-none justify-between w-full uppercase font-semibold">

          <li
            onClick={handleDeleteAccount}
            className="text-red-600 cursor-pointer hover:text-red-400">Delete Account</li>

          <li
            onClick={handleSignOut}
            className="text-blue-600 cursor-pointer hover:text-blue-400">Sign Out</li>

        </div>

        <button
          onClick={handleShowListings}
          type="button"
          className="text-black uppercase text-lg p-1 border border-slate-500 rounded-lg hover:border-slate-800 hover:text-blue-500 ">{showList ? "Hide Listed Properties" : "Show Listed Properties"}</button>
      </form >

      {
        showList
          ? userListings.length > 0
            ? userListings.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-row w-full sm:w-[30rem] bg-slate-100 border border-slate-600 rounded-lg m-2 p-1 sm:p-2 self-center items-center justify-between ">

                  <img
                    onClick={() => navigation(`/listing/${item._id}`)}
                    src={item.imageUrls[0]} alt="Property Image"
                    className="w-16 sm:w-2/12 rounded-lg cursor-pointer hover:border-2 border-black" />

                  <p
                    onClick={() => navigation(`/listing/${item._id}`)}
                    className="text-base sm:text-lg text-left m-0 p-0 hover:underline cursor-pointer uppercase">{item.name}</p>

                  <div className="flex flex-col items-center h-full justify-between gap-4 ">
                    <p
                      onClick={() => navigation(`/update-listing/${item._id}`)}
                      className="text-blue-600 cursor-pointer font-semibold hover:opacity-50 text-sm sm:text-base">EDIT</p>
                    <p onClick={() => deleteListing(item._id)}
                      className="text-red-600 cursor-pointer font-semibold hover:opacity-50 text-sm sm:text-base">DELETE</p>
                  </div>
                </div>
              )
            })
            : <p className="uppercase text-red-500">Add Properties to see here</p>
          : null
      }

    </div >
  );
};

export default Profile;