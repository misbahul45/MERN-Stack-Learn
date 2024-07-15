import { Link, Outlet } from '@tanstack/react-router';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts')({
  component: Posts,
  loader: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
  }
});


interface Data {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const { id } : { id:string }= Route.useParams();
  const data: Data[] = Route.useLoaderData();

  return (
    <main>
      {id ? (
        <Outlet />
      ) : (
        <>
          <h1>Posts</h1>
          <ul>
            {data?.map(item => (
              <li key={item.id}>
                <Link to={`/posts/${item.id}`} params={{ id: String(item.id) }}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default Posts;
