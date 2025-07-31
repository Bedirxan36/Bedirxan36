
import React from 'react';

export const AppLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 8.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0V9a.5.5 0 01.5-.5z" />
        <path d="M10.732 6.012A3.5 3.5 0 0112 5.5a3.5 3.5 0 011.268.512.5.5 0 00.464-.884A4.5 4.5 0 0012 4.5a4.5 4.5 0 00-1.732.328.5.5 0 10.464.884z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.5 12a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" clipRule="evenodd" />
        <path d="M12 12.5a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
);
