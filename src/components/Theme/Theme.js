import React, { Component } from "react";
import PropTypes from "prop-types";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { darken, lighten } from "@material-ui/core/styles/colorManipulator";

// https://favicon.io/favicon-generator/
const primaryColor = "#052";
const secondaryColor = "#F80";

class Theme extends Component {
  render() {
    const { children } = this.props;
    const theme = createMuiTheme({
      splashImage: "",
      palette: {
        type: "light",
        primary: {
          light: lighten(primaryColor, 0.07),
          main: primaryColor,
          dark: darken(primaryColor, 0.07),
        },
        secondary: {
          light: lighten(secondaryColor, 0.07),
          main: secondaryColor,
          dark: darken(secondaryColor, 0.07),
        },
      },
    });
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  }
}

Theme.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Theme;
