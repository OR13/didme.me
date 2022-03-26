import { Typography, Box, Paper, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import FolderIcon from "@mui/icons-material/Folder";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
const ExportManagerEditor = dynamic(() => import("./export-manager-editor"), {
  ssr: false,
});

const ExportPanel = () => {
  const router = useRouter();
  const { did }: any = router.query;

  return (
    <Paper sx={{ p: 4, mt: 2 }}>
      <Box mt={2}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Upgrade to did web
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Unlock service endpoint integrations and other DID integrations via
          GitHub.
        </Typography>

        <List dense={true}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="read-more"
                href="https://github.com/OR13/did-web-github-did-meme/blob/main/scripts/install.sh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReadMoreIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Decentralized Identifiers"
              secondary={
                "Web based Decentralized Identifiers powerd by GitHub Pages"
              }
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="read-more"
                href="https://github.com/OR13/did-web-github-did-meme/blob/main/scripts/install.sh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReadMoreIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Verifiable Actions"
              secondary={"Verifiable Credentials with GitHub Workflows"}
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ mb: 2 }}>
          In general, you should avoid running random scripts from the internet.
          <br />
          You can browse the source of the script you are about to run{" "}
          <Link
            href="https://github.com/OR13/did-web-github-did-meme/blob/main/scripts/install.sh"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>
          .
        </Typography>

        <ExportManagerEditor
          value={`gh repo create memes --template https://github.com/OR13/did-web-github-did-meme --public --clone
cd memes
./scripts/install.sh ${did}
  `}
        />
      </Box>
    </Paper>
  );
};

export default ExportPanel;
