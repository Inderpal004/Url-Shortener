import DeviceInfo from '@/components/DeviceInfo';
import Location from '@/components/Location';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UrlState } from '@/context';
import { getClicksForUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/useFetch';
import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners';

export default function Link() {

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id });

  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) navigate('/dashboard');

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      )}
      <div className='flex mt-5 flex-col gap-8 sm:flex-row justify-between'>
        <div className='flex flex-col items-start gap-4 rounded-lg sm:w-2/5'>
          <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
          <a className='text-xl sm:text-3xl text-blue-400 font-bold hover:underline cursor-pointer' target='_blank' href={`${import.meta.env.VITE_WEB_URL}/${link}`}>{import.meta.env.VITE_WEB_URL}/{link}</a>
          <a className='flex items-center gap-1 hover:underline cursor-pointer' target='_blank' href={url?.original_url}>
            <LinkIcon className='p-1' />
            {url?.original_url}</a>
          <span className='flex items-end font-extralight text-sm'>{new Date(url?.created_at).toLocaleString()}</span>

          <div className='flex gap-2'>
            <Button variant='ghost' onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_WEB_URL}/${url?.short_url}`)}><Copy size={18} /></Button>
            <Button variant='ghost' onClick={downloadImage}><Download size={18} /></Button>
            <Button variant='ghost' onClick={() => fnDelete()}>{loadingDelete ? <BeatLoader size={5} color='white' /> : <Trash size={18} />}</Button>
          </div>
          <img src={url?.qr} alt='qr code' className='w-[75%] self-center sm:self-start ring ring-blue-400 p-1 object-contain' />
        </div>

        <Card className='sm:w-3/5'>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {
            stats && stats?.length ? (
              <CardContent className="flex flex-col gap-6">
                <Card >
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-[21px] font-semibold'>{stats?.length}</p>
                  </CardContent>
                </Card>

              <CardTitle className="mt-3">Location Data</CardTitle>
              <Location stats={stats}/>
              <CardTitle className="mt-3">Device Info</CardTitle>
              <DeviceInfo stats={stats}/>

              </CardContent>
            ) : (
              <CardContent>
                <p> {loadingStats === false ? "No Statistics yet" : 'Loading Statistics...'}</p>
              </CardContent>
            )
          }
        </Card>

      </div>
    </>
  )
}
