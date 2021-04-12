import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { Flex, Link, Themed, Text } from 'theme-ui';

import { socialMedias } from '../lib/socialMedias';

const Contact = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const twitter = socialMedias.find(({ name }) => name === 'Twitter')!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const email = socialMedias.find(({ name }) => name === 'Email')!;

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>

      <Themed.h1>Contact</Themed.h1>

      <Themed.p>
        If you&apos;d like to get in touch with me,{' '}
        <Link href={email.href} target="_blank" rel="noopener noreferrer">
          <Text as="span">email </Text>
          <FontAwesomeIcon icon={email.faIcon} />
        </Link>{' '}
        and{' '}
        <Link href={twitter.href} target="_blank" rel="noopener noreferrer">
          <Text as="span">Twitter </Text>
          <FontAwesomeIcon icon={twitter.faIcon} />
        </Link>{' '}
        are your best channels because I check them more frequently.
      </Themed.p>

      <Themed.p>
        You can find me at almost all social media by the username
        <strong> arantespp</strong>*. Some of them I just created to get the
        username and I don&apos;t use very often.
      </Themed.p>

      <Flex
        sx={{
          marginY: 4,
          flexDirection: ['row', 'column'],
          justifyContent: ['center'],
          flexWrap: 'wrap',
        }}
      >
        {socialMedias.map(({ href, faIcon, name }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ margin: 2 }}
            title={name}
          >
            <Text
              as="span"
              sx={{ color: 'primary', fontSize: [5, 3], marginX: 2 }}
            >
              <FontAwesomeIcon icon={faIcon} />
            </Text>
            <Text
              as="span"
              sx={{
                display: ['none', 'inline'],
                marginLeft: 1,
                overflowWrap: 'break-word',
              }}
            >
              {href}
            </Text>
          </Link>
        ))}
      </Flex>

      <Text sx={{ fontSize: 1, fontStyle: 'italic', color: 'gray' }}>
        * I know, it&apos;s very sad, but Instagram is the only social media
        that I don&apos;t have <strong>arantespp</strong> as username. Sometime
        ago I&apos;ve create the account with that username but I couldn&apos;t
        remember the password, the email or even if I&apos;ve deleted the
        account or not.
      </Text>
    </>
  );
};

export default Contact;
