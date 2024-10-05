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
import { UrlState } from '@/context';
import useFetch from '@/hooks/useFetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';


export default function Header() {

    const navigate = useNavigate();
    const {user,fetchUser} = UrlState();

    const {loading,fn:fnLogout} = useFetch(logout);

    return (
       <>
        <nav className='py-4 flex justify-between items-center'>
            <Link to='/'><img className='h-20' src="/newLogoNew.png" alt="Logo" /></Link>

            <div>
                {
                    !user ? <Button onClick={() => navigate('/auth')}>Login</Button>
                        : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>

                                    <Avatar>
                                        <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                                        <AvatarFallback>IS</AvatarFallback>
                                    </Avatar>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link className='flex items-center' to='/dashboard'> <Link2 className='mr-3 w-5'/> <span>My Links</span></Link></DropdownMenuItem>
                                    <DropdownMenuItem className='text-red-400' onClick={() => navigate('/')}> <LogOut className='mr-3 w-4'/> <span onClick={()=> fnLogout().then(()=>{fetchUser(); navigate('/')})}>Logout</span> </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                }
            </div>
        </nav>
        {
            loading && <BarLoader width={'100%'} color='#36d7b7'/>
        }
       </>
    )
}
