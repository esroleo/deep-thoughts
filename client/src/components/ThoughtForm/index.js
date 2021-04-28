import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_THOUGHT } from '../../utils/mutations';
// this will be used to be able to update both query thoughts
// and query me when a new thought is added
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {

    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // use mutatation hook calying the mutation "query" ADD_THOUGHT
    // and assigining it to a variable called addThought
    // when use, if failed, the error will be stored in the error 
    // deconstructed object
    // QUERY_THOUGHTS will be use to manually udpate the query 
    // on thoughts after a thought is inserted with the mutation
    //const [addThought, { error }] = useMutation(ADD_THOUGHT);

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
      update(cache, { data: { addThought } }) {
        try {
          // could potentially not exist yet, so wrap in a try...catch
            // read what's currently in the cache
          const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

          // prepend the newest thought to the front of the array
          cache.writeQuery({
            query: QUERY_THOUGHTS,
            data: { thoughts: [addThought, ...thoughts] }
          });
        } catch (e) {
          console.error(e);
        }
    
        // update me object's cache, appending new thought to the end of the array
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
        });
      }
    });


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
    
      try {
        // add thought to database
        await addThought({
          variables: { thoughtText }
        });
    
        // clear form value
        setText('');
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
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
            {error && <span className="ml-2">Something went wrong...</span>}
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