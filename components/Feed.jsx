"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = ({serverdata}) => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };
  
  useEffect(() => {
    fetch("/api/prompt/getAllPrompts",{ cache: 'no-store' }).then((response) => response.json()).then((data) => setPosts(data));
  }, [])
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username prompts"
          value={searchText}
          onChange={handleChangeSearch}
          className="search_input peer"
        />
      </form>
      <div className="mt-16 prompt_layout">
        {posts?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={(tag) => console.log(tag)}
          />
        ))}
      </div>
    </section>
  );
};
export async function getServerSideProps({}) {
  const response = await fetch("/api/prompt/getAllPrompts");
  console.log("this ran");
  const data = await response.json();
  return {
    props: {
      serverdata: data,
    },
    revalidate: 1,
  };
}

export default Feed;
