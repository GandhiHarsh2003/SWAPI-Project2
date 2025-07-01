import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Films() {
    const { id } = useParams();
    const [characterInFilm, setCharacterInFilm] = useState()
    const [planetInFilm, setPlanetInFilm] = useState()
    const [data, setData] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/films/" + id);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/films/${id}/characters`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setCharacterInFilm(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        const fetchPlanetData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/films/${id}/planets`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setPlanetInFilm(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching Planets:', error);
            }
        };
        fetchFilmData()
        fetchPlanetData()
        fetchData();
    }, []);

    if (!data) return "Loading..."

    return (
        <main>
            <h1 id="title">{data.title}</h1>
            <section id="generalInfo">
                <p>Episode: <span id="episode_id">{data.episode_id}</span></p>
                <p>Director: <span id="director">{data.director}</span></p>
                <p>Producer: <span id="producer">{data.producer}</span></p>
                <p>Release Date: <span id="release_date">{data.release_date}</span></p>
            </section>
            <section id="opening_crawl_section">
                <h2>Opening Crawl</h2>
                <p id="opening_crawl">{data.opening_crawl}</p>
            </section>
            <section id="characters">
                <h2>Characters in this film</h2>
                <ul>
                    {characterInFilm?.map((data) => (
                        <li key={data.id}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/characters/" + data.id);
                                }}
                                href="#"
                            >
                                {data.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="planets">
                <h2>Planets in this film</h2>
                <ul>
                    {planetInFilm?.map((data) => (
                        <li key={data.id}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/planets/" + data.id);
                                }}
                                href="#"
                            >
                                {data.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}