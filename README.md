# Weather app

A weather application with interactive data visualisations built with Vite and Nivo. The deployed application is available [here](https://rosalindhook.gitlab.io/weather-app/).

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

## Deployment
This weather application is deployed using GitLab Pages (from GitLab) with a CI/CD pipeline. The deployment is configured broadly following the approach outlined in [this tutorial](https://www.lafosseacademy.com/insights/student-tutorial-react-and-gitlab-pages/), adapted for Vite instead of Create React App.

### CI/CD pipeline
The `.gitlab-ci.yml` file defines a three-stage pipeline:

1. **Build stage**: Installs dependencies and builds the Vite application, packaging the build as a 'dist' package for deployment.
2. **Test stage**: Runs the complete test suite with Vitest
3. **Deploy stage**: Deploys to GitLab Pages with proper routing setup

### Limitations
**Import method:** Due to using GitLab's free tier, the deployment process uses a manual import method rather than automated mirroring. For production applications, a paid GitLab tier would enable automatic repository mirroring and more sophisticated CI/CD workflows, including deployment updates whereby changes would be pushed to GitLab's copy of the repository and tests run automatically as part of the CI/CD pipeline.
**Security considerations:** For deployment, the OpenWeatherMap API key has been added as a masked CI/CD environment variable on GitLab, but it is important to note that this means the API key could potentially be exposed in the browser through inspecting the source code or network requests. This security limitation is acknowledged as a trade-off for MVP development speed (and OpenWeatherMap's free tier has rate limiting which also provides some protection), but this would need to be addressed in any production deployment, for example by using a backend and server-side proxy.

## High level plan

### Phase 1: Core functionality
- [x] Basic API integration
- [x] Testing setup (unit tests)
- [x] GitLab CI/CD integration

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



