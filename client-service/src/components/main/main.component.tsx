import { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};
export const MainComponent = ({ children }: Props) => {
  return <main className='flex-col-reverse md:flex-row flex grow'>{children}</main>;
};
