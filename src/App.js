import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Route-based components
import TransporterDashboard from './TransporterDashboard';
import AdminDashboard from './AdminDashboard';
import Unauthorized from './Unauthorized';

Amplify.configure(awsExports);

function RoleRedirect({ user, signOut }) {
  const navigate = useNavigate();
  const groups = user?.signInUserSession?.idToken?.payload["cognito:groups"];

  useEffect(() => {
    console.log("User groups from Cognito:", groups);
    if (groups?.includes("Transporters")) {
      navigate("/transporter");
    } else if (groups?.includes("Admins")) {
      navigate("/admin");
    } else {
      navigate("/unauthorized");
    }
  }, [groups, navigate]);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome, {user?.username}!</h1>
      <p>You are signed in ✅</p>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Routes>
          <Route path="/" element={<RoleRedirect user={user} signOut={signOut} />} />
          <Route path="/transporter" element={<TransporterDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      )}
    </Authenticator>
  );
}

export default App;
