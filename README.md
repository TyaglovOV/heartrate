# Test project for Akvelon

# Task: Heart Rate Animation Application

## Objective
The goal of this assignment is to evaluate the candidate's proficiency in **JavaScript**, **TypeScript**, and **React** by creating a heart rate animation application.

---

## Description
Create a heart rate animation application where a heart image pulsates based on the current heart rate value.

The heart rate value can be adjusted in three ways:
1. **Input Field**: Allow users to manually enter a heart rate value.
2. **Buttons**: Provide buttons to increment/decrement the heart rate by specific values (e.g., +1, +2, +5, +10, +50, -1, -2, etc.).
3. **Websockets**: Get the heart rate value from a mock server at regular intervals.

Include a toggle labeled **"Server Heart Rate"** to switch between client-based and server-based heart rate values:
- **On**: The heart rate is strictly fetched from the server (once every 5 seconds).
- **Off**: The heart rate is strictly controlled on the client side using the input field or buttons.

Additional constraints:
- The heart rate value should always remain within the range of **26 to 250 BPM** (the server will also send values within this range).
- Based on the current heart rate value, the heart should change color:
    - **Green**: Below 111 BPM
    - **Yellow**: Between 111 and 180 BPM
    - **Red**: Above 181 BPM

Use **MSW (websockets)** to mock backend behavior → [MSW Docs](https://mswjs.io/docs/basics/handling-websocket-events).

You can use any heart image, but **SVG** is recommended, e.g. [Heart SVG](https://www.svgrepo.com/svg/525369/heart).

---

## Requirements

### Heart Animation
- The heart should pulsate smoothly based on the current heart rate value.
- The animation speed should reflect the heart rate (faster for higher rates, slower for lower rates).

### Heart Rate Control
- Implement an input field for manual heart rate entry.
- Provide buttons to increment/decrement the heart rate by specific values.
- Fetch heart rate values from a mock server at regular intervals when the **"Server Heart Rate"** toggle is on.

### Toggle Functionality
- The **"Server Heart Rate"** toggle should switch between client-based and server-based heart rate control.
- Ensure the heart rate value is strictly controlled by the selected mode (client or server).

### Color Coding
- **Green**: Below 111 BPM
- **Yellow**: Between 111 and 180 BPM
- **Red**: Above 181 BPM

### Validation
- Ensure the heart rate value stays within the range of **26 to 250 BPM**.
- Display an error message if the user enters an invalid value.

---

## Evaluation Criteria

### Functionality
- All features work as expected, including heart rate control, animation, and color changes.
- Smooth transitions between client-based and server-based modes.

### Code Quality
- Clean, modular, and reusable code.
- Proper use of TypeScript for type definitions.

### User Experience
- Intuitive controls and clear visual feedback.
- Handles edge cases gracefully (e.g., invalid input, rapid changes).

### Creativity
- Polished animation and design.
- Optional enhancements (e.g., advanced animations, additional features).

run:
```
npm install
npm run dev
```
