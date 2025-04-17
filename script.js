const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

const artistNameElement = document.getElementById('artist-name'); // Elemento para o nome do artista
const artistImageElement = document.getElementById('artist-img'); // Elemento para a imagem do artista

// Função para buscar na API
function requestApi(searchTerm) {
    // Corrigido: Use crase (`) para template literals e a variável correta 'searchTerm'
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            // Verifica se a busca ainda corresponde ao input atual
            // Isso evita que resultados antigos apareçam se o usuário digitar rápido
            if (searchInput.value.toLowerCase() === searchTerm) {
                displayResults(result);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar artistas:", error);
            // Opcional: Lidar com erro de API (ex: mostrar mensagem)
            hideArtistResults(); // Esconde a área do artista em caso de erro
        });
}

// Função para exibir os resultados
function displayResults(result) {
    // Verifica se o array 'result' não está vazio
    if (!result || result.length === 0) {
        // Nenhum artista encontrado
        hideArtistResults(); // Esconde a área do artista
        // Opcional: Mostrar uma mensagem de "não encontrado" em algum lugar
        console.log("Nenhum artista encontrado para o termo.");
        return; // Sai da função
    }

    // Pega o PRIMEIRO artista do array retornado pela API
    const firstArtist = result[0];

    // Atualiza os elementos HTML com os dados do primeiro artista
    artistNameElement.innerText = firstArtist.name;
    artistImageElement.src = firstArtist.urlImg;

    // Mostra a seção do artista e esconde as playlists
    resultArtist.classList.remove('hidden');
    resultPlaylist.classList.add('hidden');
}

// Função auxiliar para esconder os resultados do artista e mostrar playlists
function hideArtistResults() {
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden'); // Mostra as playlists novamente
}

// Event listener para o campo de busca
// Usar 'input' é melhor que 'change' para buscas em tempo real
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // trim() remove espaços extras

    // Se o campo de busca estiver vazio, mostra as playlists e esconde o artista
    if (searchTerm === '') {
        hideArtistResults();
        return; // Não faz a chamada da API se o campo estiver vazio
    }

    // Se tiver algo digitado, chama a API
    requestApi(searchTerm);
});

// Opcional: Chamar hideArtistResults no início para garantir o estado inicial correto
hideArtistResults();




// function requestApi(searchTerm) {
//     const url = `http://localhost:3000/artists?name_like=${serchTerm}`
//     fetch(url)
//         .then((response) => response.json())
//         .then((result) => displayResults(result))
// }

// function displayResults(result) {
//     resultPlaylist.classList.add('hidden');
//     const artistName = document.getElementById('artist-name');
//     const artistImage = document.getElementById('artist-img');

//     result.forEach(element => {
//         artistName.innerText = element.name;
//         artistImage.src = element.urlImg;
//     });

//     resultArtist.classList.remove('hidden');
// }

// document.addEventListener('input', function() {
//     const searchTerm = searchInput.value.toLowerCase();
//     if (searchTerm === '') {
//         resultPlaylist.classList.add('hidden');
//         resultArtist.classList.remove('hidden');
//         return;
//     }

//     requestApi(searchTerm);
// })