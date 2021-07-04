import * as React from 'react';

import { useKeypressSequenceListener } from './useKeypressSequenceListener';

export const useContentEditable = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [editable, setEditable] = React.useState(true);

  const toggleEditable = React.useCallback(() => {
    setEditable((e) => !e);
  }, []);

  /**
   * Toggle editable (te) when "te" sequence is pressed.
   */
  useKeypressSequenceListener('te', toggleEditable);

  React.useEffect(() => {
    if (ref && process.env.NODE_ENV === 'development') {
      ref.current?.setAttribute('contentEditable', JSON.stringify(editable));
      setTimeout(() => {
        ref.current?.focus();
      }, 50);
    }
  }, [editable, ref]);

  return ref;
};
