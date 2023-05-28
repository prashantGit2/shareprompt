"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { toast } from "react-toastify";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      prompt: post.prompt,
      userId: session?.user.id,
      tag: post.tag,
    };
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        router.push("/");
        toast.success("Prompt created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
