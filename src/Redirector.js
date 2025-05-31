import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirector({ user, signOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    const groups = user?.signInUserSession?.idToken?.payload["cognito:groups"];
    console.log("Redirecting based on groups:", groups);

    if (groups?.includes("admin")) {
      navigate("/admin");
    } else if (groups?.includes("transporter")) {
      navigate("/transporter");
    } else {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Redirecting...</h1>
    </main>
  );
}

export default Redirector;
