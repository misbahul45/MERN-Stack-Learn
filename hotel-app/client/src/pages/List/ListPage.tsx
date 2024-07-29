import React, { useEffect, useMemo, useState } from "react";
import FormSearch from "../../components/list/FormSearch";
import DisplayAllPosts from "../../components/list/DisplayAllPosts";
import { fetchGetAllPosts } from "../../util/post.fetch";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaArrowDown } from "react-icons/fa6";

interface Props {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  property?: string;
}

const ListPage: React.FC<Props> = ({ property, city, minPrice, maxPrice, type }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [getPost, setGetPosts] = useState(0);

  const locationText = useMemo(() => (city ? city : "any location"), [city]);

  useEffect(() => {
    let getNumPost=getPost
    if(city || property || minPrice || maxPrice || type!=='any'){
      getNumPost=0
    }
    const fetchPosts = async () => {
      try {
        const fetchedPosts:any = await fetchGetAllPosts({
          city,
          property,
          minPrice,
          maxPrice,
          type:type==="any"?undefined:type,
          get: getNumPost,
        });
        if(city || property || minPrice || maxPrice || type!=="any"){
         setPosts(fetchedPosts)
         setGetPosts(0)
        }
        if (fetchedPosts) {
          setPosts((prevPosts) => {
            const uniquePosts = new Map<string, Post>();
            [...prevPosts, ...fetchedPosts].forEach((post) => uniquePosts.set(post.id, post));
            return Array.from(uniquePosts.values());
          });
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [city, property, minPrice, maxPrice, type, getPost]);


  return (
    <div className="w-full max-w-[60%] h-full flex flex-col justify-center items-center py-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 via-blue-600 to-cyan-300 mb-4">
        Get Search Results For{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 animate-text">
          {locationText}
        </span>
      </h1>
      <FormSearch
        city={city || ""}
        property={property}
        minPrice={minPrice?.toString() || ""}
        maxPrice={maxPrice?.toString() || ""}
        type={type || ""}
      />
      {posts.length === 0 ? (
        <div className="mt-12 w-full h-32 rounded bg-white/5 backdrop-blur-sm border-2 border-slate-700 grid place-items-center shadow-xl shadow-slate-800 animate-pulse">
          <div className="flex items-center gap-4">
            <TfiAnnouncement className="text-5xl text-yellow-600" />
            <span className="text-slate-200 font-semibold text-xl">No posts found</span>
          </div>
        </div>
      ) : (
        <DisplayAllPosts posts={posts} />
      )}
      {(posts.length % 5 ===0) &&(
        <button onClick={()=>setGetPosts(prev=>prev+1)} className="mt-4 flex gap-2 items-center font-bold text-slate-100 hover:text-blue-700 transition-all duration-100"><span>Load More</span> <FaArrowDown className="h-full animate-pulse text-violet-700" /></button>
      )}
    </div>
  );
};

export default ListPage;
