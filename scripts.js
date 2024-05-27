document.getElementById('login-link').onclick = function() {
    document.getElementById('login-modal').style.display = 'block';
};

document.getElementById('close-login').onclick = function() {
    document.getElementById('login-modal').style.display = 'none';
};

let loggedInUser = '';
const adminUsername = 'admin';

document.getElementById('login-form').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin') {
        loggedInUser = 'admin';
        document.getElementById('login-status').innerText = 'AUTHORIZED AS ADMIN';
        document.getElementById('admin-btn').style.display = 'block';
    } else {
        loggedInUser = username;
        document.getElementById('login-status').innerText = 'AUTHORIZED';
    }
    document.getElementById('login-modal').style.display = 'none';
};

document.getElementById('close-movie').onclick = function() {
    document.getElementById('movie-modal').style.display = 'none';
    document.getElementById('seats-selection').style.display = 'none';
    document.getElementById('showtimes').style.display = 'block';
};

let selectedMovie = '';
let selectedTime = '';
let selectedSeats = [];
let bookedSeats = {}; // Keeps track of booked seats

const movies = {
    'Cineplex': [
        {
            title: 'The Godfather',
            poster: '/Photos/The Godfather.jpg',
            description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
            duration: '02:55:00',
            showtimes: [
                { time: '14:00', price: 15, hall: 'Ruby Hall', seats: 60 },
                { time: '19:30', price: 30, hall: 'Azure Hall', seats: 10 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Interstellar',
            poster: '/Photos/Interstellar.jpg',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            duration: '02:49:00',
            showtimes: [
                { time: '14:10', price: 17, hall: 'Emerald Hall', seats: 30 },
                { time: '19:40', price: 30, hall: 'Crimson Hall', seats: 10 }
            ]
        },
        {
            title: 'Pamfir',
            poster: '/Photos/Pamfir.png',
            description: 'A story about the tragic fate of Leonid, who has been involved in an unfortunate incident, makes him remember his past actions under the nickname Pamfir.',
            duration: '01:42:00',
            showtimes: [
                { time: '14:20', price: 17, hall: 'Sapphire Hall', seats: 20 },
                { time: '19:20', price: 23, hall: 'Sapphire Hall', seats: 20 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Toy Story',
            poster: '/Photos/Toy Story.png',
            description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
            duration: '01:21:00',
            showtimes: [
                { time: '14:30', price: 20, hall: 'Azure Hall', seats: 10 },
                { time: '19:10', price: 23, hall: 'Emerald Hall', seats: 30 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Monsters, Inc.',
            poster: '/Photos/Monsters Inc.png',
            description: 'A group of young monsters attend a special school to learn how to scare humans, but they end up learning much more about friendship and acceptance.',
            duration: '01:32:00',
            showtimes: [
                { time: '14:40', price: 20, hall: 'Crimson Hall', seats: 10 },
                { time: '19:00', price: 20, hall: 'Ruby Hall', seats: 30 }
            ],
            status: 'now_playing'
        }
    ],
    'Cinema Citi': [
        {
            title: 'The Godfather',
            poster: '/Photos/The Godfather.jpg',
            description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
            duration: '02:55:00',
            showtimes: [
                { time: '14:00', price: 15, hall: 'Onyx Hall', seats: 60 },
                { time: '19:30', price: 30, hall: 'Opal Hall', seats: 10 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Interstellar',
            poster: '/Photos/Interstellar2.png',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            duration: '02:49:00',
            showtimes: [
                { time: '14:10', price: 17, hall: 'Marble Hall', seats: 30 },
                { time: '19:40', price: 30, hall: 'Crimson Hall', seats: 10 }
            ]
        },
        {
            title: 'Pamfir',
            poster: '/Photos/Pamfir.jpeg',
            description: 'A story about the tragic fate of Leonid, who has been involved in an unfortunate incident, makes him remember his past actions under the nickname Pamfir.',
            duration: '01:42:00',
            showtimes: [
                { time: '14:20', price: 17, hall: 'Diamond Hall', seats: 20 },
                { time: '19:20', price: 23, hall: 'Diamond Hall', seats: 20 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Toy Story',
            poster: '/Photos/Toy Story.png',
            description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
            duration: '01:21:00',
            showtimes: [
                { time: '14:30', price: 20, hall: 'Opal Hall', seats: 10 },
                { time: '19:10', price: 23, hall: 'Marble Hall', seats: 30 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Monsters, Inc.',
            poster: '/Photos/Monsters Inc.png',
            description: 'A group of young monsters attend a special school to learn how to scare humans, but they end up learning much more about friendship and acceptance.',
            duration: '01:32:00',
            showtimes: [
                { time: '14:40', price: 20, hall: 'Crimson Hall', seats: 10 },
                { time: '19:00', price: 20, hall: 'Onyx Hall', seats: 30 }
            ],
            status: 'now_playing'
        }
    ],

    'Silver Screen': [
        {
            title: 'The Godfather',
            poster: '/Photos/The Godfather2.png',
            description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
            duration: '02:55:00',
            showtimes: [
                { time: '14:00', price: 15, hall: 'Velvet Hall', seats: 60 },
                { time: '19:30', price: 30, hall: 'Granite Hall', seats: 10 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Interstellar',
            poster: '/Photos/Interstellar.jpg',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            duration: '02:49:00',
            showtimes: [
                { time: '14:10', price: 17, hall: 'Cobalt Hall', seats: 30 },
                { time: '19:40', price: 30, hall: 'Golden Hall', seats: 10 }
            ]
        },
        {
            title: 'Pamfir',
            poster: '/Photos/Pamfir.png',
            description: 'A story about the tragic fate of Leonid, who has been involved in an unfortunate incident, makes him remember his past actions under the nickname Pamfir.',
            duration: '01:42:00',
            showtimes: [
                { time: '14:20', price: 17, hall: 'Jasper Hall', seats: 20 },
                { time: '19:20', price: 23, hall: 'Jasper Hall', seats: 20 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Toy Story',
            poster: '/Photos/Toy Story.png',
            description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
            duration: '01:21:00',
            showtimes: [
                { time: '14:30', price: 20, hall: 'Granite Hall', seats: 10 },
                { time: '19:10', price: 23, hall: 'Cobalt Hall', seats: 30 }
            ],
            status: 'now_playing'
        },
        {
            title: 'Monsters, Inc.',
            poster: '/Photos/Monsters Inc.png',
            description: 'A group of young monsters attend a special school to learn how to scare humans, but they end up learning much more about friendship and acceptance.',
            duration: '01:32:00',
            showtimes: [
                { time: '14:40', price: 20, hall: 'Golden Hall', seats: 10 },
                { time: '19:00', price: 20, hall: 'Velvet Hall', seats: 30 }
            ],
            status: 'now_playing'
        }
    ]
};

document.getElementById('cinema-select').addEventListener('change', function() {
    const cinemaName = this.value;
    document.getElementById('cinema-title').innerText = `Welcome to the ${cinemaName}`;
    loadMovies(cinemaName);
});

function loadMovies(cinemaName) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    movies[cinemaName].forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        if (movie.status === 'soon_on_screen') { // Перевіряємо статус фільму
            movieItem.classList.add('soon-on-screen'); // Додаємо клас для зміни стилів
        }
        movieItem.innerHTML = `
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <p>Duration: ${movie.duration}</p>
            </div>
            <img src="${movie.poster}" alt="${movie.title}">
        `;
        movieItem.onclick = () => {
            if (movie.status !== 'soon_on_screen') { // Перевіряємо, чи не "SOON ON SCREEN"
                showMovieDetails(movie.title, movie.poster, movie.description, movie.duration, movie.showtimes);
            } else {
                const movieDetails = document.getElementById('movie-details');
                movieDetails.innerText = 'SOON ON SCREEN';
                movieDetails.style.backgroundColor = '#ffcccc'; // Задаємо світло червоний колір фону
            }
        };
        movieList.appendChild(movieItem);
    });
}

function showMovieDetails(title, poster, description, duration, showtimes) {
    selectedMovie = title;
    document.getElementById('movie-title').innerText = title;
    document.getElementById('movie-poster').src = poster;
    document.getElementById('movie-description').innerText = description;
    document.getElementById('movie-duration').innerText = 'Duration: ' + duration;
    
    const showtimesDiv = document.getElementById('showtimes');
    showtimesDiv.innerHTML = '';
    showtimes.forEach(showtime => {
        const btn = document.createElement('button');
        btn.innerText = `${showtime.time} - $${showtime.price} - ${showtime.hall}`;
        btn.onclick = () => selectShowtime(showtime.time, showtime.price, showtime.hall, showtime.seats);
        showtimesDiv.appendChild(btn);
    });
    document.getElementById('movie-modal').style.display = 'block';
}


function selectShowtime(time, price, hall, seats) {
    selectedTime = time;
    selectedPrice = price;
    selectedHall = hall; // Зберігаємо зал для обраного сеансу
    document.getElementById('showtimes').style.display = 'none';
    document.getElementById('seats-selection').style.display = 'block';
    const seatsDiv = document.getElementById('seats');
    seatsDiv.innerHTML = '';
    for (let i = 1; i <= seats; i++) {
        const seat = document.createElement('div');
        seat.innerText = i;
        seat.className = 'seat';
        if (bookedSeats[selectedMovie] && bookedSeats[selectedMovie][selectedTime] && bookedSeats[selectedMovie][selectedTime].includes(i.toString())) {
            seat.classList.add('booked');
        } else {
            seat.onclick = () => toggleSeatSelection(seat);
        }
        seatsDiv.appendChild(seat);
    }
}

function toggleSeatSelection(seat) {
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seat.innerText);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(seat.innerText);
    }
}

function addTicketsToCart() {
    if (!loggedInUser) {
        document.getElementById('user-details').style.display = 'block';
    }
    const cartItems = document.getElementById('cart-items');
    selectedSeats.forEach(seat => {
        const item = document.createElement('div');
        item.innerText = `${selectedMovie} - ${selectedTime} - ${selectedHall} - Seat: ${seat} - $${selectedPrice}`;
        
        // Додавання кнопки видалення
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = function() {
            cartItems.removeChild(item);
            // Оновлення списку заброньованих місць
            const index = bookedSeats[selectedMovie][selectedTime].indexOf(seat);
            if (index !== -1) {
                bookedSeats[selectedMovie][selectedTime].splice(index, 1);
            }
            updateTotal(); // Оновлення загальної суми після видалення
        };
        
        item.appendChild(deleteButton); // Додавання кнопки видалення до кожного елемента кошика
        cartItems.appendChild(item);
    });

    if (!bookedSeats[selectedMovie]) {
        bookedSeats[selectedMovie] = {};
    }
    if (!bookedSeats[selectedMovie][selectedTime]) {
        bookedSeats[selectedMovie][selectedTime] = [];
    }
    selectedSeats.forEach(seat => {
        bookedSeats[selectedMovie][selectedTime].push(seat);
    });
    selectedSeats = [];
    updateTotal();
    document.getElementById('movie-modal').style.display = 'none';
    document.getElementById('seats-selection').style.display = 'none';
    document.getElementById('showtimes').style.display = 'block';
}
// Оновлена функція для оновлення загальної суми
function updateTotal() {
    let total = 0;
    const cartItems = document.getElementById('cart-items').childNodes;
    cartItems.forEach(item => {
        const priceIndex = item.innerText.lastIndexOf('$');
        const price = parseFloat(item.innerText.substring(priceIndex + 1));
        total += price;
    });
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

// Оновлений код для обробки оплати з урахуванням загальної суми
function processPayment() {
    if (!loggedInUser) {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        if (!firstName || !lastName || !phone || !email) {
            alert('Please fill in all user details.');
            return;
        }
    }
    const discountCode = document.getElementById('discount-code').value;
    // Apply discount code logic here

    // Clear the cart after successful payment
    document.getElementById('cart-items').innerHTML = '';
    updateTotal(); // Оновлення загальної суми після оплати
    alert('Payment successful!');
}

// Оновлений код для відображення загальної суми перед кнопкою "Pay"
function updateTotal() {
    let total = 0;
    const cartItems = document.getElementById('cart-items').childNodes;
    cartItems.forEach(item => {
        const priceIndex = item.innerText.lastIndexOf('$');
        const price = parseFloat(item.innerText.substring(priceIndex + 1));
        total += price;
    });
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}


// Admin functionality
document.getElementById('admin-btn').onclick = function() {
    document.getElementById('admin-modal').style.display = 'block';
    fillMovieDropdowns();
};

// Закриття модального вікна при натисканні на хрестик
document.getElementById('close-admin').onclick = function() {
    document.getElementById('admin-modal').style.display = 'none';
};

// Заповнення випадаючих списків фільмів для видалення та оновлення
function fillMovieDropdowns() {
    fillDeleteMovieDropdown();
    fillUpdateMovieDropdown();
}

function fillDeleteMovieDropdown() {
    const cinemaName = document.getElementById('delete-cinema-select').value;
    const deleteMovieSelect = document.getElementById('delete-movie-select');
    deleteMovieSelect.innerHTML = ''; // Очищення випадаючого списку

    if (movies[cinemaName]) {
        movies[cinemaName].forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.title;
            option.textContent = movie.title;
            deleteMovieSelect.appendChild(option);
        });
    }
}

function fillUpdateMovieDropdown() {
    const cinemaName = document.getElementById('update-cinema-select').value;
    const updateMovieDropdown = document.getElementById('update-movie-dropdown');
    updateMovieDropdown.innerHTML = ''; // Очищення випадаючого списку

    if (movies[cinemaName]) {
        movies[cinemaName].forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.title;
            option.textContent = movie.title;
            updateMovieDropdown.appendChild(option);
        });
    }
}

// Додавання фільмів
document.getElementById('add-movie-form').onsubmit = function(event) {
    event.preventDefault();
    const cinemaName = document.getElementById('add-cinema-select').value;
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;
    const showtime = document.getElementById('showtime').value;
    const price = document.getElementById('price').value;
    const hall = document.getElementById('hall').value;
    const seats = document.getElementById('seats').value;

    const newMovie = {
        title: title,
        poster: poster,
        description: description,
        duration: duration,
        showtimes: [{ time: showtime, price: price, hall: hall, seats: seats }]
    };

    if (!movies[cinemaName]) {
        movies[cinemaName] = [];
    }

    movies[cinemaName].push(newMovie);
    loadMovies(cinemaName); // Оновлення списку фільмів після додавання нового
    document.getElementById('add-movie-form').reset(); // Очищення форми після додавання
};

// Видалення фільмів
document.getElementById('delete-movie-btn').onclick = function() {
    const cinemaName = document.getElementById('delete-cinema-select').value;
    const selectedMovie = document.getElementById('delete-movie-select').value;

    if (selectedMovie) {
        movies[cinemaName] = movies[cinemaName].filter(movie => movie.title !== selectedMovie);
        loadMovies(cinemaName); // Оновлення списку фільмів після видалення
        fillDeleteMovieDropdown(); // Оновлення випадаючого списку після видалення
    } else {
        alert("Please select a movie to delete.");
    }
};

// Оновлення фільмів
document.getElementById('update-movie-btn').onclick = function() {
    const cinemaName = document.getElementById('update-cinema-select').value;
    const selectedMovieTitle = document.getElementById('update-movie-dropdown').value;
    const title = document.getElementById('update-title').value;
    const poster = document.getElementById('update-poster').value;
    const description = document.getElementById('update-description').value;
    const duration = document.getElementById('update-duration').value;
    const showtime = document.getElementById('update-showtime').value;
    const price = document.getElementById('update-price').value;
    const hall = document.getElementById('update-hall').value;
    const seats = document.getElementById('update-seats').value;

    if (selectedMovieTitle) {
        const movieIndex = movies[cinemaName].findIndex(movie => movie.title === selectedMovieTitle);
        if (movieIndex !== -1) {
            const movie = movies[cinemaName][movieIndex];
            if (title) movie.title = title;
            if (poster) movie.poster = poster;
            if (description) movie.description = description;
            if (duration) movie.duration = duration;
            if (showtime) movie.showtimes[0].time = showtime;
            if (price) movie.showtimes[0].price = price;
            if (hall) movie.showtimes[0].hall = hall;
            if (seats) movie.showtimes[0].seats = seats;

            loadMovies(cinemaName); // Оновлення списку фільмів після оновлення
        }
    } else {
        alert("Please select a movie to update.");
    }
};

// Завантаження списку фільмів при зміні вибраного кінотеатру
document.getElementById('delete-cinema-select').onchange = fillDeleteMovieDropdown;
document.getElementById('update-cinema-select').onchange = fillUpdateMovieDropdown;


// Закриття модального вікна при натисканні на хрестик
document.getElementById('close-admin').onclick = function() {
    document.getElementById('admin-modal').style.display = 'none';
};

// Initial load
loadMovies('Cineplex');