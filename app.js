function search(category, callback) {
    $.ajax({
        type: "GET",
        url: "https://swapi.co/api/" + category,
        success: callback
    });
}

function findItemById(items, id) {
    for (var item of items) {
        var url = item.url;
        if (parseInt(url.substring(url.length - 1, url.length - 2)) === parseInt(id)) {
            console.log(item);
            return item;
        }
    }
}

function appendItem(ul, item, prop) {
    ul.append('<li value=' + item.url.substring(item.url.length - 1, item.url.length - 2) + '><h4>' + item[prop]);
}

var films = [];
var people = [];
var planets = [];
var species = [];
var starships = [];
var vehicles = [];
var all = [films, people, planets, species, starships, vehicles];
var $results = $('.js-search-results');


$('.js-search-form').submit(function(event) {
    event.preventDefault();
    var selectedCategory = $("#movie_categories option:selected").text().toLowerCase();
    search(selectedCategory, function(response) {
        $('.js-search-results').empty();
        $('.single').empty();
        for (var list of all) {
            if (list.length) {
                list.length = 0;
            }
        }

        for (var item of response.results) {
            if (item.hasOwnProperty("title")) {
                films.push(item);
                appendItem($results, item, "title");
            }

            if (item.hasOwnProperty("birth_year")) {
                people.push(item);
                appendItem($results, item, "name");
            }

            if (item.hasOwnProperty("climate")) {
                planets.push(item);
                appendItem($results, item, "name");

            }

            if (item.hasOwnProperty("average_lifespan")) {
                species.push(item);
                appendItem($results, item, "name");
            }

            if (item.hasOwnProperty("MGLT")) {
                starships.push(item);
                appendItem($results, item, "name");
            }

            if (item.hasOwnProperty("vehicle_class")) {
                vehicles.push(item);
                appendItem($results, item, "name");
            }
        }
    });
});

$results.on('click', 'li', function() {
    if (films.length) {
        $('.single').empty();
        var film = findItemById(films, $(this).val());
        $('.single').append('<h3>Movie title: ' + film.title + '</h3><p>Episode Id: ' + film.episode_id + '<p>Director: ' + film.director + '</p><p>Producer: ' + film.producer + '</p><p>Release date: ' + film.release_date + '</p><p>Opening crawl:' + film.opening_crawl);
    }
    if (people.length) {
        $('.single').empty();
        var person = findItemById(people, $(this).val());
        $('.single').append('<h3>Name: ' + person.name +
            '</h3><p>Birth year: ' + person.birth_year +
            '</p><p>Gender: ' + person.gender +
            '</p><p>Heigth: ' + person.height +
            '</p><p>Mass: ' + person.mass +
            '</p><p>Hair color: ' + person.hair_color +
            '</p><p>Skin color: ' + person.skin_color +
            '</p><p>Eye color: ' + person.eye_color +
            '</p><p>Homeworld: <a href="' + person.homeworld + '">' + person.homeworld + '</a>');
    }
    if (planets.length) {
        $('.single').empty();
        var planet = findItemById(planets, $(this).val());
        $('.single').append('<h3>Name: ' + planet.name +
            '</h3><p>Planet population: ' + planet.population +
            '</p><p>Planet climate: ' + planet.climate +
            '</p><p>Rotation Period: ' + planet.rotation_period +
            '</p><p>Orbital Period: ' + planet.orbital_period +
            '</p><p>Diameter: ' + planet.diameter +
            '</p><p>Gravity: ' + planet.gravity +
            '</p><p>Terrain: ' + planet.terrain +
            '</p><p>Surface Water: ' + planet.surface_water);
    }
    if (species.length) {
        $('.single').empty();
        var specie = findItemById(species, $(this).val());
        $('.single').append('<h3>Specie name: ' + specie.name +
            '</h3><p>Language: ' + specie.language +
            '</p><p>Classification: ' + specie.classification +
            '</p><p>Designation: ' + specie.designation +
            '</p><p>Average height: ' + specie.average_height +
            '</p><p>Hair colors: ' + specie.hair_colors +
            '</p><p>Skin colors: ' + specie.skin_colors +
            '</p><p>Eye colors: ' + specie.eye_colors +
            '</p><p>Average lifespan: ' + specie.average_lifespan +
            '</p><p>Homeworld: <a href="' + specie.homeworld + '">' + specie.homeworld + '</a>');
    }
    if (starships.length) {
        $('.single').empty();
        var starship = findItemById(starships, $(this).val());
        $('.single').append('<h3>Starship name: ' + starship.name +
            '</h3><p>Model: ' + starship.model +
            '</p><p>Manufacturer: ' + starship.manufacturer +
            '</p><p>Cost in credits: ' + starship.cost_in_credits +
            '</p><p>Length: ' + starship.length +
            '</p><p>Max atmosphering speed: ' + starship.max_atmosphering_speed +
            '</p><p>Crew: ' + starship.crew +
            '</p><p>Number of passengers: ' + starship.passengers +
            '</p><p>Cargo capacity: ' + starship.cargo_capacity +
            '</p><p>Consumables: ' + starship.consumables +
            '</p><p>Hyperdrive rating: ' + starship.hyperdrive_rating +
            '</p><p>MGLT: ' + starship.MGLT +
            '</p><p>Starship class: ' + starship.starship_class);
    }
    if (vehicles.length) {
        $('.single').empty();
        var vehicle = findItemById(vehicles, $(this).val());
        $('.single').append('<h3>Vehicle name: ' + vehicle.name +
            '</h3><p>Model: ' + vehicle.model +
            '</p><p>Manufacturer: ' + vehicle.manufacturer +
            '</p><p>Cost in credits: ' + vehicle.cost_in_credits +
            '</p><p>Length: ' + vehicle.length +
            '</p><p>Max atmosphering speed: ' + vehicle.max_atmosphering_speed +
            '</p><p>Crew: ' + vehicle.crew +
            '</p><p>Number of passengers: ' + vehicle.passengers +
            '</p><p>Cargo capacity: ' + vehicle.cargo_capacity +
            '</p><p>Consumables: ' + vehicle.consumables);
    }
});
