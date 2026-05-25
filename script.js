let characters = [];

fetch("data/characters.json")
  .then(res => res.json())
  .then(data => {

    characters = data;
    displayCharacters(data);

  });

const searchInput =
  document.getElementById("searchInput");

const categoryFilter =
  document.getElementById("categoryFilter");

searchInput.addEventListener(
  "input",
  filterCharacters
);

categoryFilter.addEventListener(
  "change",
  filterCharacters
);

function filterCharacters() {

  const keyword =
    searchInput.value.toLowerCase();

  const category =
    categoryFilter.value;

  const filtered = characters.filter(char => {

    const matchKeyword =

      char.name.toLowerCase().includes(keyword)

      ||

      char.ability.toLowerCase().includes(keyword)

      ||

      char.skills.some(skill =>
        skill.toLowerCase().includes(keyword)
      )

      ||

      char.tags.some(tag =>
        tag.toLowerCase().includes(keyword)
      );

    const matchCategory =

      category === ""

      ||

      char.category.main === category;

    return matchKeyword && matchCategory;

  });

  displayCharacters(filtered);

}

function displayCharacters(list) {

  const result =
    document.getElementById("result");

  result.innerHTML = "";

  if (list.length === 0) {

    result.innerHTML = `
      <div class="empty">
        검색 결과가 없습니다.
      </div>
    `;

    return;
  }

  list.forEach(char => {

    result.innerHTML += `

      <div class="card">

        <h2>${char.name}</h2>

        <div class="info">
          <span class="label">능력:</span>
          ${char.ability}
        </div>

        <div class="info">
          <span class="label">기술:</span>
          ${char.skills.join(", ")}
        </div>

        <div class="info">
          <span class="label">계열:</span>
          ${char.category.main}
          ·
          ${char.category.sub}
        </div>

        <div class="tag-box">

          ${char.tags.map(tag => `
            <div class="tag">${tag}</div>
          `).join("")}

        </div>

      </div>

    `;
  });

}
