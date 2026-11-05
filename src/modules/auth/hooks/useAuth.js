import { useContext } from 'react';
import { AuthContext } from '../states/AuthContext';

export function useAuth() {
    return useContext(AuthContext);
}