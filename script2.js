// Function to translate the page into Russian
function translateToRussian() {
    document.getElementById('pageTitle').innerText = 'Присоединение к группе ботов';
    document.getElementById('usernameLabel').innerText = 'Имя пользователя Roblox:';
    document.getElementById('botCountLabel').innerText = 'Сколько аккаунтов присоединятся к группе? (1 - 70):';
    document.getElementById('submitButton').innerText = 'Отправить';
}

// Function to fetch the user's location using GeoIP
async function getGeoLocation() {
    try {
        // You can replace this with a paid service like MaxMind if needed.
        let response = await fetch('https://ipinfo.io/json?token=your_api_token'); // Use your GeoIP API token here
        let data = await response.json();
        
        // Check if the user is from Russia or Kazakhstan
        const country = data.country;
        if (country === 'RU' || country === 'KZ') {
            translateToRussian();
        }
    } catch (error) {
        console.error('Error fetching geo-location:', error);
    }
}

// Run the geo-location check on page load
window.onload = function() {
    getGeoLocation();
};
