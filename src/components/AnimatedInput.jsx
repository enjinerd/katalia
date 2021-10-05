import React from 'react';
import { useState, useEffect } from 'react';

export const AnimatedInput = ({
  placeholder: passedPlaceholder = '',
  ...passedProps
}) => {
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intr = setInterval(() => {
      setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
      if (placeholderIndex + 1 > passedPlaceholder.length) {
        setPlaceholderIndex(0);
      } else {
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, 190);
    return () => {
      clearInterval(intr);
    };
  });

  return (
    <input
      {...passedProps}
      placeholder={placeholder}
      className='text-center border-gray-200 font-secondary text-lg md:text-xl'
      type='url'
    />
  );
};
