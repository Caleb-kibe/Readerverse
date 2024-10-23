function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/logout/', {
        method: 'POST',
        credentials: 'include',  // Important for session-based auth
      });

      if (response.ok) {
        alert('Logout successful!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;


// import React from 'react';
// import useAuth from '../hooks/useAuth';

// const Logout = () => {
//   const { handleLogout } = useAuth();

//   const onLogout = async () => {
//     try {
//       await handleLogout(); // Call the logout function from the context
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   return (
//     <button onClick={onLogout}>Logout</button>
//   );
// };

// export default Logout;
