import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message);
    console.log('Login :--', data);
    return data;
}

export async function getCurrentUser() {
    let { data: session, error } = await supabase.auth.getSession();
    if (!session.session) return null;
    if (error) throw new Error(error.message);
    return session.session?.user;
}

export async function signup({ name, email, password, profile_pic }) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
    const { error: storageError } = await supabase.storage.from('profile_pic').upload(fileName, profile_pic);

    if (storageError) throw new Error(storageError.message);

    const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`;

    const { data, error: signUpError } = await supabase.auth.signUp({
        email, 
        password, 
        options: {
            data: {
                name,
                profile_pic: profilePicUrl,
            }
        }
    });

    if (signUpError) throw new Error(signUpError.message);
    console.log(data);
    return data; 
}

export async function logout() {
    let {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}