import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, Outlet } from '@remix-run/react';

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};

export default function PostsAdmin() {
    const { posts } = useLoaderData() as LoaderData;
    console.log(posts);
    
    return (
        <div className='mx-auto max-w-4xl'>
            <h1 className='my-6 mb-2 border-b-2 text-center text-3xl'> Blog Admin</h1>
            <div className='grid gid-cols-4 gap-6'>
                <nav className='col-span-4 md:col-span-1'>
                    <ul>
                        {
                            posts.map(({ slug, title }) => (
                                <li key={slug}>
                                    <Link className='text-blue-600 underline' to={slug}>
                                     {title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <main className='col-span-4 md:col-span-3'>
                    <Outlet/>
                </main>
            </div>
            
        </div>
    )
    
};
