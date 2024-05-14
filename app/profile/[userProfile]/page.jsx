'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

import Profile from "@/components/Profile"

const userProfile = () => {
  const params = useParams()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.userProfile}/posts`)
      const data = await res.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  console.log(posts[0]?.creator.username);
  return (
    <Profile 
      name={posts[0]?.creator.username}
      desc={`Welcome to ${posts[0]?.creator.username} personalized profile page`}
      data={posts}      
    />
  )
}

export default userProfile