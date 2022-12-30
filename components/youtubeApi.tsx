import { useState } from 'react'

const searchChannels = async (_id: string) => {
  const res1 = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=" +
      "snippet" +
      "&id=" +
      _id +
      "&key=" +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  );
  const data1 = await res1.json();
  return data1.items[0].snippet.title
}

export default function youtubeApiResult() {
  const [result, setResult] = useState();
  const [id, setId ] = useState("");

  const handleClick = async () => {
    const res = await searchChannels(id);
    setResult(res);
  }

  return(
    <>
      <div className='text-center  mt-5'>
        <h1 className='font-bold'>Youtube API!</h1>
        <div>
          <label>チャンネルID </label>
          <input
            type='text'
            className='rounded appearance-none border border-gray-300 w-1/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            placeholder="チャンネルID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button className='bg-green-500 hover:bg-green-400 text-white rounded px-4 py-2 mt-3' onClick={handleClick}>検索!</button>
        <div>
          チャンネル名: { result }
        </div>
      </div>
    </>
  )
}
