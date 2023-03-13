const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool(config);

async function getFilms(req, res) {
    const { rows } = await pool.query('SELECT * FROM film');
    res.send(rows);
}

async function createFilm(req, res) {
    const newFilm = req.body;
    const { rows } = await pool.query('INSERT INTO film (film_id, title, release_date) VALUES ($1, $2, $3) RETURNING *',
        [newFilm.film_id, newFilm.title, newFilm.release_date])
    res.send(rows[0]);
}

async function updateFilms(req, res) {
    const film_id = req.params.id;
    const update = req.body;
    await pool.query('UPDATE film SET title = $1, release_date = $2 WHERE film_id = $3',
        [update.title, update.release_date, film_id])
    res.send({message: 'Фильм успешно обновлен'})
}

async function deleteFilm(req, res) {
    const film_id = req.params.id;
    await pool.query('DELETE FROM film WHERE film_id = $1', [film_id])
    res.send({message: 'Фильм успешно удален'})
}

async function getGenres(req, res) {
    const { rows } = await pool.query('SELECT * FROM genre')
    // если не нужен pk(genre_id) -  const {rows} = await pool.query('SELECT DISTINCT name FROM genre');
    res.send(rows);
}

async function createGenre (req, res) {
    const newGenre = req.body;
    const { rows }  = await pool.query('INSERT INTO genre(genre_id, name, film_id) VALUES ($1, $2, $3) RETURNING *',
        [newGenre.genre_id, newGenre.name, newGenre.film_id])
    res.send(rows[0])
}

async function updateGenre (req,res) {
    const genre_id = req.params.id;
    const update = req.body;
    await pool.query('UPDATE genre SET name = $1, film_id = $2 WHERE genre_id = $3',
        [update.name, update.film_id, genre_id])
    res.send({message: 'Жанр успешно обновлен'})
}

async function deleteGenre (req, res) {
    const genre_id = req.params.id;
    await pool.query('DELETE FROM genre WHERE genre_id = $1', [genre_id])
    res.send({message: 'Жанр успешно удален'})
}

module.exports = {
    getFilms,
    createFilm,
    updateFilms,
    deleteFilm,
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,

}