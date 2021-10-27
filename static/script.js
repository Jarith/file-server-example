const { axios } = window;

const form = document.querySelector('#form');
const input = form.querySelector('input[name="avatar"]');
const messageContainer = document.querySelector('#message');
const authButton = document.querySelector('#auth');
const profileButton = document.querySelector('#profile');

const SIGN_IN_URL = 'http://localhost:5000/api/signin';
const AVATAR_URL = 'http://localhost:5000/api/avatar';
const PROFILE_URL = 'http://localhost:5000/api/profile';

const showMessage = message => {
    messageContainer.innerText = message;
    messageContainer.style.visibility = 'visible';
};

authButton.addEventListener('click', e => {
    e.preventDefault();

    axios
        .post(SIGN_IN_URL)
        .then(() => showMessage('Авторизация успешна'))
        .catch(console.error);
});

profileButton.addEventListener('click', e => {
    e.preventDefault();

    axios
        .post(PROFILE_URL)
        .then(() => showMessage('Профиль изменен'))
        .catch(console.error);
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('avatar', input.files[0]);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    axios
        .post(AVATAR_URL, formData, config)
        .then(() => showMessage('Аватар изменен'))
        .catch(console.error);
});
