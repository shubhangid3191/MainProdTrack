import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

import sidebarConfig from "../Config/sidebarConfig.js";

export const DRAWER_WIDTH = 260;


// =========================================================
// NAV ITEM
// =========================================================

function NavItem({
  item,
  currentPage,
  onNavigate,
}) {
  const isActive = currentPage === item.page;

  return (
    <ListItemButton
      selected={isActive}
      onClick={() => onNavigate(item.page)}
      sx={{
        minHeight: 44,

        borderRadius: "10px",

        mx: 1.2,
        mb: 0.35,

        px: 1.5,
        py: 0.8,

        color: "#d6e2f1",

        "&.Mui-selected": {
          bgcolor: "#3478ed",
          color: "#ffffff",

          "&:hover": {
            bgcolor: "#3478ed",
          },
        },

        "&:not(.Mui-selected):hover": {
          bgcolor: "rgba(255,255,255,0.06)",
        },
      }}
    >
      {/* ICON */}

      <ListItemIcon
        sx={{
          minWidth: 34,
          color: "inherit",
          fontSize: 16,
        }}
      >
        {item.icon}
      </ListItemIcon>

      {/* NAME */}

      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          fontSize: 12.5,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      />

      {/* NEW BADGE */}

      {item.badge && !item.badge.dot && (
        <Chip
          label={item.badge.text}
          size="small"
          color={item.badge.color}
          sx={{
            height: 19,

            color: "#fff",

            fontSize: 9,
            fontWeight: 800,

            "& .MuiChip-label": {
              px: 0.8,
            },
          }}
        />
      )}

      {/* NUMBER BADGE */}

      {item.badge && item.badge.dot && (
        <Box
          sx={{
            minWidth: 20,
            height: 20,

            px: 0.5,

            borderRadius: "50%",

            bgcolor: "#ef4444",
            color: "#fff",

            fontSize: 10,
            fontWeight: 700,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.badge.text}
        </Box>
      )}
    </ListItemButton>
  );
}


// =========================================================
// SIDEBAR
// =========================================================

export default function Sidebar({
  roleKey = "indexer",
  currentPage,
  onNavigate,
  onSignOut,
  mobileOpen = false,
  onMobileClose,
}) {
  const menuItems =
    sidebarConfig[roleKey] ||
    sidebarConfig.indexer;

  const handleNavigate = (page) => {
    onNavigate(page);
    onMobileClose?.();
  };

  const drawerContent = (
    <>
      {/* ==================================================
          LOGO
      ================================================== */}

      <Box
        sx={{
          height: 64,

          display: "flex",
          alignItems: "center",

          gap: 1.2,

          px: 2,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,

            borderRadius: "9px",

            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 21,
              height: 21,

              bgcolor: "#fff",

              clipPath:
                "polygon(0 0, 55% 0, 55% 45%, 100% 45%, 100% 100%, 45% 100%, 45% 55%, 0 55%)",
            }}
          />
        </Box>

        <Typography
          sx={{
            color: "#ffffff",

            fontWeight: 800,

            fontSize: 17,

            letterSpacing: "-0.02em",

            whiteSpace: "nowrap",
          }}
        >
          ProdTrack
        </Typography>
      </Box>


      {/* ==================================================
          MENU TITLE
      ================================================== */}

      <Typography
        sx={{
          color: "#7fa4d7",

          fontSize: 10,
          fontWeight: 700,

          letterSpacing: 0.8,

          px: 2.2,

          mt: 2.2,
          mb: 0.8,
        }}
      >
        MENU
      </Typography>


      {/* ==================================================
          ROLE-SPECIFIC MENU
      ================================================== */}

      <List
        sx={{
          py: 0,
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#526b8f transparent",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#526b8f", borderRadius: 6 },
        }}
      >
        {menuItems.map((item) => (
          <NavItem
            key={item.page}
            item={item}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        ))}
      </List>


      {/* ==================================================
          ACCOUNT
      ================================================== */}

      <Typography
        sx={{
          color: "#7fa4d7",

          fontSize: 10,
          fontWeight: 700,

          letterSpacing: 0.8,

          px: 2.2,

          mt: 1.5,
          mb: 0.7,
        }}
      >
        ACCOUNT
      </Typography>


      {/* ==================================================
          SIGN OUT
      ================================================== */}

      <List sx={{ py: 0 }}>
        <ListItemButton
          onClick={onSignOut}
          sx={{
            minHeight: 42,

            borderRadius: "10px",

            mx: 1.2,

            px: 1.5,
            py: 0.8,

            color: "#d6e2f1",

            "&:hover": {
              bgcolor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 34,
              color: "#a8bbd2",
            }}
          >
            <PowerSettingsNewOutlinedIcon
              sx={{
                fontSize: 17,
              }}
            />
          </ListItemIcon>

          <ListItemText
            primary="Sign out"
            primaryTypographyProps={{
              fontSize: 12.5,
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <>
      {/* MOBILE / TABLET — slides in over content, closes on backdrop click */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#10253f",
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP — always visible */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#10253f",
            border: "none",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
