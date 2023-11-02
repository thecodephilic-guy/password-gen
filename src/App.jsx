import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {

  //defining the variables:
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [passwordField, setPasswordField] = useState("")

  //use of Ref hook:
  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(passwordField)
  },
  [passwordField])

  //defining the function for password generation:
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%&*()_+="

    for(let i = 1; i<= length; i++){
      let char = Math.floor((Math.random() * str.length + 1))
      pass += str.charAt(char)
    }

    setPasswordField(pass)
  },
  [length, numberAllowed, charAllowed, setPasswordField])

  useEffect(() => {
    passwordGenerator()
  }, 
  [length, numberAllowed, charAllowed, setPasswordField])

  return (
    <div className="h-screen place-content-center grid">
      <div className="w-full max-w-lg mx-auto rounded-lg text-orange-500 bg-gray-700 py-2 px-1">
        <h1 className="uppercase tracking-wider font-bold	text-4xl antialiased my-4">
          password generator
        </h1>
        <div className="flex w-full max-w-md mx-auto items-center space-x-2 shadow rounded-lg overflow-hidden mb-4">
          <input
            className="w-full rounded-md border bg-white border-black/30 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="input"
            value={passwordField}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            type="button"
            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Copy
          </button>
        </div>

        <div className="flex w-full max-w-md mx-auto items-center space-x-2 mb-4">
          <input
            id="numberInput"
            type="checkbox"
            defaultChecked = {numberAllowed}
            className="w-4 h-4"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label
            for="numberInput"
            className="ml-2 text-sm font-medium text-orange-500 dark:text-gray-300"
          >
            Numbers
          </label>

          <input
            id="char-checkbox"
            type="checkbox"
            defaultChecked = {charAllowed}
            className="w-4 h-4"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label
            for="char-checkbox"
            className="ml-2 text-sm font-medium text-orange-500 dark:text-gray-300"
          >
            Characters
          </label>
          <div className="flex items-center gap-x-1 font-medium">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
