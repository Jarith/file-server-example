const { axios } = window;

const form = document.querySelector('#form');
const input = form.querySelector('input[name="avatar"]');
const messageContainer = document.querySelector('#message');
const avatarContainer = document.querySelector('#avatar');
const authButton = document.querySelector('#auth');
const profileButton = document.querySelector('#profile');

const HOST = 'http://localhost:5001/api';

const SIGN_IN_URL = `${HOST}/signin`;
const AVATAR_URL = `${HOST}/avatar`;
const PROFILE_URL = `${HOST}/profile`;

const showMessage = message => {
    messageContainer.innerText = message;
    messageContainer.style.visibility = 'visible';
};

const showAvatar = avatarPath => {
    const img = document.createElement('IMG');
    img.src = `${AVATAR_URL}${avatarPath}`;

    avatarContainer.appendChild(img);
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
        .then(({ data }) => {
            showAvatar(data.avatar);

            return showMessage('Аватар изменен');
        })
        .catch(console.error);
});
