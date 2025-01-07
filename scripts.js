
async function fetchAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error: error.message };
    }
}

let isStandingLoad = false;

document.getElementById('loadStandings').addEventListener('click', async () => {
    const data = await fetchAPI('https://ergast.com/api/f1/current/driverStandings.json');
    const container = document.getElementById('standings');

    if (data.error) {
        container.textContent = "Error loading points.";
        return;
    }

    const display = document.querySelector('#display-panis');

    if(!isStandingLoad){

        isStandingLoad = true;

        const standings = await  data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        display.textContent = '';
        display.style.display = 'block';
        const ol = document.createElement('ol');
    
        standings.forEach(driver => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            
            div.innerHTML = `<p>${driver.position}. ${driver.Driver.givenName} ${driver.Driver.familyName} - ${driver.points} points</p>`;
    
            li.appendChild(div);
    
    
            console.log(driver.position)
    
            ol.appendChild(li);
    
        });
        display.appendChild(ol);

        return;
    }

    display.textContent = '';
    display.style.display = 'none';
    isStandingLoad = false;

    // container.innerHTML = standings.map(driver => `
    //     <p>${driver.position}. ${driver.Driver.givenName} ${driver.Driver.familyName} - ${driver.points} points</p>
    // `).join('');
    // container.classList.remove('hidden');
});


let isConstructorLoading = false;

document.getElementById('loadConstructors').addEventListener('click', async () => {
    const data = await fetchAPI('https://ergast.com/api/f1/current/constructorStandings.json');
    const container = document.getElementById('constructors');

    if (data.error) {
        container.textContent = "Error loading constructors.";
        return;
    }

    const display = document.querySelector('#display-panis');

    if(!isConstructorLoading){


        isConstructorLoading = true;

        const constructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        
        display.textContent = '';
        display.style.display = 'block';
        const ol = document.createElement('ol');
    
        constructors.forEach(team => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            
            div.innerHTML = `<p>${team.position}. ${team.Constructor.name} - ${team.points} points</p>`;
    
            li.appendChild(div);
    
    
            console.log(team.position)
    
            ol.appendChild(li);
    
        });
        display.appendChild(ol);

        return;


    }

    display.textContent = '';
    display.style.display = 'none';
    isConstructorLoading = false;
    
});