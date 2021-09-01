import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export interface AuthContextProps {
  user?: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children?: ReactNode;
}

const USER_STORAGE_KEY = '@gofinances:user';

export function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userLogged));
      }

    } catch(err) {
      throw new Error(err);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!?.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName}&length=1`,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userLogged));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function signOut() {
    setUser(undefined);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }

      setIsLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
