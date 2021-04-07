import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Link, Themed } from 'theme-ui';

import NetworkLink from '../../components/NetworkLink';
import Recommendations from '../../components/Recommendations';
import Tag from '../../components/Tag';

import { getAllTags, getRecommendations } from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllTags().map((tag) => ({
    params: { tag },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { tag },
}: {
  params: { tag: string };
}) => {
  const recommendations = getRecommendations({ tags: [tag] });
  return {
    props: { tag, recommendations },
  };
};

const TagsIndex = ({
  recommendations,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>#{tag}</title>
    </Head>
    <Themed.h1>#{tag}</Themed.h1>
    <Themed.p>
      Recommended posts related to the tag <Tag tag={tag} /> are shown below.{' '}
      <NetworkLink nodeId={tag} />
    </Themed.p>
    <Box sx={{ marginBottom: 4 }}>
      <NextLink href="/tags" passHref>
        <Link>See all tags</Link>
      </NextLink>
    </Box>
    <Recommendations recommendations={recommendations} />
  </>
);

export default TagsIndex;
