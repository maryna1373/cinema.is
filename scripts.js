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
    if (username === 'admin' && password === 'admin') {
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

const movies = [
    {
        title: 'The Godfather',
        poster: '/Photos/The Godfather.jpg',   
        description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
        duration: '02:55:00',
        showtimes: ['14:00', '19:30']
    },
    {
        title: 'Interstellar',
        poster: '/Photos/Interstellar.jpg',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        duration: '02:49:00',
        showtimes: ['14:10', '19:40']
    },
    {
        title: 'Emma',
        poster: '/Photos/Emma.png',
        description: 'In 1800s England, a well meaning but selfish young woman meddles in the love lives of her friends.',
        duration: '02:05:00',
        showtimes: ['14:30', '20:00']
    },
    {
        title: 'Pamfir',
        poster: '/Photos/Pamfir.png',
        description: 'A story about the tragic fate of Leonid, who has been involved in an unfortunate incident, makes him remember his past actions under the nickname Pamfir.',
        duration: '01:42:00',
        showtimes: ['14:20', '19:20']
    },
    {
        title: 'Toy Story',
        poster: '/Photos/Toy Story.png',
        description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
        duration: '01:21:00',
        showtimes: ['14:30', '19:10']
    },
    {
        title: 'The Grand Budapest Hotel',
        poster: '/Photos/The Grand Budapest Hotel.png',
        description: 'A concierge teams up with a lobby boy to prove his innocence after he is framed for murder.',
        duration: '01:39:00',
        showtimes: ['10:00', '16:00']
    },
    {
        title: 'Monsters, Inc.',
        poster: '/Photos/Monsters Inc.png',
        description: 'A group of young monsters attend a special school to learn how to scare humans, but they end up learning much more about friendship and acceptance.',
        duration: '01:32:00',
        showtimes: ['14:40', '19:00']
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <p>Duration: ${movie.duration}</p>
            </div>
            <img src="${movie.poster}" alt="${movie.title}">
        `;
        movieItem.onclick = () => showMovieDetails(movie.title, movie.poster, movie.description, movie.duration, movie.showtimes);
        movieList.appendChild(movieItem);
    });
});

function showMovieDetails(title, poster, description, duration, showtimes) {
    selectedMovie = title;
    document.getElementById('movie-title').innerText = title;
    document.getElementById('movie-poster').src = poster;
    document.getElementById('movie-description').innerText = description;
    document.getElementById('movie-duration').innerText = 'Duration: ' + duration;
    const showtimesDiv = document.getElementById('showtimes');
    showtimesDiv.innerHTML = '';
    showtimes.forEach(time => {
        const btn = document.createElement('button');
        btn.innerText = time;
        btn.onclick = () => selectShowtime(time);
        showtimesDiv.appendChild(btn);
    });
    document.getElementById('movie-modal').style.display = 'block';
}

function selectShowtime(time) {
    selectedTime = time;
    document.getElementById('showtimes').style.display = 'none';
    document.getElementById('seats-selection').style.display = 'block';
    const seatsDiv = document.getElementById('seats');
    seatsDiv.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
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
        item.innerText = `${selectedMovie} - ${selectedTime} - Seat: ${seat}`;
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
    document.getElementById('movie-modal').style.display = 'none';
    document.getElementById('seats-selection').style.display = 'none';
    document.getElementById('showtimes').style.display = 'block';
}

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
    alert('Payment successful!');
}

// Admin functionality
document.getElementById('admin-btn').onclick = function() {
    // Implement admin panel functionality
    alert('Admin panel is not yet implemented.');
};
