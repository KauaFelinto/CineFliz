import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/Screens/Home';
import { Routes } from './src/routes';
import { MovieProvider } from './src/Contexts/MoviexContext';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
     <MovieProvider>
        <StatusBar style="light" translucent backgroundColor='#303030'/>
        <Routes />
      </MovieProvider>
    </>
  );
}

