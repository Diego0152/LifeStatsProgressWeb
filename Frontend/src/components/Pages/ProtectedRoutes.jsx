import { Navigate } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>INICIALIZANDO_SISTEMA...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

export default ProtectedRoute;