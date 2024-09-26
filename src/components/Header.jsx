import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link2, LogOut } from 'lucide-react';


export default function Header() {

    const user = false ;
    const navigate = useNavigate();

    return (
        <nav className='py-4 flex justify-between items-center'>
            <Link to='/'><img className='h-16' src="/logo.png" alt="Logo" /></Link>

            <div>
                {
                    !user ? <Button onClick={() => navigate('/auth')}>Login</Button>
                        : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>

                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>IS</AvatarFallback>
                                    </Avatar>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Inderpal</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem> <Link2 className='mr-3 w-5'/> <span>My Links</span></DropdownMenuItem>
                                    <DropdownMenuItem className='text-red-400' onClick={() => navigate('/')}> <LogOut className='mr-3 w-4'/> <span>Logout</span> </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                }
            </div>
        </nav>
    )
}
