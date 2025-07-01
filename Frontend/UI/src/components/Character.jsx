import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Character() {
    const { id } = useParams();

    const [planetOfCharacter, setPlanetOfCharacter] = useState()
    const [filmInCharacter, setFilmInCharacter] = useState()
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/characters/" + id);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters/${id}/films`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setFilmInCharacter(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        const fetchPlanet = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters/${id}/planets`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log("this is it ")
                console.log(json_response)
                setPlanetOfCharacter(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchPlanet()
        fetchData();
        fetchCharacter()
    }, []);

    if (!data) return "Loading..."

    return (
        <main>
            <h1 id="name">{data.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height">{data.height}</span> cm</p>
                <p>Mass: <span id="mass">{data.mass}</span> kg</p>
                <p>Born: <span id="birth_year">{data.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>
                    {planetOfCharacter?.map((data) => (
                        <a
                            key={data.id}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/planets/" + data.id);
                            }}
                            href="#"
                        >
                            {data.name}
                        </a>
                    ))}
                </p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {filmInCharacter?.map((data) => (
                        <li key={data.id}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/films/" + data.id);
                                }}
                                href="#"
                            >
                                {data.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}