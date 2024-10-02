import { UrlState } from '@/context';
import React from 'react';
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

export default function CreateLink() {

    const { user } = UrlState();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant="destructive">Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                    </DialogHeader>

                    <Input id="title" placeholder="Short Link's Title" />
                    <Error message={"Some Error"} />

                    <Input id="title" placeholder="Enter your loooong URL" />
                    <Error message={"Some Error"} />

                    <div className='flex items-center gap-2'>
                        <Card className="p-2">trimmer.in</Card> /
                        <Input id="title" placeholder="Short Link's Title" />
                    </div>
                    <Error message={"Some Error"} />

                    <DialogFooter className="sm:justify-start">
                        <Button variant="destructive">Create Link</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
