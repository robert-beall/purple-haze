import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, TextInput } from "flowbite-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PurpleClient from "../utils/PurpleClient";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = (): JSX.Element => {
    const navigate = useNavigate();
    
    interface LoginModel {
        username: string,
        password: string,
    }

    const loginSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
      
    const onSubmit = (data: LoginModel) => {
        PurpleClient.post("/auth/login", data, {
            withCredentials: true, // This sends cookies along with the request
          }).then((res) => {
            localStorage.setItem('purple-token', res.data.token);
            navigate('/');
        }).catch(e => console.error(e));
    }

    return (
        <div className="flex">
            <div className="w-full mx-96 px-56 my-52">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        Username
                        <TextInput {...register("username")} title="Username"/>
                        <p className="text-red-500">{errors.username?.message}</p>
                    </Label>
                    <Label>Password</Label>
                    <TextInput {...register("password")} title="Password" type="password" />
                    <p className="text-red-500">{errors.password?.message}</p>

                    <Button type="submit" color="purple" className="w-full my-6">Submit</Button>
                </form> 
            </div>
        </div>
    );
}

export default LoginForm;