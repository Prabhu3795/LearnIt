import { createContext, useContext, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const[loading, setLoading] = useState(true);

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, {
                email,
                password,
            });

            if (!data || !data.token) {
                throw new Error("Invalid response from server");
            }

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setBtnLoading(false);
        }
    }
    async function registerUser(name,email, password, navigate) {
        setBtnLoading(true);
        try {
            console.log("Registering User with:", { name, email, password }); 
            const { data } = await axios.post(`${server}/api/user/register`, {
                name,
                email,
                password,
            });
            console.log("Server Response:", data);
            if (!data || !data.activationToken) {
                throw new Error("Invalid response from server");
            }

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify");
        } catch (error) {
            setBtnLoading(false);
            console.error("Registration Error:", error.response);
            toast.error(error.response?.data?.message || "Registeration failed");
        } 
    }
    async function verifyUser(otp,navigate){
        setBtnLoading(true);
        const activationToken = localStorage.getItem("activationToken");
        try {
            const { data } = await axios.post(`${server}/api/user/verify`, {
                otp,
                activationToken,
            });
        
            toast.success(data.message);
            setIsAuth(true);
            navigate('/login')
            setBtnLoading(false);
            localStorage.clear();
            
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response?.data?.message || "Verification failed");
        }
    }
    async function fetchUser(){
        try{
            const {data} = await axios.get(`${server}/api/user/me`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                },
            });

            setIsAuth(true);
            setUser(data.user);
            setLoading(false);

        }
        catch(error){
           console.log(error);
           setLoading(false);
           localStorage.removeItem("token");
        }
    }


    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading,loading ,registerUser,verifyUser,fetchUser,}}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
