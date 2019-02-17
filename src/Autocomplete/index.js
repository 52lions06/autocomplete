import React, { Component } from "react";
import PropTypes from "prop-types";
import "./autocomplete.css";
// can grab initial pieces from everywhere, codepen, github, etc....

export default class AutoComplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  state = {
    showOptions: false, // at first so options are not seen
    filteredOptions: [], // empty array that will be used for matching the user input
    activeOption: 0, // location of the the CURRENT item in the filtered options (index)
    userInput: "" // What the user puts in
  };

  onChange = e => {
    console.log("onChange");
    const { options } = this.props; // options will be used for suggestions
    const userInput = e.currentTarget.value; // bring the event in and targets (hold) onto the value
    // filters the options
    // condition is the userInput in the array
    const filteredOptions = options.filter(
      option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    console.log("filteredOptions", filteredOptions);

    this.setState({
      activeOption: 0, // the first item is the default selected item
      filteredOptions, // becomes [ filteredOPtions... ]
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    // this resets the activeOption to the first item
    // empties the filteredOptions array
    // Options are set to false
    // userInput puts the clicked element intot he input field
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeOption, filteredOptions } = this.state;

    // keyCode 13 = enter (return)
    // keyCode 38 = up arrow
    // keyCode 40 = down arrow
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showSuggestions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }

      this.setState({
        activeOption: activeOption - 1
      });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }

      this.setState({
        activeOption: activeOption + 1
      });
    }
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this; // great way to deconstruct all functions and props
    let optionList; // this will be the jsx that is presented
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

// autocomplete needs options
// Options need to be validated as an array to catch the data-type errors quickly
// -- we use PropTypes --

// A user can change teh active option with up / down keys
// user can selct an option by clicking with a mouse or pressing return

// need an onChange to check options
// need onKeyDown to check return and arrow keys
// need value -- onchange blocks user form typing into the input
