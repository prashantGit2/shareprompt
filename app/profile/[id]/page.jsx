"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Profile from "@components/Profile";

const ViewProfile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const params = useParams();
  
  const fetchPrompts = async () => {
    const response = await fetch(`/api/users/${params.id}/prompts`);
    const data = await response.json();
    setPosts(data);
  };
  const fetchUserDetails = async () => {
    const response = await fetch(`/api/users/${params.id}`);
    const data = await response.json();
    setUser(data);
    };


  useEffect(() => {
    fetchUserDetails()
    fetchPrompts();
  }, []);

  return (
    <Profile
      name={user.username}
      desc={"lorem32 dfaodsfjaod aosdf "}
      data={posts}
    />
  );
};

export default ViewProfile;
