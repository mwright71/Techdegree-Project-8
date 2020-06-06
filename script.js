let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
let index = 0;


// Fetch API//
fetch(urlAPI)
    .then(response => response.json())
    .then(response => response.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}


// display modal
function displayModal(index) {
    let {name, dob, phone, email, location:{city, street, state, postcode}, picture} = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}, ${city} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML
}

gridContainer.addEventListener('click', (e) => {
    if(e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }

});


// close modal
modalClose.addEventListener('click', (e) => {
    overlay.classList.add('hidden');
});


// Search bar
let search = document.getElementById('search');

search.addEventListener('keyup', () => {
    let card = document.getElementsByClassName('card');
    let names = document.getElementsByClassName('name');
    const input = search.value.toLowerCase();

    for (let i = 0; i < names.length; i += 1) {
        if (names[i].textContent.toLowerCase().indexOf(input) > -1) {
            card[i].style.display = "";
            } else {
            card[i].style.display = "none";
            }
    }
});

search.addEventListener('search', () => {
    let card = document.getElementsByClassName('card');
    if (event.target.value === '') {
      for (let i = 0; i < cards.length; i += 1) {
        card[i].style.display = "";
      }
    }
});



function displayPrev() {
    index -= 1;
    if (index < 0) {
        index = employees.length - 1;
    }
    displayModal(index);
}

function displayNext() {
    index += 1;
    if (index > employees.length - 1) {
        index = 0;
    }
    displayModal(index);
}

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

leftArrow.addEventListener("click", displayPrev);
rightArrow.addEventListener("click", displayNext);
