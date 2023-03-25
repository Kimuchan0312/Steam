const display = document.querySelector(".col-9");
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-outline-primary");

// Build API URL
const buildApiUrl = (endpoint = "", options = {}) => {
  const baseUrl = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
  const queryParams = new URLSearchParams();

  if (options.searchQuery) {
    queryParams.append("q", options.searchQuery);
  }

  if (options.genres) {
    queryParams.append("genres", options.genres);
  }

  if (options.steamspy_tags) {
    queryParams.append("steamspy_tags", options.steamspy_tags);
  }

  if (options.page) {
    queryParams.append("page", options.page);
  }
  
  const appIdSegment = options.appId ? `/${options.appId}` : "";
  return `${baseUrl}/${endpoint}${appIdSegment}?${queryParams.toString()}`;
};


// Fetch data from API
const fetchData = async (endpoint, options = {}) => {
  try {
    const url = buildApiUrl(endpoint, options);
    const res = await fetch(url);
    const data = await res.json();
    console.log('Response data:', data);
    console.log('url:', url);
    return data.data;
  } catch (err) {
    console.log("err", err);
  }
};

// Render game detail
const renderDetail = async (data) => {
  console.log('data:', data);
  display.innerHTML = "";
  const newDiv = document.createElement("div");
  const priceText = data.price > 0 ? `$${data.price}` : "Free to Play";
  newDiv.innerHTML =`
    <div class="showing_game show_detail">
      <div class="title_contain">
        <h3 class="title">${data.name}</div>
        <h6 class="price">Price: ${priceText}</div>
      </div>
      <div class="img_detail">
        <img src="${data.header_image}" alt="${data.name}"/>
        <div class="game_details">
          <div class="game_description">${data.description}</div>
          <div class="game_information" >
            <p>Release date: ${data.release_date}</p>
            <p>Developer: ${data.developer}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
    <div class="tags_label">Popular user-defined tags for this product:</div>
     <div class="row">
     <div class="col-3 tag-button"><a onclick="handleTagClick('${data.steamspy_tags[0]}', event)"${data.steamspy_tags[0]}</a></div> 
     <div class="col-3 tag-button"><a onclick="handleTagClick('${data.steamspy_tags[1]}', event)">${data.steamspy_tags[1]}</a></div> 
     <div class="col-3 tag-button"><a onclick="handleTagClick('${data.steamspy_tags[2]}', event)">${data.steamspy_tags[2]}</a></div> 
     </div>
    </div> 
  `;
  display.appendChild(newDiv);
};

// Get and display app detail
const renderDisplay = async (endpoint, selectedGenres = [], selectedTags = [], searchQuery = '') => {
  // Clear the existing games from the display container
  display.innerHTML = '';

  const options = {
    genres: selectedGenres.map(genre => genre.toLowerCase()).join(','),
    steamspy_tags: selectedTags.map(tag => tag.toLowerCase()).join(','),
    searchQuery: searchQuery
  }; 

  allGames = await fetchData(endpoint, options);
  console.log('options:', JSON.stringify(options));

  if (Array.isArray(allGames)) {
    allGames.forEach((game) => {
      renderGame({
        appId: game.appid,
        imgUrl: game.header_image,
        title: game.name,
        price: game.price > 0 ? `$${game.price}` : "Free to Play",
        genres: game.genres,
      });
    });
  } else {
    console.error('allGames is not an array:', allGames);
  }
};

const appDetail = async (appId) => {
  const data = await fetchData("single-game", { appId });
  renderDetail(data);
};

const renderGame = (el) => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="game_wrapper">
  <div class="cover">
  <img src="${el["imgUrl"]}" data-id="${el["appId"]}"/>
  <div class="game_info">
  <p class="title">${el["title"]}</p>
  <p>Price: ${el["price"]}</p>
  <p class="genre-tag">Genres: ${el["genres"]}</p>
  </div>
  </div>
  </div>`;
  display.appendChild(newDiv);
  // Add the click event listener to the cover div
  const coverDiv = newDiv.querySelector(".cover");
  coverDiv.addEventListener("click", () => appDetail(el["appId"]));
};

const renderFeatures = async () => {
  await renderDisplay("features");
};

// Genre click (API search by genres)
const genreButtons = document.querySelectorAll(".genre-button");
genreButtons.forEach((button) => button.addEventListener("click", async (e) => {
  const selectedGenres = e.target.getAttribute('data-genre');
  await renderDisplay("games",[selectedGenres]);
}));

// Tags click (API search by tags term)
const handleTagClick = async (tag, event) => {
  event.preventDefault();
  const selectedTags = [tag];
  await renderDisplay("games", [], selectedTags);
};

// Search input (API search by input term)
searchButton.addEventListener("click", (e) => {
  const value = searchInput.value;
  renderDisplay([], [], [value]);
});


