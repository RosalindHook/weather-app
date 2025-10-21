# Weather app

A weather application with interactive data visualisations built with Vite and Nivo. It features flip cards, temperature gauges, weather condition avatars and 5 day forecast heatmaps.

**[Live demo](https://weather-app-a31b04.gitlab.io/)**

## Prerequisites

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **OpenWeatherMap API key** - [Get free key](https://openweathermap.org/api)
- **Git** - For cloning the repository

Check your Node version:
```bash
node --version
```

## Quick start

```bash
git clone git@github.com:RosalindHook/weather-app.git
cd weather-app
npm install

# Add your OpenWeatherMap API key to .env

# Start development server
npm run dev
```

## Tech stack
* React - UI framework with custom hooks
* Material-UI (MUI) - component library and responsive design
* Vite - Build tool and dev server
* Nivo - Data visualisation library for interactive charts and heatmaps
* Vitest and React Testing Library - Testing framework

## Key features
### Interactive Visualisations
- Temperature gauge - arc-style gauge showing current temperature with color-coded ranges
- 5-Day Forecast heatmap - colour-coded temperature visualization with embedded values
- Weather condition avatars - visual weather icons with day/night detection
- Flip cards - current weather (front) and 5-day forecast (back)

### User experience
- Multiple cities - add up to 3 cities side by side
- Input validation - Real-time validation with helpful messages
- Error handling - graceful API failure handling
- Responsive design - works on all screen sizes
  
## Testing
Test coverage includes:
- Integration tests for user workflows
- Component behaviour and interaction testing
- API integration testing
- Data processing and visualisation helpers

To run the test suite:
```bash
npm test
```
## API integration
The app uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data.

## Architecture
Clean component architecture with:

- **Single responsibility components**
- **Custom Hooks** for state management
- **Semantic HTML** structure (dl/dt/dd)
- **Error boundaries** for robust error handling

## Deployment
Deployed on GitLab Pages [here](https://weather-app-a31b04.gitlab.io/) from development branch for assessment purposes. Production deployments would follow proper Git workflow practices (main/production branch).

**CI/CD Pipeline:**
* Automated builds and testing
* Environment variable management
* Multi-stage deployment process

## Security note
API key is exposed client-side (acceptable for MVP with rate-limited free tier, but would require backend proxy for production).

## Project structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── scenes/             # Page-level components
├── services/           # API integration
├── utils/              # Helper functions
└── __tests__/          # Test files
```
