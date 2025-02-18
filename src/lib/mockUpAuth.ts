import { User } from "../types/auth";

// Mock user data
const MOCK_USERS: User[] = [
    {
        id: '1',
        phoneNumber: '+1234567890',
        name: 'John Doe',
        email: 'john@example.com',
        panNumber: 'ABCDE1234F',
        dateOfBirth: '1990-01-01'
    },
];

const VERIFICATION_DELAY = 1000;
const VALID_OTP = '123456';

export const sendOTP = async (phoneNumber: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, VERIFICATION_DELAY));
    return `mock-verification-id-${Date.now()}`;
};

export const verifyOTP = async (verificationId: string, otp: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, VERIFICATION_DELAY));

    if (otp !== VALID_OTP) {
        throw new Error('Invalid OTP');
    }

    // In a real app, you would verify against the verificationId as well
    const existingUser = MOCK_USERS.find(user => user.phoneNumber === '+1234567890');
    return existingUser || null;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, VERIFICATION_DELAY));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(user =>
        user.phoneNumber === userData.phoneNumber ||
        user.email === userData.email ||
        user.panNumber === userData.panNumber
    );

    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9)
    };

    MOCK_USERS.push(newUser);
    return newUser;
};