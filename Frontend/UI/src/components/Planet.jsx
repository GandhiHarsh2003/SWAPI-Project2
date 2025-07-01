import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Planet() {
    const { id } = useParams();
    const [characterInPlanet, setCharacterInPlanet] = useState()
    const [filmInPlanet, setFilmInPlanet] = useState()
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/planets/${id}/characters`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setCharacterInPlanet(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        const fetchFilmData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/planets/${id}/films`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setFilmInPlanet(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching Planets:', error);
            }
        };

        const fetchPlanetData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/planets/" + id);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response)
                setData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching Planets:', error);
            }
        };
        fetchPlanetData()
        fetchFilmData()
        fetchData();
    }, []);

    if (!data) return "Loading..."

    return (
        <>
            <h1 id="name">{data.name}</h1>
            <section id="generalInfo">
                <p id="population">Population: {data.population}</p>
                <p id="climate">Climate: {data.climate}</p>
                <p id="terrain">Terrain: {data.terrain}</p>
                <p id="surfaceWater">Surface Water: {data.surface_water}</p>

                <p id="diameter">Diameter: {data.diameter}</p>
                <p id="gravity">Gravity: {data.gravity}</p>
                <p id="orbital_period">Orbital Period: {data.orbital_period}</p>
                <p id="rotation_period">Rotational Period: {data.rotation_period}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <span>
                    <ul id="filmList">
                        {
                            filmInPlanet?.map((data) => (
                                <ul onClick={() => {
                                    navigate("/films/" + data.id)
                                }}>{data.title}</ul>
                            ))
                        }
                    </ul>
                </span>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <span>
                    <ul id="characterList">
                        {
                            characterInPlanet?.map((data) => (
                                <ul onClick={() => {
                                    navigate("/characters/" + data.id)
                                }}>{data.name}</ul>
                            ))
                        }
                    </ul>
                </span>
            </section>
        </>
    )
}