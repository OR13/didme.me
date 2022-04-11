/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useRouter } from "next/router";
import { ImagePanel, Bitcoin, Ethereum, GitHub } from "./Panels";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, flexGrow: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ resolution }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const rows = [
    {
      title: "image",
      panel: <ImagePanel resolution={resolution} />,
    },
  ];

  rows.push({
    title: "Ethereum",
    panel: <Ethereum resolution={resolution} />,
  });

  if (resolution.didDocumentMetadata.bitcoin) {
    rows.push({
      title: "Bitcoin",
      panel: <Bitcoin resolution={resolution} />,
    });
  }

  if (!resolution.didDocument.id.startsWith("did:web")) {
    rows.push({
      title: "GitHub",
      panel: <GitHub resolution={resolution} />,
    });
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {rows.map((row, i) => {
          return <Tab key={i} label={row.title} {...a11yProps(i)} />;
        })}
      </Tabs>
      {rows.map((row, i) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            {row.panel}
          </TabPanel>
        );
      })}
    </Box>
  );
}
