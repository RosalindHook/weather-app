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
* React 18 - UI framework with custom hooks for state management
* Material-UI (MUI) - component library and styling
* Vite - Build tool and dev server
* Axios - HTTP client for API calls
* Nivo - Data visualisation library (planned)
* Vitest - Testing framework
* React Testing Library - Component testing utilities

## Testing
Test coverage includes integration tests for full user interaction flows, API integration, component behaviour and input validation. Tests focus on real user workflows and cross-component functionality.

There are also isolated unit tests for priority components (where there is sufficient complexity e.g. logic or multiple props/states), helper functions, and hook tests (to follow).

To run the test suite:
```bash
npm test
```
## API integration
The app uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data.

### Current implementation
- **Multiple weather cards** - Add up to three cities side by side with independent functionality
- **Interactive flip cards** - Click weather cards to flip between current weather and 5-day forecast
- **Input validation** - real time validation with user-friendly error messages and guidance
- **Semantic HMTL structure** - uses definition lists (dl/dt/dd) for accessible weather data display
- **Clean component architecture** - focused, single-responsiblity components for maintainability
- **Enhanced state management** - custom hooks for clean architecture and reusable logic
- **Intelligent UX features** - Duplicate city prevention, user guidance, and intuitive error handling
- **Robust error handling** - API failures, invalid city names, and comprehensive input validation
- **API integration** - Combined calls for current weather and 5-day forecast data
- **Integration testing** - Real user workflow testing across component boundaries

### Architecture
The application now follows clean architecture principles with focused, reusable components:

- **Single responsibility** - each component has one clear purpose
- **Reusability** - components can be used in different contexts
- **Props interface** - Clear, minimal prop requirements
- **Separation of concerns** - Container vs presentational component patterns

## Project structure
Current structure:
```
src/
├── components/                     # Reusable UI components
│   ├── WeatherCard.jsx             # Main weather card container
│   ├── FlipCard.jsx                # Reusable flip card container
│   ├── RemoveButton.jsx            # City removal functionality
│   ├── CurrentWeatherView.jsx      # Current weather display
│   ├── ForecastView.jsx            # 5-day forecast display
│   ├── ForecastDay.jsx             # Individual day forecast
│   ├── WeatherDataList.jsx         # Semantic weather data display (dl/dt/dd)
│   ├── CityHeader.jsx              # Reusable city name and flag display
│   ├── CitySearchForm.jsx          # Search form with validation
│   ├── StatusMessages.jsx          # Error and helper message display
│   ├── CityGrid.jsx                # City cards layout container
│   ├── EmptyState.jsx              # Empty state display
│   └── __tests__/                  # Component tests (for priority components, skipping those well-tested through integraiton)
├── hooks/                          # Custom React hooks for state management
│   ├── useFormValidation.js        # Form input validation and state
│   ├── useMultipleCities.js        # Multiple cities state management
│   ├── useWeatherData.js           # Single city hook (unused - kept for future use)
│   └── __tests__/                  # Hook tests
├── scenes/                         # Page-level components
│   ├── WeatherScene.jsx            # Main weather dashboard orchestrator
│   └── __tests__/                  # Integration tests
├── services/                       # API and business logic
│   ├── weatherAPI.js               # OpenWeatherMap API integration
│   └── __tests__/                  # Service tests
├── utils/                          # Helper functions and utilities
│   ├── weatherHelpers.js           # Weather data processing and display helpers
│   └── __tests__/                  # Utility tests
└── test/
    └── setup.js                    # Test environment configuration


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

- **Import method:** Due to using GitLab's free tier, the deployment process uses a manual import method rather than automated mirroring. For production applications, a paid GitLab tier would enable automatic repository mirroring and more sophisticated CI/CD workflows, including deployment updates whereby changes would be pushed to GitLab's copy of the repository and tests run automatically as part of the CI/CD pipeline.

- **Security considerations:** For deployment, the OpenWeatherMap API key has been added as a masked CI/CD environment variable on GitLab, but it is important to note that this means the API key could potentially be exposed in the browser through inspecting the source code or network requests. This security limitation is acknowledged as a trade-off for MVP development speed (and OpenWeatherMap's free tier has rate limiting which also provides some protection), but this would need to be addressed in any production deployment, for example by using a backend and server-side proxy.

## High level plan

### Phase 1: Core functionality
- [x] Basic API integration
- [x] Testing setup (unit tests)
- [x] GitLab CI/CD integration

### Phase 2: User features (+ related tests)
- [x] City search functionality
- [x] 5 day forecast display
- [x] Add multiple cards to show cities side by side
- [x] State management implementation + tests
- [x] Integration testing (real API calls)

### Phase 2.5: Architecture improvements
- [x] Component refactoring for single responsibility
- [x] Semantic HTML implementation (dl/dt/dd structure)
- [x] Reusable component architecture
- [x] Clean separation of concerns
- [x] Improved accessibility and maintainability

### Phase 3: UI/UX (+ related tests)
- [ ] Responsive design
- [ ] Interactive weather visualisations
- [ ] Loading states and error handling

### Phase 4: Optimisation
- [ ] Performance optimisation (caching, lazy loading)
- [ ] E2E testing - user journeys
- [ ] Accessibility improvements
- [ ] Visual regression testing
