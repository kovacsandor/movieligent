export const LogoComponent = () => {
  return (
    <div className='flex gap-2'>
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 201 222'>
        <g>
          <path
            className='fill-movieligent-logo-light'
            d='M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64   c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z'
          />
          <path
            d='M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01   h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z'
            className='fill-movieligent-logo-dark'
          />
          <g>
            <path
              d='M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66    C107.95,219.89,142.75,12.83,142.75,12.83z'
              className='fill-movieligent-logo-normal'
            />
          </g>
        </g>
      </svg>
      <span className='text-movieligent-light-text-heading text-base text-[1.25rem]'>
        {process.env.REACT_APP_TITLE}
      </span>
    </div>
  );
};
