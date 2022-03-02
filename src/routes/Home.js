import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    } from "firebase/firestore";

export default function Home() {
    const [twitter, setTwitter] = useState("");
    const [twitters, setTwitters] = useState([]);
    
    //get twitter data
    useEffect(() => {
        const q = query(
        collection(dbService, "twitter"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const twitterArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setTwitters(twitterArr);
        });
        }, []);

    console.log('twitters', twitters)

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(dbService, "twitter"),{
                twitter,
                createdAt:serverTimestamp()
            }
        )} catch(error) {
            console.log("Error adding document:",error)
        }
        setTwitter("")
    };
    const onChange = (e) => {
        const {target: {value},} = e;
        setTwitter(value)
    }

    return (
        <form onSubmit={onSubmit}>
        <input
            value={twitter}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
        />
        <input type="submit" value="twitter" />
        </form>
    );
}
