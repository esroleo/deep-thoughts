import React, { useState } from 'react';

const ThoughtForm = () => {

    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // handle changes on the text area
    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

    // handles the form submit
    const handleFormSubmit = async event => {
    event.preventDefault();
    setText('');
    setCharacterCount(0);
    };

      //<p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
      // stops the form from typying after 280 how?
      /*
      
        At this point, test the form in the browser. You'll see that
        eventually you can't type anything else in the <textarea> 
        element, because the handleChange() function stops updating
        the value of thoughtText once the character count reaches 280.
      */
  return (
    <div>
        <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
        </p>
        <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
            <textarea
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input col-12 col-md-9"
                onChange={handleChange}
            ></textarea>
            <button className="btn col-12 col-md-3" type="submit">
            Submit
            </button>
        </form>
    </div>
  );
};

export default ThoughtForm;