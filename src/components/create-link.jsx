import { UrlState } from '@/context';
import React, { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './Error';
import { Card } from './ui/card';
import * as yup from 'yup';
import useFetch from '@/hooks/useFetch';
import { createUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';

export default function CreateLink() {

    const { user } = UrlState();
    const ref = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    const [errors,setErrors] = useState([]);
    const [formValues,setFormValues] = useState({
        title : "",
        longUrl : longLink ? longLink :  "",
        customUrl : ""
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl : yup.string().url('Must be a valid URL').required("Long URL is required"),
        customUrl : yup.string()
    })

   const {loading,error,data,fn:fnCreateUrl} = useFetch(createUrl,{...formValues,user_id : user.id});

   const createNewLink = async() => {
        setErrors([]);
        try {
            await schema.validate(formValues,{abortEarly:false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            })

            setErrors(newErrors);
        }
   }

   useEffect(()=>{
    if (error === null && data) {
        navigate(`/link/${data[0].id}`);
    }
   },[error,data])

    return (
        <>
            <Dialog defaultOpen={longLink} onOpenChange={(res)=> {
                if(!res) setSearchParams({});
            }}>
                <DialogTrigger>
                    <Button variant="destructive">Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                    </DialogHeader>

                    {
                        formValues.longUrl && <QRCode ref={ref} value={formValues.longUrl} size={180}/>
                    }

                    <Input id="title" value={formValues.title} onChange={handleChange} placeholder="Short Link's Title" />
                   {
                    errors.title &&  <Error message={errors.title} />
                   }

                    <Input id="longUrl" value={formValues?.longUrl} onChange={handleChange} placeholder="Enter your loooong URL" />
                   {
                    errors.longUrl &&  <Error message={errors.longUrl} />
                   }

                    <div className='flex items-center gap-2'>
                        <Card className="p-2">urltrimmingg.in</Card> /
                        <Input id="customUrl" value={formValues.customUrl} onChange={handleChange} placeholder="Short Link's Title" />
                    </div>
                    {
                        error && <Error message={error.message} />
                    }

                    <DialogFooter className="sm:justify-start">
                        <Button disabled={loading} onClick={createNewLink} variant="destructive">
                            {
                                loading ? <BeatLoader size={10} color='white'/> : "Create Link"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
