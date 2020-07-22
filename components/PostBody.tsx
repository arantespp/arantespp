import * as React from 'react';

import { Box, Typography, TypographyVariant } from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import ReactMarkdown from 'react-markdown';

import type { PostAndPostsRecommendations } from '../lib/files';

type Post = NonNullable<PostAndPostsRecommendations['post']>;

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const renderers = {
  heading: ({ children, level }) => {
    return (
      <Typography
        component={`h${level}` as React.ElementType<any>}
        variant={`h${level}` as TypographyVariant}
      >
        {children}
      </Typography>
    );
  },
  link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { asPath, pathname } = useRouter();

    if (href.startsWith('.')) {
      const newPath = path.join(asPath, '..', href).replace(/\.md$/, '');
      return (
        <Link as={newPath} href={pathname} passHref>
          <Typography color="primary" component="a">
            {children}
          </Typography>
        </Link>
      );
    }

    return (
      <Typography
        color="primary"
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Typography>
    );
  },
  listItem: ({ children }) => {
    return (
      <Typography component="li" variant="body1">
        {children}
      </Typography>
    );
  },
  paragraph: ({ children }) => {
    return (
      <Typography component="p" variant="body1">
        {children}
      </Typography>
    );
  },
};

const PostBody = ({ title, content }: Post) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ReactMarkdown renderers={renderers} source={content} />
    </>
  );
};

export default PostBody;
