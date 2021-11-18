import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  Flex,
  Box,
  Center,
  Button,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue("gray.800", "white")

  return (
    <Flex color="black" wrap="wrap">
      <Center w="100%">
        <img src={logo} className="App-logo" alt="logo" />
      </Center>
      <Center w="100%" color={color}>
        Hello Vite + React + Electron!<br/>
        Use Chakra UI!<br/>
        env.VITE_TEST: {import.meta.env.VITE_TEST}<br/>
        version: { window.ipc.getVersion() }
      </Center>
      <Box w="100%" textAlign="center" margin="0 10%" color={color}>
        <p>
          <Button colorScheme="blue" onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark 🌝" : "Light 🌞"}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </Box>
    </Flex>
  )
}
