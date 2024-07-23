import Post from "./Post"

interface Props{
  posts?:Post[],
  isLoading?:boolean
}
const DisplayAllPosts = ({ posts, isLoading }:Props) => {
 if(posts?.length===0 && !isLoading){
    return <div className="mt-12 text-5xl font-semibold text-transparent animate-text bg-clip-text bg-gradient-to-l from-cyan-500 via-blue-600 to-cyan-300">No Posts</div>
  }
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      {posts?.map((post)=>(
          <Post key={post.id} {...post} isLoading={isLoading} />
        ))  
      }
    </div>
  )
}

export default DisplayAllPosts