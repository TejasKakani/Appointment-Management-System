# AI Agent Instructions for Appointment Management System

## Project Overview
This is a Next.js-based appointment management system that enables patients to schedule appointments with doctors. The system follows a modern full-stack architecture with MongoDB as the database.

## Key Architecture Components

### Data Models
- `User` (`src/models/user.model.ts`): Represents both doctors and patients with role-based fields
  - Doctors have additional fields: specialization, availability, slotDuration
  - Patients have basic user fields: name, email, phone
- `Appointment` (`src/models/appointment.model.ts`): Manages appointment data with status tracking

### API Structure
- Route handlers organized by domain under `src/app/api/`:
  - `common/`: Shared appointment operations
  - `doctor/`: Doctor-specific endpoints
  - `patient/`: Patient-specific endpoints
  - `users/`: Authentication and user management

### Frontend Components
- Pages follow Next.js App Router convention in `src/app/`
- Reusable components in `src/components/`
- Main flows:
  - Appointment creation (`create-appointment/`)
  - Appointment listing (`list-appointments/`)
  - User authentication (`sign-in/`, `sign-up/`)

## Development Workflows

### Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Key Patterns

1. **Authentication Flow**
   - Email verification required after signup
   - JWT-based authentication using middleware
   - See `src/middleware.ts` for protected route handling

2. **Appointment Management**
   - Status transitions: scheduled → completed/canceled/no-show
   - Availability check before scheduling (`src/utils/generateSchedule.ts`)
   - Reschedule support with status tracking

3. **API Response Format**
   - Consistent error handling using HTTP status codes
   - MongoDB validation integrated with API responses
   - Type safety enforced through TypeScript interfaces

## Integration Points
- MongoDB connection managed through `src/utils/mongodb-connect.ts`
- Email service integration via `src/utils/mailer.ts`
- Authentication tokens handled in `src/utils/getTokenPayload.ts`

## Common Tasks

### Adding New API Endpoints
1. Create route handler in appropriate domain folder under `src/app/api/`
2. Use existing models or extend as needed
3. Follow authentication middleware pattern if protected
4. Implement proper error handling

### Modifying Appointment Logic
1. Update `appointment.model.ts` for data structure changes
2. Adjust related API handlers in `src/app/api/common/`
3. Update frontend components as needed
4. Consider impacts on schedule generation (`generateSchedule.ts`)

### User Management Changes
1. Modify `user.model.ts` for schema changes
2. Update related API handlers in `src/app/api/users/`
3. Consider authentication impact
4. Update profile components if needed