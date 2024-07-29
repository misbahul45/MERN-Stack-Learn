import Post from "./Post"

interface Props{
  posts?:Post[],
}
const DisplayAllPosts = ({ posts }:Props) => {
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      {posts?.map((post)=>(
          <Post key={post.id} {...post} />
        ))  
      }
    </div>
  )
}

export default DisplayAllPosts