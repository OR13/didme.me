import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CachedIcon from "@mui/icons-material/Cached";

import { yellow, red, green } from "@mui/material/colors";

const badgeColorStatus: any = {
  pending: yellow["800"],
  success: green["500"],
  failure: red["500"],
};

const badgeIconStatus: any = {
  pending: <CachedIcon />,
  success: <CheckIcon />,
  failure: <CloseIcon />,
};

export const AvatarSpinner = ({ image, status }: any) => {
  let badgeColor: any = badgeColorStatus[status];
  let badgeIcon: any = badgeIconStatus[status];

  let mainProps: any = {};

  if (image) {
    mainProps.src = image;
  } else {
    mainProps.children = (
      <FingerprintIcon
        style={{
          width: 48,
          height: 48,
        }}
      />
    );
  }

  return (
    <div>
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                border: `2px solid #fff`,
                background: badgeColor,
                position: "absolute",
              }}
            >
              {badgeIcon}
            </Avatar>
            {status === "pending" && (
              <>
                <CircularProgress style={{ color: badgeColor }} />
              </>
            )}
          </>
        }
      >
        <Avatar
          style={{
            width: 64,
            height: 64,
          }}
          alt="main logo"
          {...mainProps}
        />
      </Badge>
    </div>
  );
};
