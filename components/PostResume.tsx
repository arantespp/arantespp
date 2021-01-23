import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Box, Flex, Link, Message, Text } from 'theme-ui';

import type { Recommendation } from '../lib/files';

import Tag from './Tag';

const PostResume = ({
  excerpt,
  group,
  formattedDate,
  tags,
  href,
}: Recommendation) => {
  return (
    <Box
      sx={{
        color: 'gray',
        paddingBottom: 2,
      }}
    >
      <NextLink as={href} href="/[group]/[slug]" passHref>
        <Message variant="quote" sx={{ cursor: 'pointer' }}>
          {excerpt}
        </Message>
      </NextLink>
      <Flex sx={{ flexWrap: 'wrap', marginTop: 1 }}>
        {tags.map((tag) => (
          <Box key={tag} sx={{ paddingRight: 3 }}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
      <Text sx={{ fontSize: 1 }}>
        <NextLink href={`/${group}`} passHref>
          <Link sx={{ fontSize: 1, paddingRight: 1 }}>
            {pascalCase(group)},
          </Link>
        </NextLink>
        <Text as="span" sx={{ color: 'gray' }}>
          {formattedDate}
        </Text>
      </Text>
    </Box>
  );
};

export default PostResume;
