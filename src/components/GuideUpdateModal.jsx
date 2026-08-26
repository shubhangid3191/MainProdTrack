import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function GuideUpdateModal({ open, onClose }) {
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    setChecked(false);
    onClose();
  };

  const handleAcknowledge = () => {
    if (!checked) return;

    setChecked(false);
    onClose();
  };

  return (
    <Dialog
  open={open}
  onClose={handleClose}
  maxWidth={false}
  PaperProps={{
    style: {
      width: "280px",
      maxWidth: "280px",
      minWidth: "280px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 24px 70px rgba(15, 23, 42, 0.35)",
    },
  }}
  BackdropProps={{
    sx: {
      backgroundColor: "rgba(15, 23, 42, 0.58)",
      backdropFilter: "blur(5px)",
    },
  }}
>
      {/* HEADER */}

      <DialogTitle
        sx={{
          px: 2.75,
          py: 2.2,

          fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          fontSize: 16,
          fontWeight: 700,

          color: "#1A2434",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        New updated guide available

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "#6A7585",
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* CONTENT */}

      <DialogContent
        sx={{
          px: 2.75,
          py: 3.25,
        }}
      >
        {/* GUIDE INFORMATION */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2.5,
          }}
        >
          {/* ICON */}

          <Box
            sx={{
              width: 62,
              height: 62,

              borderRadius: "14px",

              backgroundColor: "#e3f6ef",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              flexShrink: 0,
            }}
          >
            <DescriptionOutlinedIcon
              sx={{
                fontSize: 32,
                color: "#a78bfa",
              }}
            />
          </Box>

          {/* GUIDE DETAILS */}

          <Box>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",

                color: "#1A2434",

                lineHeight: 1.5,
              }}
            >
              ABC Medical Imaging — Indexing Guide
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: 12.5,
                fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",

                color: "#6A7585",
              }}
            >
              Version 2.3 · Updated 16 May 2025 · Effective 17 May 2025
            </Typography>

            <Chip
              label="NEW UPDATE"
              size="small"
              sx={{
                mt: 1,

                height: 28,

                borderRadius: "16px",

                backgroundColor: "#ef4444",

                color: "#fff",

                fontSize: 11,
                fontWeight: 800,

                "& .MuiChip-label": {
                  px: 1.25,
                },
              }}
            />
          </Box>
        </Box>

        {/* DESCRIPTION */}

        <Typography
          sx={{
            fontSize: 13,

            lineHeight: 1.5,
            fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            color: "#6A7585",

            mb: 1.5,
          }}
        >
          Changes to the implant indexing process. Please review the updated
          guide — acknowledgement is mandatory before you continue.
        </Typography>

        {/* CHECKBOX */}

        <Box
          sx={{
            border: "1px solid #d9e1ec",

            borderRadius: "12px",

            px: 1.2,
            py: 0.75,

            backgroundColor: "#fff",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                sx={{
                  color: "#7c8798",

                  "&.Mui-checked": {
                    color: "#2f6df6",
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#1A2434",
                  fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                }}
              >
                I have read and understood the updated indexing guide (v2.3).
              </Typography>
            }
          />
        </Box>
      </DialogContent>

      <Divider />

      {/* ACTIONS */}

      <DialogActions
        sx={{
          px: 2.75,
          py: 2,

          backgroundColor: "#f8fafc",

          justifyContent: "flex-end",

          gap: 1,
        }}
      >
        {/* LATER */}

        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            height: 44,

            px: 2,

            borderRadius: "9px",

            textTransform: "none",

            fontSize:"13px",
            fontWeight: 600,
            fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",

            color: "#33415A",

            backgroundColor: "#fff",
             border: "1px solid #eaf0f8",
  "&:hover": {
    borderColor: "#d7dee8",
  },
          }}
        >
          Later
        </Button>

        {/* ACKNOWLEDGE */}

        <Button
          variant="contained"
          disabled={!checked}
          onClick={handleAcknowledge}
          sx={{
            height: 44,

            px: 2.2,

            borderRadius: "9px",

            textTransform: "none",

             fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
             fontSize:"13px",
            fontWeight: 700,

            // BLUE
            backgroundColor: "#2f6df0",
            color: "#ffffff",

            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#255dd8",
              boxShadow: "none",
            },

            "&.Mui-disabled": {
              // Blue even when disabled
              backgroundColor: "#2f6df6",
              color: "#ffffff",

              opacity: 0.55,
            },
          }}
        >
          Acknowledge & continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}