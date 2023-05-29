"use client";

import {useState,useEffect} from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map(post => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />

      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState("");
  const [posts,setPosts] = useState([]);
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await getServerSideProps();
      setPosts(resp);
    }
    fetchPosts();
  }, [])
  

  return (
    <section className="feed">
      <form 
       className="relative w-full flex-center"
      >
        <input 
        type="text"
        placeholder="Search for a tag or a username prompts"
        value={searchText}
        onChange={handleChangeSearch}
        className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag) => console.log(tag)}
      />
    </section>
  )
}
export const getServerSideProps = async () => {
  const response = await fetch("/api/prompt/getAllPrompts");
  const data = await response.json();
  return data;
}

export default Feed