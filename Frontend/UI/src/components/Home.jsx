import { useNavigate } from "react-router-dom"

export function Home({ data }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate("/characters/" + data.id)
        }}>
            {data.name}
        </div>
    )
}