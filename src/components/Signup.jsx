import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './Error';
import * as Yup from 'yup';
import useFetch from '@/hooks/useFetch';
import { signup } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

export default function Signup() {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', profile_pic: null
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
    const { fetchUser } = UrlState();

    useEffect(() => {
        if (!error && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }
    }, [data, error]);

    const handleSignup = async () => {
        setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is Required'),
                email: Yup.string().email('Invalid Email').required("Email is Required"),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required("Password is Required"),
                profile_pic: Yup.mixed().required('Profile Picture is Required'),
            });

            await schema.validate(formData, { abortEarly: false });

            await fnSignup(); // Call the signup API
            console.log(formData);

        } catch (validationError) {
            const validationErrors = {};
            validationError?.inner?.forEach((err) => {
                validationErrors[err.path] = err.message;
            });

            setErrors(validationErrors);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create a new account if you haven&rsquo;t already</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className="space-y-1">
                    <Input value={formData.name} onChange={handleInputChange} type="text" name='name' placeholder='Enter Name' />
                    {errors.name && <Error message={errors.name} />}
                </div>
                <div className="space-y-1">
                    <Input value={formData.email} onChange={handleInputChange} type="email" name='email' placeholder='Enter Email' />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input value={formData.password} onChange={handleInputChange} type="password" name='password' placeholder='Enter Password' />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="space-y-1">
                    <Input onChange={handleInputChange} type="file" name='profile_pic' accept='image/*' />
                    {errors.profile_pic && <Error message={errors.profile_pic} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>
                    {loading ? <BeatLoader size={10} color='#36d7b7' /> : "Create account"}
                </Button>
            </CardFooter>
        </Card>
    );
}
