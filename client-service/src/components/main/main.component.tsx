import { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};
export const MainComponent = ({ children }: Props) => {
  return <main className='flex-grow container mx-auto p-4'>{children}</main>;
};
