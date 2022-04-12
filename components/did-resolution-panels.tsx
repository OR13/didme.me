import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ImagePanel, Bitcoin, Ethereum, GitHub } from "./Panels";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
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
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function BasicTabs({ resolution }: any) {
  const [value, setValue] = React.useState(0);

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

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="resolution details tabs"
        >
          {rows.map((r, i) => {
            return <Tab key={i} label={r.title} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>

      {rows.map((r, i) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            {r.panel}
          </TabPanel>
        );
      })}
    </Box>
  );
}
