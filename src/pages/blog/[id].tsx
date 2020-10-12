import React from 'react';
import { useRouter } from 'next/router';
import { withTranslation } from '../../i18n';
import { NextPageContext } from 'next';
import { NextPageProps } from '../../types/NextPageProps';
import { Post } from '../../types/Post';

interface Props extends NextPageProps {
    post: Post;
}

const PostPage = ({ post }: Props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <p>Post: {id}</p>
            <p>{post.title}</p>
        </div>
    );
};

// This function gets called at build time
export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/posts/ids`);
    const postsIds = await res.json();

    return {
        paths: postsIds.map((pid: string) => ({
            params: { id: pid },
        })),
        fallback: false,
    };
}

interface Context extends NextPageContext {
    params: {
        id: string;
    };
}

// This function gets called at build time
export async function getStaticProps(context: Context) {
    const res = await fetch(`http://localhost:3000/api/posts/${context.params.id}`);
    const post = await res.json();

    return {
        props: {
            post,
        },
    };
}

export default withTranslation('common')(PostPage as any);
