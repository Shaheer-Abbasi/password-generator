import React from 'react';
import './main.css';

export default function Main()
{
    const [textBoxValue, setTextBoxValue] = React.useState('');
    const [includeSpecialChars, setIncludeSpecialChars] = React.useState(false);
    const [passwordFieldType, setPasswordFieldType] = React.useState("password");
    const [showButtonText, setShowButtonText] = React.useState("Show Password");
    const [toolTipDisplay, setToolTipDisplay] = React.useState("Copy to Clipboard");
    const [filterList, setFilterList] = React.useState('');
    const [passwordLength, setPasswordLength] = React.useState(15)

    function handleCheckboxChange()
    {
        setIncludeSpecialChars(!includeSpecialChars);
    }
    
    function generateRandomString(length, includeSpecialChars) {

        let charset =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        if(includeSpecialChars)
        {
            charset += '!@#$%^&*()_+[]{}|;:,.<>?';
        }

        if(includeSpecialChars && filterList)
        {
            charset = filterFunction();
        }

        const randomStringArray = new Array(length);

        const values = new Uint32Array(length);

        window.crypto.getRandomValues(values);

        for (let i = 0; i < length; i++) {
          const randomIndex = values[i] % charset.length;
          randomStringArray[i] = charset.charAt(randomIndex);
        }
      
        return randomStringArray.join('');
    }

    function filterFunction()
    {
       let charset = 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       if(includeSpecialChars)
       {
            charset += '!@#$%^&*()_+[]{}|;:,.<>?';
            if(filterList){
                for(let i = 0; i < filterList.length; i++)
                {
                    let charToBeRemved = filterList.charAt(i);
                    charset = charset.split(charToBeRemved).join('');
                }
            }
       } 
       console.log(charset);
       return charset;
    }
    
    function generateNewPassword(){
        let specialCharSet = '!@#$%^&*()_+[]{}|;:,.<>?';
        
        if(filterList)
        {
            specialCharSet = filterFunction().substring(62);
        }

        let specialCharArray = specialCharSet.split('');
        let randPassword = generateRandomString(passwordLength, includeSpecialChars);

        while(includeSpecialChars && !containsSpecialChars(randPassword, specialCharArray))
        {
            console.log(`it happened!:\n
                        include special characters: ${includeSpecialChars}\n
                        password: ${randPassword}
                        `);
            randPassword = generateRandomString(passwordLength, includeSpecialChars);
            console.log(`new gen: ${randPassword}`);
        }

        if(filterList)
        {
            let check = filterCheck(randPassword);
            console.log(`filter list working?: ${check}`);
        }
        
        setTextBoxValue(randPassword);
        setToolTipDisplay("Copy to Clipboard");
        console.log(`displayed password: ${randPassword} and password length: ${passwordLength}`)
    }

    function containsSpecialChars(pass, specialChars)
    {
        return specialChars.some(char => pass.includes(char));
    }

    function filterCheck(str)
    {   
        for(let i = 0; i < str.length; i++)
        {
            if(str.charAt(i).indexOf === -1)
            {
                return false;
            }
        }
        return true;
    }
    
    function copyToClipboard()
    {
        navigator.clipboard.writeText(textBoxValue);
        setToolTipDisplay("Copied!")
    }

    function toggleVisibility()
    {
        if(passwordFieldType === "password")
        {
            setPasswordFieldType("text");
            setShowButtonText("Hide Password");
        }
        else{
            setPasswordFieldType("password");
            setShowButtonText("Show Password");
        }
    }

    function handleFilterInput(event)
    {
        setFilterList(event.target.value);
    }

    function handleFilterKeyPress(event)
    {
        if (event.key === 'Enter') {
            filterFunction();
        }
    }

    function handleFilterButtonClick(event)
    {
        filterFunction();
    }

    function handleClearButtonClick()
    {
        setFilterList('');
    }

    function isFilterListValid()
    {
        let containsLetters = false;
        let containsNumbers = false;

        for(let i = 0; i < filterList.length; i++)
        {
            let char = filterList[i];
            if((char >= 'A' && char <= 'Z' ) || (char >= 'a' && char <= 'z'))
            {
                containsLetters = true;
            }
            else if(char >= '0' && char <= '9')
            {
                containsNumbers = true;
            }
        }
        if(containsLetters === true || containsNumbers === true)
        {
            return false;
        }

        return true;
    }

    function handlePasswordLengthChange(event)
    {
        const newLength = parseInt(event.target.value);
        setPasswordLength(newLength);
    }

    return (
        <main>
            <h1>Generate a Password</h1>
            <input 
                readOnly
                className='main--textbox'
                type={passwordFieldType}
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
                <p className='label'>Special Characters?</p>
                <p className='length--label'>Length:</p>
                <input 
                    className='main--slider'
                    type="range"
                    min={8}
                    max={32}
                    value={passwordLength}
                    onChange={handlePasswordLengthChange}
                />
                <p className='slider--count'>{passwordLength}</p>
            </div>
            {includeSpecialChars && 
            (
            <div className='remove--container'>
                <div className='remove-label-container'>
                    <p className='remove--label'>Remove Special Characters?</p>
                </div>
                <div className='remove-input-container'>
                    <input 
                            className='main--text-entry'
                            type="text"
                            placeholder='Ex: ! @ #'
                            value={filterList}
                            onChange={handleFilterInput}
                            onKeyDown={handleFilterKeyPress}
                    />
                    <button className='filter--button' 
                        onClick={handleFilterButtonClick}
                        disabled={isFilterListValid() === false ||
                                filterList === '!@#$%^&*()_+[]{}|;:,.<>?'    
                                }
                        >Filter
                    </button>
                    <button className='clear--button' onClick={handleClearButtonClick}>Clear</button>
                </div>
                {filterList === '!@#$%^&*()_+[]{}|;:,.<>?' ? 
                    (<div className='warning--container'>
                        <p className='warning--text'>Please erase one special characters from the filter list</p>
                    </div>) : null}
                {!isFilterListValid() ? (<div className='warning--container'>
                        <p className='warning--text'>Please enter only special characters into the filter list</p>
                    </div>) : null}
            </div>
            )}
            <button className='generate--button' onClick={generateNewPassword}>Generate</button>
            <button className='show--button' onClick={toggleVisibility}>{showButtonText}</button>
            <div className='tooltip'>
                <button className='copy--button' onClick={copyToClipboard}>Copy</button>
                <span className='tooltiptext'>{toolTipDisplay}</span>
            </div>
        </main>
    )
}
