
import React from 'react';

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M14.25 4.5A.75.75 0 0115 5.25v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zm-6 0A.75.75 0 019 5.25v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zm-3.75.75a.75.75 0 000 1.5h.75V18h-.75a.75.75 0 000 1.5h.75A2.25 2.25 0 007.5 18V6A2.25 2.25 0 005.25 3.75H4.5a.75.75 0 00-.75.75zm15.75.75a.75.75 0 00-.75-.75h-.75A2.25 2.25 0 0016.5 6v12a2.25 2.25 0 002.25 2.25h.75a.75.75 0 000-1.5h-.75V6h.75a.75.75 0 00.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default CodeIcon;
    