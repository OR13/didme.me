import { Typography, Box, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
const ExportManagerEditor = dynamic(() => import("../export-manager-editor"), {
  ssr: false,
});

export const GitHub = ({ resolution }: any) => {
  const router = useRouter();
  const { did }: any = router.query;
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Upgrade to did:web!
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Unlock extensions with GitHub Pages and Actions.
      </Typography>

      <List dense={true}>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="read-more"
              href="https://or13.github.io/didme.me/#using-github-pages"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ReadMoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <GitHubIcon />
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
              href="https://or13.github.io/didme.me/#using-github-actions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ReadMoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <GitHubIcon />
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
        value={`gh repo clone memes || gh repo create memes --template https://github.com/OR13/did-web-github-did-meme --public --clone
cd memes && ./scripts/install.sh ${did}
  `}
      />
    </Box>
  );
};
