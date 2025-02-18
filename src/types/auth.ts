export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    panNumber: string;
    dateOfBirth: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    verificationId: string | null;
}

// contexts/AuthContext.ts
export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // Add this to handle loading state
    login: (token: string, user: User) => void;
    logout: () => void;
}