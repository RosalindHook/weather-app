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