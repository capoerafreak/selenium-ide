import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";
import Input from "../FormInput";
import CommandName from "../CommandName";
import { Commands, CommandsArray } from "../../models/Command";
import tick from "../../images/ic_tick.svg";

export default class CommandInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  render() {
    return (
      <Input name={this.props.name} label={this.props.label}>
        <Autocomplete
          getItemValue={(item) => (
            Commands[item]
          )}
          items={CommandsArray}
          shouldItemRender={(item, value) => (Commands[item].indexOf(value) !== -1)}
          renderInput={(props) => (
            <span style={{
              position: "relative"
            }}>
              <input {...props} style={{
                width: "100%",
                boxSizing: "border-box"
              }}/>
              <img src={tick} style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                right: "8px",
                margin: "auto 0",
                transform: "rotate(90deg)"
              }} />
            </span>
          )}
          renderItem={(item, isHighlighted) =>
            <div key={item} style={{
              background: isHighlighted ? "#f3f3f3" : "white",
              padding: "8px"
            }}>
              <CommandName>{item}</CommandName>
            </div>
          }
          menuStyle={{
            zIndex: 1,
            borderRadius: "3px",
            border: "1px solid #DEDEDE",
            boxShadow: "0 0 3px 0 rgba(0,0,0,0.3)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "2px 0",
            fontSize: "90%",
            position: "fixed",
            overflow: "auto",
            maxHeight: "30%"
          }}
          value={this.props.value}
          inputProps={{disabled: this.props.disabled}}
          onChange={(e) => { if (this.props.onChange) this.props.onChange(e.target.value); }}
          onSelect={(value) => { if (this.props.onChange) this.props.onChange(value); }}
        />
      </Input>
    );
  }
}
