import Image from 'next/image'
import { useState, useEffect } from 'react'

const searchDog = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const res = await response.json();
  return res;
}

export default function dogImage() {
  const [dogImage, setDogImage] = useState();

  useEffect(() => {
    (async () => {
      const res = await searchDog();
      setDogImage(res.message);
      console.log(res)
    }) ()
  }, []);


  const handleClick = async () => {
    const res = await searchDog();
    setDogImage(res.message);
  }

  return(
    <>
      <div className='text-center'>
        <h1 className='font-bold'>犬！</h1>
        <div className='flex justify-center'>
          <Image 
            src={dogImage}
            width={200}
            height={200}
            alt='犬'
          />
        </div>
        <button className='bg-blue-500 hover:bg-blue-400 text-white rounded px-4 py-2' onClick={handleClick}>画像を検索</button>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await searchDog();
  console.log(res);
  return {
    props: {
      initialDogImageUrl: res.message
    }
  };
};