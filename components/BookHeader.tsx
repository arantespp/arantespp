import { Box, Flex, Image, Text } from 'theme-ui';

import type { Book } from '../lib/files';

import CustomImage from './CustomImage';

const BookHeader = ({ authors, image, link, ASIN, ISBN }: Book) => {
  if (!image) {
    return null;
  }

  const alt = [
    `By <strong>${authors.join(', ')}</strong>`,
    ASIN && `ASIN: ${ASIN}`,
    ISBN && `ISBN: ${ISBN}`,
    `<a href=${link}>Read more about the book here</a>`,
  ]
    .filter((line) => !!line)
    .join('. ');

  return <CustomImage src={image} alt={alt} />;
};

export default BookHeader;
