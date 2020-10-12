import React from 'react';
import { Wrapper } from './Post.style';
import { Post } from '../../types/Post';
import { Link } from '../../i18n';

interface Props {
    post: Post;
}

export default function Example({ post }: Props) {
    return (
        <Wrapper>
            <Link href={`/blog/${post.id}`} passHref={true}>
                <a>
                    <h1>{post.title}</h1>
                </a>
            </Link>
            <p>{post.description}</p>
            <p>{post.category}</p>
        </Wrapper>
    );
}
