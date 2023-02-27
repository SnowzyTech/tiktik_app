import React, { useState} from 'react'
import axios from 'axios'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import Image from 'next/image'
import { BASE_URL } from '@/utils'
import VideoCard from '@/components/VideoCard'
import { IUser, Video } from '@/types'
import { useRouter } from 'next/router'
import useAuthStore from '@/store/authStore'
import NoResults from '@/components/NoResults'

const Search = ({ videos}: { videos: Video[] }) => {

     const [isAccounts, setIsAccounts] = useState(false)
     const router = useRouter();
     const  { allUsers} = useAuthStore()
     const { searchTerm }: any = router.query;


    const accounts = isAccounts ? "border-b-2 border-black" : 'text-gray-400'
    const isVideos = !isAccounts ? "border-b-2 border-black" : 'text-gray-400'
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200 bg-white w-full sm:w-[94%]'>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
           onClick={() => setIsAccounts(true)}>Accounts</p>
           <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
           onClick={() => setIsAccounts(false)}>Videos</p>
        </div>
        { isAccounts ? (
            <div className='md:mt-16'>
                {searchedAccounts.length > 0 ? (
                    searchedAccounts.map((user: IUser, idx: number) => (
                     <Link href={`/profile/${user._id}`} key={idx}>
                            <div className='flex pa-2 coursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                            <div>
                                <Image src={user.image} className="rounded-full" 
                                alt='user profile'
                                width={50}
                                height={50} 

                                />
                            </div>
                            <div className='hidden xl:block'>
                                <p className='flex gap-1 items-center text-md
                                font-bold text-primary lowercase'>{user.userName.replaceAll(' ', '')}
                                <GoVerified className='text-blue-400' />
                                </p>
                                <p className='capitalize text-gray-400 text-sm'>
                                {user.userName}
                                </p>
                            
                            </div>
                            </div>
                       </Link>
                    ))
                ) : <NoResults text={`No video results for ${searchTerm}`}/>}
            </div>
        ) : (
            <div className='md:mt-16 flex flx-wrap gap-6 md:justify-start'>
                { videos.length ? (
                    videos.map((video: Video, idx) => (
                        <VideoCard post={video} key={idx}/>
                    ))
                ) : <NoResults text={`No video results for ${searchTerm}`}/>}
            </div>
        )}
    </div>
  )
}



export const getServerSideProps = async ({
    params: { searchTerm }
  } : {
    params: {searchTerm: string}
  }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
  
    return {
      props: { videos: res.data}
    }
  }

export default Search;
