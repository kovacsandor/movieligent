import classnames from 'classnames';
import { useState } from 'react';

type Props = {
  readonly dark?: boolean;
  readonly initialValue?: string;
  readonly placeholder?: string;
  readonly onChange: (value: string) => void;
  readonly onEnter?: (value: string) => void;
};

export const TextInputComponent = ({ dark, initialValue = '', placeholder = '', onChange, onEnter }: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      onChange={(event) => {
        onChange(event.currentTarget.value);
        setValue(event.currentTarget.value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onEnter?.(value);
        }
      }}
      type='text'
      value={value}
      placeholder={placeholder}
      className={classnames('text-base px-2 py-1 w-full shadow font-light', {
        'bg-movieligent-dark-card': dark,
        'text-movieligent-dark-text-normal': dark,
        'bg-movieligent-header-background': !dark,
        'text-movieligent-light-text-normal': !dark,
      })}
    />
  );
};
