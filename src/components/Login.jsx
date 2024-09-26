import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './Error';
import * as Yup from 'yup';

export default function Login() {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Invalid Email').required("Email is Required"),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required("Password is Required")
            });

            await schema.validate(formData, { abortEarly: false });

            //api call
        } catch (error) {
            const newErros = {};
            error?.inner?.forEach((err) => {
                newErros[err.path] = err.message;
            });

            setErrors(newErros);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>to your account if you already have one.</CardDescription>
                <Error message={"Some Error"} />
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className="space-y-1">
                    <Input value={formData.email} onChange={handleInputChange} type="email" name='email' placeholder='Enter Email' />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input value={formData.password} onChange={handleInputChange} type="password" name='password' placeholder='Enter Password' />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>
                    {
                        true ? <BeatLoader size={10} color='#36d7b7' /> : "Login"
                    }
                </Button>

            </CardFooter>
        </Card>
    )
}
