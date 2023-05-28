"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { toast } from "react-toastify";

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    };
    if (promptId) fetchPrompt();
  }, []);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt Id is not")
    }
    const body = {
      prompt: post.prompt,
      tag: post.tag,
    };
    console.log({body})
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success("Prompt updated successfully");
        router.push("/");
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
