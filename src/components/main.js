import React from 'react';

export default function Main()
{
    const [textBoxValue, setTextBoxValue] = React.useState('') 
    const [includeSpecialChars, setIncludeSpecialChars] = React.useState(false)

    function handleCheckboxChange()
    {
        setIncludeSpecialChars(!includeSpecialChars)
    }
    
    function generateRandomString(length, includeSpecialChars) {
        //initializing a character set with captial letters, lower case letters,
        //and numbers
        let charset =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        //if includeSpecialChars is true then append special characters to charset
        if(includeSpecialChars)
        {
            charset += '!@#$%^&*()_+[]{}|;:,.<>?';
        }
        
        //initializing an empty array with the length of the parameter
        //(im using 15 when I call the function)
        const randomStringArray = new Array(length);

        //This creates an array of unsigned 32-bit intergers
        const values = new Uint32Array(length);
      
        //This randomly assigns each of the intergers a random 32-bit value
        //0 to 4,294,967,295
        window.crypto.getRandomValues(values);
      
        //make random index and assign random string array with a character from charset
        for (let i = 0; i < length; i++) {
          const randomIndex = values[i] % charset.length;
          randomStringArray[i] = charset.charAt(randomIndex);
        }
      
        return randomStringArray.join('');
    }

    function generateNewPassword(){
        let randPassword = generateRandomString(15, includeSpecialChars)
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
            <div className='check--container'>
                <input 
                    className='main--checkbox'
                    type="checkbox" 
                    checked={includeSpecialChars}
                    onChange={handleCheckboxChange}
                />
                <p className='label'>Do you want special characters in your password?</p>
            </div>
            <button className='generate--button' onClick={generateNewPassword}>Generate</button>
            <button className='copy--button' onClick={copyToClipboard}>Copy to Clipboard</button>
        </main>
    )
}
