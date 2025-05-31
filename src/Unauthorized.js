import React from 'react';

function Unauthorized() {
  return (
    <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
      <h1>Access Denied</h1>
      <p>You are not authorized to view this page.</p>
    </div>
  );
}

export default Unauthorized;
