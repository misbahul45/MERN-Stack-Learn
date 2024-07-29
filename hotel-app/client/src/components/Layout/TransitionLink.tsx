import { useNavigate } from '@tanstack/react-router';
import React from 'react';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;   
  params?:string
}

const sleep = (ms: number = 1000) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, params ,...props }) => {
  const navigate = useNavigate();

  const handleTransition = async () => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('page-transition');
      await sleep(500);
      navigate({ to: href, replace: true, params:{ id:params } });
      await sleep(500);
      body.classList.remove('page-transition');
    }
  };

  return (
    <button {...props} onClick={handleTransition}>
      {children}
    </button>
  );
};

export default TransitionLink;
