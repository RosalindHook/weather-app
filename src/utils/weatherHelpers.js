// Returns a Unicode flag emoji from a 2-letter country code
export const getUnicodeFlagIcon = (countryCode) =>
    countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));

// Chooses a colour based on temperature
export const getWeatherColour = (temp) => {
    if (temp < 0) return '#74b9ff';
    if (temp < 15) return '#00b894';
    if (temp < 25) return '#e84393';
    return '#d63031';
};

// Function to work out if it is day or night
export const isDayTime = (weatherData) => {
    if (!weatherData) {
        console.log('isDayTime: No weatherData provided');
        return true;
    }
    
    console.log('isDayTime received:', weatherData)

    // API structure for sunrise and sunset weatherData.sys
    let sunrise, sunset;

    if (weatherData.sys?.sunrise && weatherData.sys?.sunset) {
        sunrise = weatherData.sys.sunrise;
        sunset = weatherData.sys.sunset;
        console.log('Using sys.sunrise/sunset');
    } else {
        console.log('No sunrise or sunset data found, assuming day');
        console.log('Available keys:', Object.keys(weatherData));
        return true;
    }

    const now = Math.floor(Date.now() / 1000);
    // simple comparison using UTC to determine if day
    const isDay = now >= sunrise && now <= sunset;

    console.log('Day/night check:', {
        now: new Date(now * 1000).toLocaleTimeString(),
        sunrise: new Date(sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(sunset * 1000).toLocaleTimeString(),
        isDay
    });

    return isDay;
};


// Groups forecast data into per-day summaries (min, max, avg temps and feels_like)
export const getDailySummaries = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];

    const byDate = {};

    for (const entry of forecastData.list) {
        const date = new Date(entry.dt * 1000).toISOString().split('T')[0]; // YYYY-MM-DD

        if (!byDate[date]) {
            byDate[date] = {
                count: 0,
                sumTemp: 0,
                sumFeels: 0,
                min: Infinity,
                max: -Infinity,
            };
        }

        const rec = byDate[date];
        const m = entry.main;

        rec.count += 1;
        rec.sumTemp += m.temp;
        rec.sumFeels += m.feels_like;
        rec.min = Math.min(rec.min, m.temp_min);
        rec.max = Math.max(rec.max, m.temp_max);
    }

    return Object.entries(byDate).map(([date, rec]) => ({
        date,
        avg: rec.sumTemp / rec.count,
        feels_avg: rec.sumFeels / rec.count,
        min: rec.min,
        max: rec.max,
    }));
};