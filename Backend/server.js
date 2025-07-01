import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import { promises as fs } from 'fs';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const filmsCollection = process.env.MONGO_DB_COLLECTION_FILMS;
const charactersCollection = process.env.MONGO_DB_COLLECTION_CHARACTERS;
const planetsCollection = process.env.MONGO_DB_COLLECTION_PLANETS;
const films_characters_Collection = process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS;
const films_planets_Collection = process.env.MONGO_DB_COLLECTION_FILMS_PLANETS;


const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsCollection);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planets not found");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Films not found");
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Characters not found");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = await db.collection(charactersCollection).findOne({ id: parseInt(id) })
        res.json(collection)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Character ID not found ☹");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = await db.collection(filmsCollection).findOne({ id: parseInt(id) })
        res.json(collection)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Film ID not found ☹");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = await db.collection(planetsCollection).findOne({ id: parseInt(id) })
        res.json(collection)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planet ID not found ☹");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const film_character = await db.collection(films_characters_Collection).find({ film_id: parseInt(id) }).toArray()
        const characterID = film_character.map(fc => fc.character_id)
        const characterInFilm = await db.collection(charactersCollection).find({ id: { $in: characterID } }).toArray()
        res.json(characterInFilm)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No character found for this film ☹");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const film_planet = await db.collection(films_planets_Collection).find({ film_id: parseInt(id) }).toArray()
        const planetID = film_planet.map(fc => fc.planet_id)
        const planetInFilm = await db.collection(planetsCollection).find({ id: { $in: planetID } }).toArray()
        res.json(planetInFilm)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No planet found for this film ☹");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const character_film = await db.collection(films_characters_Collection).find({ character_id: parseInt(id) }).toArray()
        const filmID = character_film.map(fc => fc.film_id)
        const filmInCharacter = await db.collection(filmsCollection).find({ id: { $in: filmID } }).toArray()
        res.json(filmInCharacter)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planet ID not found ☹");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const planet_film = await db.collection(films_planets_Collection).find({ planet_id: parseInt(id) }).toArray()
        const filmId = planet_film.map(fc => fc.film_id)
        const filmInPlanet = await db.collection(filmsCollection).find({ id: { $in: filmId } }).toArray()
        res.json(filmInPlanet)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planet ID not found ☹");
    }
});

app.get('/api/characters/:id/planets', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const character = await db.collection(charactersCollection).find({ id: parseInt(id) }).toArray()
        const homeWorld = character.map(cha => cha.homeworld)
        const character_planet = await db.collection(planetsCollection).find({ id: { $in: homeWorld } }).toArray()
        res.json(character_planet)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Planet ID not found ☹");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const characters = await db.collection(charactersCollection).find({ homeworld: parseInt(id) }).toArray();

        res.json(characters)
    } catch(E) {
        console.error("Error:", err);
        res.status(500).send("Characters not found for given Planet ID ☹");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
