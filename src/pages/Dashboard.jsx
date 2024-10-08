import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import Error from '@/components/Error';
import useFetch from '@/hooks/useFetch';
import { getUrls } from '@/db/apiUrls';
import { UrlState } from '@/context';
import { getClicksForUrls } from '@/db/apiClicks';
import LinkCard from '@/components/LinkCard';
import CreateLink from '@/components/create-link';

export default function Dashboard() {

  const [searchQuery, setSearchQuery] = useState('');

  const {user} = UrlState(); 
  const userId = user?.id; 

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, userId); 
  const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrls, urls?.map((url) => url.id) || []);

  useEffect(() => {
    if (userId) fnUrls(); 
  }, [userId]);


  useEffect(()=>{
    if (urls?.length) fnClicks();
  },[urls?.length]);

  const filteredUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  })


  return (
    <div className='flex flex-col gap-8 mt-2'>
      {
      loading || loadingClicks && <BarLoader width={"100%"} color='#36d7b7' />
      }
      <div className='grid grid-cols-2 gap-4'>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[21px] font-semibold'>{urls?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[21px] font-semibold'>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-extrabold'>My Links</h1>
       <CreateLink/>
      </div>

      <div className='relative'>
        <Input type='text' placeholder='Filter Links...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Filter className='absolute top-2 right-2 p-1' />
      </div>
     {error &&  <Error message={error?.message} />}
      {(filteredUrls || []).map((url,i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls}/>
      })}
    </div>
  )
}