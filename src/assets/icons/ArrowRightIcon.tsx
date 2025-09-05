import { type JSX } from 'react';

type ArrowRightIconProps = {
  className?: string;
};

export default function ArrowRightIcon({
  className,
}: ArrowRightIconProps): JSX.Element {
  return (
    <svg
      viewBox='0 0 57 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M42.43 24.511c-.758.826-1.517.55-1.241-.412.483-1.376 1.241-2.752 2.069-3.99 2.62-4.196-4.414-6.122-21.517-6.053H1.535c-1.38 0-2.621-3.165 0-3.165h19.93c17.103 0 25.103-1.582 22.62-4.815-1.034-1.513-2.068-3.095-2.827-4.746-.759-1.513.138-1.788 1.38-.55 4.068 4.196 8.689 8.598 13.585 11.075 1.035.481.966.825.207 1.238-4.965 2.545-9.586 6.878-14 11.418'
        fill='currentColor'
      />
    </svg>
  );
}
