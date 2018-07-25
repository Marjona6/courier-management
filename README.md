# Courier Management System

Shipment management system prototype for Saloodo.

## Purpose

To enable a private delivery service to collect and deliver parcels. The system lets a manager use a Management Dashboard to view, track, assign, and manage a list of all shipments. A separate, mobile-responsive user interface (the Courier To-Do Web Tool) allows bike couriers to track the shipments assigned to them and register a timestamp for pickup and delivery of the shipments, which is viewable to a manager from the Management Dashboard.

## Installation

Clone or download the repository, then from the command line, run `npm install` and `npm run start`. The system should open in a new browser window or tab automatically at <http://localhost:3000>.

## Technologies Used

**Back end:**

* Node.js
* Express
* MongoDB
* Mongoose

**Front end:**

* React
* React Router

**Testing:**

* Mocha
* Chai
* Faker

## API

Endpoints for shipments, couriers, bundles.

## Bundles: Proposed Front-End Treatment

Currently, shipments are displayed individually. Bundles can be displayed as grouped shipments, visually identified as a bundle by spacing and borders to set the group apart from other groups and individual shipments.

## Development Roadmap

1. Use MobX (<https://mobx.js.org/getting-started.html>) to manage state in front end.
2. Break the front end into smaller components (e.g., individual components for each button type rather than reusing a generic button type and passing in props).
3. Refactor to use styled components (potentially).
4. Add feature: allow users to sort and filter shipments by order status, address, and other criteria.
5. Unit test front end.
6. Display courier name instead of ID in Management Dashboard.
7. Use Socket.io or other websocket technology to update Manager Dashboard and Courier Web To-Do Tool in realtime when shipments are created or updated (priority).
8. Use sessions, login, and authentication to ensure only authorized managers and couriers can access the tools.
9. Do more thorough testing of API endpoints and integration tests.
10. Display assignment, pickup, and delivery times in a more human-readable format on the front end.

