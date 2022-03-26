import { Typography, Box, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import * as didWeb from "../core/didWebConverter";
import { useRouter } from "next/router";

const ExportManagerEditor = dynamic(() => import("./export-manager-editor"), {
  ssr: false,
});

// const apiRoot = `https://didme.me`;
const apiRoot = `http://localhost:3000`;
const ExportPanel = () => {
  const router = useRouter();
  const { u, did }: any = router.query;

  // \`\`\`bash

  // echo "0. enter github username"
  // read GITHUB_USERNAME
  // echo
  //

  // /bin/bash -c "$(curl -fsSL ${apiRoot}/api/did:meme:1zgsfmn2g4797kzd4k6mkxq5d3u28cysj8m764j5g2z2tfpeyggdmhvq383e7u/install.sh?u=${})"
  // \`\`\`

  const newDid = didWeb.didWeb(did, u);

  const script = `# Export
\`\`\`bash  
/bin/bash -c "$(curl -fsSL ${apiRoot}/api/${did}/${u}/install.sh)"
\`\`\`

## Next Steps

Once the export completes you will need to review your new did:web here:

- [new did](${apiRoot}/${newDid})

  `;
  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h1">Export</Typography>
      <Box mt={2}>
        <Typography variant="body1" gutterBottom>
          You can convert a did:meme to a did:web.
        </Typography>
        <Typography variant="body1">
          This will allow you to setup service integrations and use other
          features of github such as verifiable actions.
        </Typography>
        <ExportManagerEditor value={script}>Hey</ExportManagerEditor>
      </Box>
    </Paper>
  );
};

export default ExportPanel;
