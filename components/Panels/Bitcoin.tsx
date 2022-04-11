import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Box";

export const Bitcoin = ({ resolution }: any) => {
  if (!resolution.didDocumentMetadata.bitcoin) {
    return <></>;
  }

  const { address } = resolution.didDocumentMetadata.bitcoin;

  return (
    <>
      <Typography variant="body1" sx={{ mb: 2 }} color={"error"}>
        Only on the Bitcoin Test Network.
      </Typography>
      <Paper>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {address}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              window.open(
                `https://live.blockcypher.com/btc-testnet/address/${address}/`
              );
            }}
            variant={"outlined"}
            color={"secondary"}
          >
            View on BlockCypher
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
