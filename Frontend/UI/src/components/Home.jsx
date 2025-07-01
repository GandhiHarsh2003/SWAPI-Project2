import { Character } from "./Character"
import { useNavigate } from "react-router-dom"

export function Home({ data }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1 id="name" onClick={() => {
                navigate("/characters/" + data.id)
            }}>{data.name}</h1>
        </div>
    )
}