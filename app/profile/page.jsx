"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data:session } = useSession();
  const router = useRouter();

  const handleEdit = (post) => {
    router.push("/update-prompt?id=" + post._id)
  };
  const handleDelete = async (post) => {
    const confirmDelete = confirm("Are you sure you want to delete this prompt?");
    if (confirmDelete) {

    try {
        const resp = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        if (resp.ok) {
          toast.success("Prompt deleted successfully");
        const newPosts = posts.filter((p) => p._id !== post._id);
        setPosts(newPosts)
        }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }

    
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, [session]);

  return (
    <Profile
      name={"My"}
      desc={"lorem32 dfaodsfjaod aosdf "}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
