'use client'

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
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
  const [searchText, setSearchText] = useState()
  const [posts, setPosts] = useState([])
  

  const handleSearchChange = async (e) => {     
    setSearchText(e.target.value);       
  }  

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  useEffect(() => {
    // fetch all prompts
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      // filter prompts by search input
      if(searchText){
        const postsByTag = data.filter((post) => post.tag.includes(searchText))
        const postsByCreator = data.filter((post) => post.creator.username.includes(searchText))

        setPosts(postsByCreator.concat(postsByTag))
        return posts
      }
      
      setPosts(data)
    }

    fetchPosts()
  }, [searchText])

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed