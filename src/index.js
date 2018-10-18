import React from "react";
import ReactDOM from "react-dom";
import "./styles/css/index.css";
import App from "./App";

(() => {
  setInterval(() => {
    const textAreas = document.getElementsByClassName("variable-editor");
    if (textAreas.length > 0) {
      HTMLTextAreaElement.prototype.getCaretPosition = function() {
        return this.selectionStart;
      };
      
      HTMLTextAreaElement.prototype.setCaretPosition = function(position) {
        this.selectionStart = position;
        this.selectionEnd = position;
        this.focus();
      };

      HTMLTextAreaElement.prototype.hasSelection = function() {
        return this.selectionStart === this.selectionEnd;
      };

      HTMLTextAreaElement.prototype.getSelectedText = function() {
        return this.value.substring(this.selectionStart, this.selectionEnd);
      };

      HTMLTextAreaElement.prototype.setSelection = function(start, end) {
        this.selectionStart = start;
        this.selectionEnd = end;
        this.focus();
      };

      const setKeyListeners = textarea => {
        textarea.onkeydown = function(event) {
          if (event.keyCode === 9) {
            var newCaretPosition;
            newCaretPosition = textarea.getCaretPosition() + "  ".length;
            textarea.value =
              textarea.value.substring(0, textarea.getCaretPosition()) +
              "  " +
              textarea.value.substring(
                textarea.getCaretPosition(),
                textarea.value.length
              );
            textarea.setCaretPosition(newCaretPosition);
            return false;
          }
          if (event.keyCode === 8) {
            if (
              textarea.value.substring(
                textarea.getCaretPosition() - 2,
                textarea.getCaretPosition()
              ) === "  "
            ) {
              newCaretPosition = textarea.getCaretPosition() - 1;
              textarea.value =
                textarea.value.substring(0, textarea.getCaretPosition() - 1) +
                textarea.value.substring(
                  textarea.getCaretPosition(),
                  textarea.value.length
                );
              textarea.setCaretPosition(newCaretPosition);
            }
          }
          if (event.keyCode === 37) {
            if (
              textarea.value.substring(
                textarea.getCaretPosition() - 2,
                textarea.getCaretPosition()
              ) === "  "
            ) {
              newCaretPosition = textarea.getCaretPosition() - 1;
              textarea.setCaretPosition(newCaretPosition);
            }
          }
          if (event.keyCode === 39) {
            if (
              textarea.value.substring(
                textarea.getCaretPosition() + 2,
                textarea.getCaretPosition()
              ) === "  "
            ) {
              newCaretPosition = textarea.getCaretPosition() + 1;
              textarea.setCaretPosition(newCaretPosition);
            }
          }
        };
      };

      for (let i = 0; i < textAreas.length; i++)
        setKeyListeners(textAreas[i]);
    }
      
  }, 500);
})();

ReactDOM.render(<App />, document.getElementById("root"));