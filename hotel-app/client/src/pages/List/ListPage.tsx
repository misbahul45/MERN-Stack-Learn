/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useEffect, useMemo, useState } from "react";
import FormSearch from "../../components/list/FormSearch";
import DisplayAllPosts from "../../components/list/DisplayAllPosts";
import { fetchGetAllPosts } from "../../util/post.fetch";




interface Props {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  property?: string;
}

const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const ListPage: React.FC<Props> = ({ property, city, minPrice, maxPrice, type }: Props) => {
  const [posts, setPosts] =useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const locationText = useMemo(() => {
    if (city) {
      return city;
    }
    return "any location";
  }, [city]);


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts:any = await fetchGetAllPosts({ city, property, minPrice, maxPrice, type });
      if(fetchedPosts !== undefined){
        setPosts(fetchedPosts)
      }
      await sleep(1000);
      setIsLoading(false);
    };
    fetchPosts();
  }, [city, property, minPrice, maxPrice, type]);


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
      <DisplayAllPosts posts={posts} isLoading={isLoading} />
    </div>
  );
};

export default ListPage;
