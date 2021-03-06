const path = require('path');
const express = require('express');
const busboy = require('connect-busboy');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const api = express.Router();

const PORT = 5001;

api.use(express.json());
api.use(busboy({ immediate: true }));

const HOST = 'https://ya-praktikum.tech/api/v2';

const SIGN_IN_URL = `${HOST}/auth/signin`;
const AVATAR_URL = `${HOST}/user/profile/avatar`;
const PROFILE_URL = `${HOST}/user/profile`;

const RESOURCES_URL = `${HOST}/resources`;

let cookies = '';

const parseCookies = cookie => cookie
    .split(/;\s+/)
    .filter(token => token.startsWith('authCookie') || token.startsWith('uuid'))
    // возвращает 2 куки 'uuid', первую вырезаем
    .slice(1)
    .join('; ');

api.post('/signin', (req, res) => {
    const user = {
        login: 'str',
        password: 'test',
    };

    axios.post(SIGN_IN_URL, user)
        .then(({ headers }) => {
            cookies = parseCookies(headers['set-cookie'].join('; '));

            return res.sendStatus(200);
        })
        .catch(({ response }) => console.error(response.data));
});

api.get('/avatar/*', (req, res) => {
    const URL = `${RESOURCES_URL}/${req.params[0]}`;

    const config = {
        headers: {
            Cookie: cookies,
        },
        withCredentials: true,
        responseType: 'stream',
    };

    return axios.get(URL, config)
        .then(result => result.data.pipe(res));
});

api.post('/avatar', (req, res) => {
    if (!req.busboy) {
        return res.sendStatus(500);
    }

    req.busboy.on('file', (fieldName, file, { filename }) => {
        const formData = new FormData();

        formData.append('avatar', file, { filename });

        const config = {
            headers: {
                Cookie: cookies,
                ...formData.getHeaders(),
            },
            withCredentials: true,
        };

        axios
            .put(AVATAR_URL, formData, config)
            .then(({ data }) => res.send(data))
            .catch(({ response }) => console.error('ERROR:', response));
    });
});

api.post('/profile', (req, res) => {
    const profile = {
        first_name: 'first_name',
        second_name: 'second_name',
        display_name: 'display_name',
        login: 'login2',
        email: 'email@gmail.com',
        phone: '79111111111',
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookies,
        },
        withCredentials: true,
    };

    axios
        .put(PROFILE_URL, profile, config)
        .then(({ data }) => res.send(data))
        .catch(({ response }) => console.error('ERROR:', response));
});

app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
