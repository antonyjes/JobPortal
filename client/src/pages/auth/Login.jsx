import { setLogin } from "@/state";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutHome from "../LayoutHome";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function resetForm() {
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        });

        const loggedIn = await loggedInResponse.json();

        if (loggedIn) {
            dispatch(
                setLogin(
                    {
                        user: loggedIn.user,
                        token: loggedIn.token,
                    }
                )
            );
            const role = loggedIn.user.role;
            navigate(`/${role.toLowerCase()}/home`)
        }

        resetForm();
    }

    return(
        <LayoutHome>
            <div className="min-h-[80vh]">
                <div className="container grid h-[80vh] w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col space-y-2 text-center">
                                <Command className="mx-auto h-6 w-6" />
                                <h1 className="text-2xl font-semibold tracking-tight">Ingresar</h1>
                                <p className="text-sm text-muted-foreground">Ingresa tu email y contraseña para ingresar</p>
                            </div>
                            <div className="grid gap-6">
                                <form className="grid gap-6" onSubmit={handleSubmit}>
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="grip gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="password">
                                                Contraseña
                                            </Label>
                                            <Input
                                                id="password"
                                                placeholder="..."
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button className="w-[25%]">Entrar</Button>
                                    </div>
                                </form>
                            </div>
                            <p className="px-8 text-center text-sm text-muted-foreground">Si no tienes una cuenta <a className="underline underline-offset-4 hover:text-primary" href="/register">click aquí</a>.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </LayoutHome>
    )
}

export default Login;