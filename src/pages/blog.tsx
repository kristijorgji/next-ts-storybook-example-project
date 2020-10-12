import React from 'react';
import Head from 'next/head';
import { withTranslation } from '../i18n';
import { NextPageProps } from '../types/NextPageProps';
import { Post as PostType } from '../types/Post';
import Post from '../components/Post/Post';
import styles from '../styles/Blog.module.scss';
import { GetStaticPropsResult } from 'next';

interface Props extends NextPageProps {
    posts: PostType[];
}

const Blog = ({ t, posts }: Props) => {
    return (
        <>
            <Head>
                <title>Blog Demo</title>
            </Head>
            <main>
                <div className={styles.blog}>
                    {posts.map((p, i) => (
                        <Post key={i} post={p} />
                    ))}
                </div>
            </main>
        </>
    );
};

// This function gets called at build time
export async function getStaticProps(): Promise<GetStaticPropsResult<{ posts: PostType[] }>> {
    const res = await fetch('http://localhost:3000/api/posts');
    const posts = await res.json();

    return {
        props: {
            posts,
        },
    };
}

export default withTranslation('common')(Blog as any);
