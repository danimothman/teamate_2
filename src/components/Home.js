import React, {useState, useEffect} from 'react'

const Home = () => {
    const [user, setUser] = useState({})

    useEffect(()=>{
        fetch('http://localhost:3001/data')
        .then(resData=>resData.json())
        .then(res=>{
            console.log(res)
            setUser(res)
            
        })
    },[])
    console.log(user)
    return (
        <div>
            {user.message} {user.name}!!!
        </div>
    )
}

export default Home
