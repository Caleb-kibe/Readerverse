import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};


// // auth/hooks/useAuth.js
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthProvider';

// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default useAuth;
