import React from 'react';

export default function Main()
{
    const [textBoxValue, setTextBoxValue] = React.useState('') 
    
    function generateRandomString(length) {
        //initializing a character set with captial letters, lower case letters,
        //numbers, and special characters
        const charset =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        
        //initializing an empty array with the length of the parameter
        //(im using 15 when I call the function)
        const randomStringArray = new Array(length);

        //This creates an array of unsigned 32-bit intergers
        const values = new Uint32Array(length);
      
        //This randomly assigns each of the intergers a random 32-bit value
        //0 to 4,294,967,295
        window.crypto.getRandomValues(values);
      
        for (let i = 0; i < length; i++) {
          const randomIndex = values[i] % charset.length;
          randomStringArray[i] = charset.charAt(randomIndex);
        }
      
        return randomStringArray.join('');
      }

    function generateNewPassword(){
        let pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let pwdLen = 15;
        let randPassword = generateRandomString(15)
        setTextBoxValue(randPassword)
    }

    function copyToClipboard()
    {
        navigator.clipboard.writeText(textBoxValue);
    }

    return (
        <main>
            <input 
                readOnly
                className='main--textbox'
                type="textbox" 
                placeholder='Here is your password'
                value={textBoxValue}
            />
            <button className='generate--button' onClick={generateNewPassword}>Generate</button>
            <button className='copy--button' onClick={copyToClipboard}>Copy to Clipboard</button>
        </main>
    )
}
