Pulse Tap
Pulse Tap is an engaging tap-based game that allows users to earn coins, complete social tasks, and track their progress through a leaderboard. The application integrates with the TON wallet for payments and offers various features to enhance the gaming experience.

Features
Tap to Earn: Users can tap to earn coins and increase their total taps.
Statistics Tracking: View detailed statistics including total taps and hourly income.
Social Tasks: Complete social tasks to earn rewards.
Daily Bonuses: Claim daily bonuses for consistent engagement.
Leaderboard: Compete with other players on a global leaderboard.
Connect Wallet: Users can connect their TON wallet to unlock premium features (requires payment).
Getting Started
Prerequisites
Node.js (version 14 or higher)
npm or yarn
A TON wallet for payment integration
Installation
Clone the repository:

bash

Verify

Open In Editor
Edit
Copy code
git clone https://github.com/yourusername/pulse-tap.git
cd pulse-tap
Install the dependencies:

bash

Verify

Open In Editor
Edit
Copy code
npm install
or

bash

Verify

Open In Editor
Edit
Copy code
yarn install
Set up Firebase:

Create a Firebase project and configure Firestore.
Replace the Firebase configuration in src/lib/firebase.ts with your project's credentials.
Set up TON Connect:

Follow the TON Connect documentation to integrate the TON wallet.
Running the Application
To start the development server, run:

bash

Verify

Open In Editor
Edit
Copy code
npm run dev
or

bash

Verify

Open In Editor
Edit
Copy code
yarn dev
Open your browser and navigate to http://localhost:3000 to view the application.

Building for Production
To build the application for production, run:

bash

Verify

Open In Editor
Edit
Copy code
npm run build
or

bash

Verify

Open In Editor
Edit
Copy code
yarn build
This will create an optimized build in the dist folder.

Usage
Connecting Your Wallet: Click the "Connect Wallet" button to link your TON wallet. A payment of 5 TON is required to unlock premium features.
Tapping: Tap the main button to earn coins. Your total taps and coins will be displayed on the screen.
Completing Tasks: Navigate to the "Social" page to complete social tasks and earn additional rewards.
Claiming Daily Bonuses: Visit the "Stats" page to claim your daily bonuses.
Viewing Leaderboard: Check the "Leaderboard" page to see how you rank against other players.
Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Vite for the fast development experience.
React for building user interfaces.
Firebase for backend services.
TON for blockchain integration.
