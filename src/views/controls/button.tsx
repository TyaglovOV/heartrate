import type { ReactNode } from 'react';

export const Button = ({ bg, onClick, children,  disabled }: { onClick: () => void, children: ReactNode, disabled: boolean, bg: string }) => {
  return <button onClick={onClick}
                 disabled={disabled}
                 className={`${bg}-700 hover:${bg}-500 text-white font-bold py-2 px-4 rounded cursor-pointer m-2`}>
    {children}
  </button>
}
