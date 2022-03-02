import React, { useState } from "react";
import { authService } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    } from "firebase/auth";

export default function Auth () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")
    const onChange = (e) => {
        const {target:{name,value}} = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        let data;
        try {
            if (newAccount) {
                //create account
                //data = await authService.createUserWithEmailAndPassword(email, password) //ver.8
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                //log in
                //data= await authService.signInWithEmailAndPassword(email, password) //ver.8
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log('data', data)
        } catch(error) {
            setError(error.message)
        }
    }
    //로그인과 회원가입 토글 이벤트(같은 폼 사용)
    const toggleAccount = (() => setNewAccount((prev) => !prev))

    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        } 
        const data = await signInWithPopup(authService, provider)
        console.log('data',data)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required="required"
                    onChange={onChange}
                    value={email}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                    onChange={onChange}
                    value={password}
                />                
                <input type="submit" value={newAccount? "Create Account" : "Login"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Create Account" : "Log in"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Gitgub</button>
            </div>
        </>
)}