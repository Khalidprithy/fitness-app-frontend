import { Jodit } from 'jodit-react';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const TextEditor = forwardRef<
  Jodit,
  { value: string; onChange: (value: string) => void }
>((props, ref) => (
  <JoditEditor {...(props as object)} ref={ref} value={props.value} />
));
TextEditor.displayName = 'TextEditor';

export default TextEditor;
