import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { JSONEditor } from "@transmute/material-did-core";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ResolutionTabs = ({ memeUrl, didDocument }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="DID Meme Resolution Response"
      >
        <Tab label="Meme" {...a11yProps(0)} />
        <Tab label="DID Document" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <img
          src={memeUrl}
          alt="meme"
          style={{
            maxWidth: "80%",
            margin: "0 auto",
            display: "block",
            padding: "64px 0",
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JSONEditor value={JSON.stringify(didDocument, null, 2)} />
      </TabPanel>
    </div>
  );
};
