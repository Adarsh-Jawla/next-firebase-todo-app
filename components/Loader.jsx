import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <>
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
        <Image src="./loader.svg" alt='Loading' width={100} height={100}/>
    </div>
    </>
  )
}

export default Loader;