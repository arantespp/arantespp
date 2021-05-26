import * as React from 'react';
import { Flex } from 'theme-ui';

/**
 * https://usehooks.com/useScript/
 */
const useScript = (src: string) => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = React.useState(src ? 'loading' : 'idle');

  React.useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus('idle');
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${src}"]`,
      );
      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          if (script) {
            script.setAttribute(
              'data-status',
              event.type === 'load' ? 'ready' : 'error',
            );
          }
        };
        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status') || '');
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };
      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
      // Remove event listeners on cleanup

      // eslint-disable-next-line consistent-return
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );
  return status;
};

const tweetIdentifier = 'Tweet: ';

const Tweet = ({ children }: { children: React.ReactNode[] }) => {
  const status = useScript('https://platform.twitter.com/widgets.js');

  if (status !== 'ready') {
    return null;
  }

  return (
    <Flex
      sx={{ justifyContent: 'center', marginBottom: 3 }}
      dangerouslySetInnerHTML={{
        __html: children.join('').replace(tweetIdentifier, ''),
      }}
    />
  );
};

Tweet.isTweet = (children: React.ReactNode) =>
  Array.isArray(children) && children.join('').startsWith(tweetIdentifier);

export default Tweet;
