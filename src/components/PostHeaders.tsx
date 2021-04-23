import Head from 'next/head';

import type { Post } from '../lib/files';

const PostHeaders = ({ post }: { post: Post }) => {
  const { excerpt, image, href, title, group, book } = post;

  const imageContent = (() => {
    if (group === 'zettelkasten') {
      return '/images/david-travis-5bYxXawHOQg-unsplash.jpg';
    }

    if (image) {
      return image.url;
    }

    if (book?.image) {
      return book.image;
    }

    return '';
  })();

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" key="og:type" content="website" />
      <meta
        key="og:url"
        property="og:url"
        content={`https://arantespp.com${href}`}
      />
      <meta name="Description" content={excerpt} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={excerpt} />
      <meta key="og:image" property="og:image" content={imageContent} />
      <meta key="twitter:image" name="twitter:image" content={imageContent} />
    </Head>
  );
};

export default PostHeaders;
