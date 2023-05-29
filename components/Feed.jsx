"use client";

import {useState,useEffect} from "react"
import PromptCard from "./PromptCard";
import useSWR from 'swr';
 
const fetcher = (...args) => fetch(...args).then((res) => res.json());
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
  const { data:posts, error } = useSWR('/api/prompt/getAllPrompts', fetcher);
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  }
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
// export async function getStaticProps({}){
//   const response = await fetch("/api/prompt/getAllPrompts");
//   console.log("this ran")
//   const data = await response.json();
//   return {
//     props: {
//       posts: data
//     },
//     revalidate: 1,
//   }
// }

export default Feed