# Weather app

A weather application with interactive data visualisations built with Vite and Nivo.

## Quick start

```bash
# Clone the repository
git clone git@github.com:RosalindHook/weather-app.git
cd weather-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenWeatherMap API key to .env

# Start development server
npm run dev
```

## Tech stack
* React 18 - UI framework
* Vite - Build tool and dev server
* Axios - HTTP client for API calls
* Nivo - Data visualisation library (planned)
* Vitest - Testing framework
* React Testing Library - Component testing utilities

## Testing
Test coverage is currently 7 total tests covering service (API integration and error handling) and component tests (UI behaviour and user interactions). To run the tests:

```bash
npm test
```
## API integration
The app uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data.

### Current Implementation
- **Current weather data** for hardcoded London location
- **Error handling** for API failures
- **Mocked testing** for reliable test suite

### Planned Features
- **City search** with autocomplete
- **5-day forecast** data integration
- **Geolocation** support for current location
- **API response caching** for performance

## Project structure
Current structure:
```
src/
├── components/          # Reusable UI components
│   ├── WeatherTest.jsx  # Basic weather API test component
│   └── __tests__/       # Component tests
├── services/            # API and business logic
│   ├── weatherAPI.js    # OpenWeatherMap integration
│   └── __tests__/       # Service tests
└── test/
    └── setup.js         # Test environment configuration

```
## Development workflow
* **main**: production-ready code
* **develop**: integration branch for features
* **feature branches**: individual feature development (see plan below)

## High level plan

### Phase 1: Core functionality
- [x] Basic API integration
- [x] Testing setup (unit tests)
- [ ] GitLab CI/CD integration

### Phase 2: User features (+ related tests)
- [ ] City search functionality
- [ ] 5 day forecast display
- [ ] State management implementation + tests
- [ ] Integration testing (real API calls)

### Phase 3: UI/UX (+ related tests)
- [ ] Responsive design
- [ ] Interactive weather visualisations
- [ ] Loading states and error handling

### Phase 4: Optimisation
- [ ] Performance optimisation (caching, lazy loading)
- [ ] E2E testing - user journeys
- [ ] Accessibility improvements
- [ ] Visual regression testing



