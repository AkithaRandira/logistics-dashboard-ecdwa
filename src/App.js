import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route } from 'react-router-dom';

import TransporterDashboard from './TransporterDashboard'; // Now used as main dashboard
import Unauthorized from './Unauthorized'; // Keep if you want to use later

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Routes>
          <Route path="/" element={<TransporterDashboard user={user} signOut={signOut} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      )}
    </Authenticator>
  );
}

export default App;
