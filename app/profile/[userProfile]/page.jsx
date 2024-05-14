'use client'

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {
  const { userProfile } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${userProfile}/posts`);
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      fetchPosts();
    }
  }, [userProfile, fetchPosts]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const username = posts[0]?.creator.username || 'User';

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} personalized profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
