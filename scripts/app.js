const endpoint = 'https://dragonball-api.com/api/characters';

const getData = async () => {
    try {
        let response = await axios.get(endpoint);
        let personajes = response.data.items; // Asegúrate de que esto es correcto

        // Agrega listeners para los filtros y la búsqueda
        const radioButtons = document.querySelectorAll('input[name="opcion"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                filtrarYMostrarPersonajes(personajes);
            });
        });

        const inputNombre = document.getElementById('valueNombre');
        inputNombre.addEventListener('input', () => {
            filtrarYMostrarPersonajes(personajes);
        });

        const buscarButton = document.getElementById('buscar');
        buscarButton.addEventListener('click', () => {
            filtrarYMostrarPersonajes(personajes);
        });

        // Agregar listener al botón de "Entrar al combate"
        const entrarJuegoButton = document.getElementById('entrarJuego');
        entrarJuegoButton.addEventListener('click', () => {
            iniciarCombate(personajes);
        });

    } catch (err) {
        console.error(err);
    }
}

// Función para filtrar y mostrar personajes
const filtrarYMostrarPersonajes = (personajes) => {
    const generoSeleccionado = document.querySelector('input[name="opcion"]:checked')?.value;
    const nombreBuscado = document.getElementById('valueNombre').value.toLowerCase();

    let personajesFiltrados = personajes;

    if (generoSeleccionado) {
        personajesFiltrados = personajesFiltrados.filter(personaje => {
            return (generoSeleccionado === 'masculino' && personaje.gender === 'Male') ||
                   (generoSeleccionado === 'femenino' && personaje.gender === 'Female');
        });
    }

    if (nombreBuscado) {
        personajesFiltrados = personajesFiltrados.filter(personaje => 
            personaje.name.toLowerCase().includes(nombreBuscado)
        );
    }

    mostrarPersonajes(personajesFiltrados);
}

// Función para mostrar los personajes
const mostrarPersonajes = (personajes) => {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    if (personajes.length > 0) {
        personajes.forEach(personaje => {
            const div = document.createElement('div');
            div.classList.add('personaje');

            div.innerHTML = `
                <img src="${personaje.image}" alt="${personaje.name}">
                <div>
                    <strong>${personaje.name}</strong>
                    <p>Género: ${personaje.gender}</p>
                    <p>KI: ${personaje.ki}</p>
                </div>
            `;

            contenedor.appendChild(div);
        });
    } else {
        contenedor.innerHTML = '<p>No se encontraron personajes para esta búsqueda.</p>';
    }
}

// Función para mostrar el resultado del combate
function mostrarResultadoCombate(personaje1, personaje2, resultado) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = `
        <div class="combate">
            <div class="combatiente">
                <img src="${personaje1.image}" alt="${personaje1.name}">
                <strong>${personaje1.name}</strong>
                <p>KI: ${personaje1.ki}</p>
            </div>
            <div class="versus">VS</div>
            <div class="combatiente">
                <img src="${personaje2.image}" alt="${personaje2.name}">
                <strong>${personaje2.name}</strong>
                <p>KI: ${personaje2.ki}</p>
            </div>
        </div>
        <p class="resultado">${resultado}</p>
    `;
}

const iniciarCombate = (personajes) => {
    if (personajes.length < 2) {
        alert('No hay suficientes personajes para el combate.');
        return;
    }

    // Seleccionar dos personajes aleatoriamente
    const indice1 = Math.floor(Math.random() * personajes.length);
    let indice2 = Math.floor(Math.random() * personajes.length);

    // Asegurarse de que no sean el mismo personaje
    while (indice1 === indice2) {
        indice2 = Math.floor(Math.random() * personajes.length);
    }

    const personaje1 = personajes[indice1];
    const personaje2 = personajes[indice2];

    // Determinar el ganador
    let resultado;
    if (personaje1.ki > personaje2.ki) {
        resultado = `${personaje1.name} gana el combate contra ${personaje2.name}!`;
    } else if (personaje1.ki < personaje2.ki) {
        resultado = `${personaje2.name} gana el combate contra ${personaje1.name}!`;
    } else {
        resultado = `¡Es un empate entre ${personaje1.name} y ${personaje2.name}!`;
    }

    // Mostrar el resultado del combate
    mostrarResultadoCombate(personaje1, personaje2, resultado);
}


getData();
