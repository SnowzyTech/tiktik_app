import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils';

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({data }: IProps) => {

  const { user, userVideos, userLikedVideos} = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([])

  const videos = showUserVideos ? "border-b-2 border-black" : 'text-gray-400'
  const liked = !showUserVideos ? "border-b-2 border-black" : 'text-gray-400'

  useEffect(() => {
    if(showUserVideos) {
       setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])
  

  return (
    <div className='relative right-2 lg:w-full w-full  flex flex-col overflow-x-hidden'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
      <div className='w-16 h-16 md:w-32 md:h-32'>  
                <Image src={user.image} className="rounded" 
                alt='user profile' width={120} height={120} layout="responsive" 
                />
            </div>

            <div className='flex flex-col justify-center pr-80'>
              <p className='md:text-2xl 
                tracking-wider flex gap-1 
                items-center justify-center text-sm 
                font-bold text-primary lowercase'>
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className='text-blue-400' />
              </p>
              <p className='capitalize text-gray-400 text-sm md:text-xl'>
                {user.userName}
              </p>
             
            </div>
      </div>

      <div>
        <div className='flex pl-4 gap-5 md:gap-10 lg:gap-10 mb-10 border-b-2 border-gray-200 bg-white w-full sm:w-[94%]'>
          <p className={`text-sm md:text-xl font-semibold cursor-pointer mt-2 ${videos}`}
           onClick={() => setShowUserVideos(true)}>Videos</p>
           <p className={`text-md md:text-xl font-semibold cursor-pointer mt-2 ${liked}`}
           onClick={() => setShowUserVideos(false)}>Likes</p>
        </div>

        <div className='flex w-10 gap-6 relative left-1 flex-wrap md:justify-start justify-start'>
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
               <VideoCard  post={post} key={idx}/>
            ))
          ): <NoResults text={`No ${showUserVideos ? '' :'Liked'} Videos Yet`}/>}
        </div>
      </div>
    </div>
  )
}



export const getServerSideProps = async ({
  params: { id }
} : {
  params: {id: string}
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data}
  }
}
export default Profile;
