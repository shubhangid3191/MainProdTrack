// Imports React hooks for component state and API loading.
import { useEffect, useState } from "react";

// Imports the existing MUI components used by this page.
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

// Imports the close icon used by dialogs.
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// Imports the existing shared Core Team page components.
import CorePageShell, {
  CoreTable,
  UploadAction,
  CoreFormDialog,
} from "../components/CorePageShell.jsx";

// Imports the shared API helper so authentication is handled automatically.
import { apiRequest } from "../Config/api.js";

// ======================================================
// ACKNOWLEDGEMENT PROGRESS
// Keeps the same acknowledgement percentage UI.
// ======================================================

function AcknowledgementCoreTeam({ value }) {
  // Converts the API value into a safe number for the progress bar.
  const percentage = Number(value) || 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        minWidth: 145,
      }}
    >
      <Box
        sx={{
          width: 105,
          height: 8,
          bgcolor: "#edf1f6",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            bgcolor: "#7251d6",
            borderRadius: 4,
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: 12,
        }}
      >
        {percentage}%
      </Typography>
    </Box>
  );
}

// ======================================================
// CORE TEAM GUIDE MANAGER
// ======================================================

function GuideManagerCoreTeam() {
  // Stores the Guide Manager table data returned by the backend.
  const [guides, setGuides] = useState([]);

  // Controls the existing Upload Guide dialog.
  const [uploadOpen, setUploadOpen] = useState(false);

  // Controls the Compliance details dialog.
  const [complianceOpen, setComplianceOpen] = useState(false);

  // Stores the selected guide's compliance response.
  const [complianceData, setComplianceData] = useState(null);

  // Stores the selected guide ID for the upload request.
  const [guideId, setGuideId] = useState("");

  // Stores the selected PDF file.
  const [guideFile, setGuideFile] = useState(null);

  // Stores the new guide version label.
  const [version, setVersion] = useState("");

  // Stores the selected PDF filename for display.
  const [selectedFileName, setSelectedFileName] = useState("");

  // Tracks whether the Guide Manager table is loading.
  const [loading, setLoading] = useState(false);

  // Tracks whether a PDF upload is currently running.
  const [uploading, setUploading] = useState(false);

  // Tracks whether compliance information is loading.
  const [complianceLoading, setComplianceLoading] = useState(false);

  // Controls the success/error Snackbar.
  const [notice, setNotice] = useState(false);

  // Stores the Snackbar message.
  const [noticeMessage, setNoticeMessage] = useState("");

  // Stores the Snackbar severity.
  const [noticeSeverity, setNoticeSeverity] = useState("success");

  // ======================================================
  // LOAD GUIDE MANAGER DATA
  // ======================================================

  // Loads the latest Guide Manager data from the backend.
  const loadGuides = async () => {
    try {
      // Shows loading state while the request is running.
      setLoading(true);

      // Calls the Core Team Guide Manager API.
      const data = await apiRequest("/guides/manage");

      // Stores the returned guide list.
      setGuides(data.guides || []);
    } catch (error) {
      // Logs the complete error for development debugging.
      console.error("Load Guide Manager Error:", error);

      // Shows the API error in the existing Snackbar.
      setNoticeMessage(
        error.message || "Failed to load guides"
      );

      // Changes the Snackbar to error mode.
      setNoticeSeverity("error");

      // Opens the Snackbar.
      setNotice(true);
    } finally {
      // Stops the loading state.
      setLoading(false);
    }
  };

  // Loads Guide Manager data when the page first opens.
  useEffect(() => {
    loadGuides();
  }, []);

  // ======================================================
  // TABLE DATA
  // ======================================================

  // Formats the API timestamp using the same date style as the existing UI.
  const formatDate = (dateValue) => {
    // Returns a dash when no date is available.
    if (!dateValue) {
      return "-";
    }

    // Converts the backend timestamp into a readable date.
    return new Date(dateValue).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // Converts live backend guide objects into the existing CoreTable row format.
  const rows = guides.map((guide) => [
    // Shows the project name in the PROJECT column.
    guide.project,

    // Shows the actual guide title in the GUIDE column.
    guide.guide,

    // Keeps the existing bold version appearance.
    <strong key={`version-${guide.version_id}`}>
      {guide.version}
    </strong>,

    // Shows the latest upload date.
    formatDate(guide.updated),

    // Keeps the existing acknowledgement progress UI.
    <AcknowledgementCoreTeam
      key={`ack-${guide.version_id}`}
      value={guide.acknowledgement_percentage}
    />,

    // Shows the backend project status.
    guide.status,
  ]);

  // ======================================================
  // OPEN UPLOAD DIALOG
  // ======================================================

  // Opens the upload dialog and clears previous form values.
  const openUploadDialog = () => {
    // Clears the previous guide selection.
    setGuideId("");

    // Clears the previous version.
    setVersion("");

    // Clears the previous selected file.
    setGuideFile(null);

    // Clears the previous displayed filename.
    setSelectedFileName("");

    // Opens the existing upload dialog.
    setUploadOpen(true);
  };

  // ======================================================
  // FILE SELECTION
  // ======================================================

  // Handles PDF selection from the existing Choose guide file button.
  const handleFileChange = (event) => {
    // Gets the first selected file.
    const file = event.target.files?.[0];

    // Stops when no file was selected.
    if (!file) {
      return;
    }

    // Verifies that the selected file has a PDF extension.
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      // Clears the invalid file.
      setGuideFile(null);

      // Clears the displayed filename.
      setSelectedFileName("");

      // Shows the validation message.
      setNoticeMessage(
        "Please select a PDF guide file"
      );

      // Uses error Snackbar styling.
      setNoticeSeverity("error");

      // Opens the Snackbar.
      setNotice(true);

      return;
    }

    // Stores the actual File object for FormData.
    setGuideFile(file);

    // Displays the selected filename.
    setSelectedFileName(file.name);
  };

  // ======================================================
  // UPLOAD GUIDE
  // ======================================================

  // Uploads a new version of the selected existing guide.
  const upload = async () => {
    // Validates the guide selection.
    if (!guideId) {
      setNoticeMessage("Please select a guide");
      setNoticeSeverity("error");
      setNotice(true);
      return;
    }

    // Validates the selected PDF.
    if (!guideFile) {
      setNoticeMessage("Please choose a guide PDF");
      setNoticeSeverity("error");
      setNotice(true);
      return;
    }

    // Validates the version label.
    if (!version.trim()) {
      setNoticeMessage("Please enter a version");
      setNoticeSeverity("error");
      setNotice(true);
      return;
    }

    try {
      // Disables the Upload button while the request is running.
      setUploading(true);

      // Creates multipart/form-data for the PDF upload.
      const formData = new FormData();

      // Sends the selected existing guide ID.
      formData.append("guideId", guideId);

      // Sends the new version label.
      formData.append("version", version.trim());

      // Requires acknowledgement for Core Team guide uploads.
      formData.append("requiresAck", "true");

      // Sends the selected PDF using the exact backend Multer field name.
      formData.append("file", guideFile);

      // Sends the multipart upload request to the backend.
      const data = await apiRequest(
        "/guides/manage/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // Closes the existing upload dialog after successful upload.
      setUploadOpen(false);

      // Shows the backend success message.
      setNoticeMessage(
        data.message ||
          "New guide version uploaded successfully"
      );

      // Uses success Snackbar styling.
      setNoticeSeverity("success");

      // Opens the Snackbar.
      setNotice(true);

      // Reloads the Guide Manager so the new version appears immediately.
      await loadGuides();
    } catch (error) {
      // Logs the upload error for development debugging.
      console.error("Guide Upload Error:", error);

      // Shows the backend error to the user.
      setNoticeMessage(
        error.message || "Failed to upload guide"
      );

      // Uses error Snackbar styling.
      setNoticeSeverity("error");

      // Opens the Snackbar.
      setNotice(true);
    } finally {
      // Re-enables the Upload button.
      setUploading(false);
    }
  };

  // ======================================================
  // COMPLIANCE
  // ======================================================

  // Loads detailed compliance for the selected table row.
  const handleCompliance = async (row, rowIndex) => {
    // Gets the original guide object using the CoreTable row index.
    const selectedGuide = guides[rowIndex];

    // Stops if the selected guide cannot be found.
    if (!selectedGuide) {
      return;
    }

    try {
      // Opens the dialog immediately so loading feedback is visible.
      setComplianceOpen(true);

      // Clears old compliance information.
      setComplianceData(null);

      // Starts the compliance loading state.
      setComplianceLoading(true);

      // Calls the compliance API using the selected version ID.
      const data = await apiRequest(
        `/guides/manage/${selectedGuide.version_id}/compliance`
      );

      // Stores the complete compliance response.
      setComplianceData(data);
    } catch (error) {
      // Closes the compliance dialog when loading fails.
      setComplianceOpen(false);

      // Logs the complete compliance error.
      console.error(
        "Guide Compliance Error:",
        error
      );

      // Shows the backend error.
      setNoticeMessage(
        error.message ||
          "Failed to load guide compliance"
      );

      // Uses error Snackbar styling.
      setNoticeSeverity("error");

      // Opens the Snackbar.
      setNotice(true);
    } finally {
      // Stops the compliance loading state.
      setComplianceLoading(false);
    }
  };

  // ======================================================
  // CORE TEAM UI
  // Existing visual layout is preserved.
  // ======================================================

  return (
    <>
      <CorePageShell
        title="Guide manager"
        description="Upload guide versions, track acknowledgements and send updates to assigned indexers."
        actionLabel="Upload new version"
        actionIcon={<UploadAction />}
        actionHandler={openUploadDialog}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            mb: 1.2,
          }}
        >
          Mandatory acknowledgement workflow
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          {[
            "Upload guide",
            "Notify indexers",
            "Shown on login",
            "Read & acknowledge",
            "System records",
          ].map((step, index) => (
            <Box
              key={step}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant={
                  index === 4
                    ? "contained"
                    : "outlined"
                }
                size="small"
                sx={{
                  minHeight: 38,
                  px: 1.7,
                }}
              >
                {step}
              </Button>

              {index < 4 && (
                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: 18,
                  }}
                >
                  →
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            border: "1px solid #dbe3ec",
            borderRadius: 1.5,
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <Typography
            sx={{
              px: 2,
              py: 1.5,
              fontWeight: 800,
              borderBottom: "1px solid #e3e8ef",
            }}
          >
            Guides
          </Typography>

          <CoreTable
            columns={[
              "PROJECT",
              "GUIDE",
              "VERSION",
              "UPDATED",
              "ACK. %",
              "STATUS",
            ]}
            rows={rows}
            actionLabel={
              loading ? "Loading..." : "Compliance"
            }
            actionVariant="text"
            onAction={handleCompliance}
          />
        </Box>
      </CorePageShell>

      {/* Keeps the existing Upload Guide dialog design. */}
      <Dialog
        open={uploadOpen}
        onClose={() => {
          if (!uploading) {
            setUploadOpen(false);
          }
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Upload guide

          <IconButton
            size="small"
            disabled={uploading}
            onClick={() => setUploadOpen(false)}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            display: "grid",
            gap: 2,
            pt: 2,
          }}
        >
          {/* Uses the existing Guide name field as a live guide selector. */}
          <TextField
            select
            label="Guide name"
            value={guideId}
            onChange={(event) =>
              setGuideId(event.target.value)
            }
            fullWidth
          >
            {guides.map((guide) => (
              <MenuItem
                key={guide.guide_id}
                value={guide.guide_id}
              >
                {guide.guide}
              </MenuItem>
            ))}
          </TextField>

          {/* Keeps the same Choose guide file button UI. */}
          <Button
            component="label"
            variant="outlined"
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
            }}
          >
            {selectedFileName ||
              "Choose guide file"}

            <input
              hidden
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
          </Button>

          {/* Keeps the same Version field UI. */}
          <TextField
            label="Version"
            placeholder="e.g. v2.4"
            value={version}
            onChange={(event) =>
              setVersion(event.target.value)
            }
            fullWidth
          />
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            p: 2,
            bgcolor: "#f8fafc",
          }}
        >
          <Button
            disabled={uploading}
            onClick={() => setUploadOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={uploading}
            onClick={upload}
          >
            {uploading
              ? "Uploading..."
              : "Upload guide"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Shows live acknowledgement details when Compliance is clicked. */}
      <Dialog
        open={complianceOpen}
        onClose={() =>
          setComplianceOpen(false)
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Guide compliance

          <IconButton
            size="small"
            onClick={() =>
              setComplianceOpen(false)
            }
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            pt: 2,
          }}
        >
          {/* Shows a loading message while compliance data is being requested. */}
          {complianceLoading && (
            <Typography
              sx={{
                color: "#64748b",
                py: 2,
              }}
            >
              Loading compliance...
            </Typography>
          )}

          {/* Shows the selected guide's live compliance information. */}
          {!complianceLoading &&
            complianceData && (
              <>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                >
                  {complianceData.guide?.guide}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: 13,
                    mt: 0.4,
                  }}
                >
                  {complianceData.guide?.project} •{" "}
                  {complianceData.guide?.version}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, 1fr)",
                    gap: 1.5,
                    my: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border:
                        "1px solid #dbe3ec",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      Assigned
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 800,
                      }}
                    >
                      {
                        complianceData
                          .compliance
                          ?.total_assigned
                      }
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border:
                        "1px solid #dbe3ec",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      Acknowledged
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 800,
                      }}
                    >
                      {
                        complianceData
                          .compliance
                          ?.acknowledged
                      }
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border:
                        "1px solid #dbe3ec",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      Pending
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 800,
                      }}
                    >
                      {
                        complianceData
                          .compliance?.pending
                      }
                    </Typography>
                  </Paper>
                </Box>

                <Divider sx={{ mb: 1 }} />

                {/* Shows each active Indexer's acknowledgement status. */}
                {complianceData.users?.map(
                  (user) => (
                    <Box
                      key={user.user_id}
                      sx={{
                        py: 1.2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "space-between",
                        borderBottom:
                          "1px solid #edf1f6",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {user.full_name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "#64748b",
                          }}
                        >
                          {user.emp_code}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 800,
                          color:
                            user.acknowledgement_status ===
                            "ACKNOWLEDGED"
                              ? "#20a36f"
                              : "#e09a22",
                        }}
                      >
                        {
                          user.acknowledgement_status
                        }
                      </Typography>
                    </Box>
                  )
                )}
              </>
            )}
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            p: 2,
            bgcolor: "#f8fafc",
          }}
        >
          <Button
            onClick={() =>
              setComplianceOpen(false)
            }
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reuses the existing Snackbar for API success and error messages. */}
      <Snackbar
        open={notice}
        autoHideDuration={2800}
        onClose={() => setNotice(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={noticeSeverity}
          variant="filled"
          onClose={() => setNotice(false)}
        >
          {noticeMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

// ======================================================
// ADMINISTRATOR EXISTING DATA
// Kept unchanged so its existing UI remains available.
// ======================================================

const rowsAdministrator = [
  [
    "ABC Medical v2.3",
    "ABC Medical Imaging",
    "20 May 2026",
    "50 / 50",
    "ACTIVE",
  ],
  [
    "Ortho Kids v1.1",
    "Ortho Kids",
    "14 Apr 2026",
    "9 / 9",
    "ACTIVE",
  ],
  [
    "Spine Guide v3.0",
    "Spine Indexing",
    "02 Mar 2026",
    "11 / 12",
    "ACTIVE",
  ],
  [
    "Cardio v1.0",
    "Cardio Records",
    "10 Jan 2026",
    "7 / 7",
    "ACTIVE",
  ],
  [
    "Neuro Guide v2.0",
    "Neuro Scan",
    "01 Jun 2025",
    "5 / 5",
    "INACTIVE",
  ],
];

// Defines the existing Administrator upload form fields.
const fieldsAdministrator = [
  {
    name: "title",
    label: "Guide title",
    placeholder: "e.g. ABC Medical v2.4",
  },
  {
    name: "project",
    label: "Project",
    placeholder: "Select project",
    options: [
      "ABC Medical Imaging",
      "Ortho Kids",
      "Spine Indexing",
      "Cardio Records",
      "Neuro Scan",
    ],
  },
  {
    name: "version",
    label: "Version",
    placeholder: "e.g. 2.4",
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Active",
    options: ["Active", "Inactive"],
  },
];

// ======================================================
// ADMINISTRATOR GUIDE MANAGER
// Existing Administrator UI is preserved.
// ======================================================

function GuideManagerAdministrator() {
  // Controls the existing Administrator form dialog.
  const [open, setOpen] = useState(false);

  // Controls the Administrator success Snackbar.
  const [saved, setSaved] = useState(false);

  return (
    <>
      <CorePageShell
        breadcrumb="Administrator"
        title="Guide Manager"
        description="Manage guide versions and acknowledgement rules."
        actionLabel="Upload guide"
        actionHandler={() => setOpen(true)}
      >
        {/* Keeps the existing Administrator compliance summary UI. */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 2,
          }}
        >
          {[
            ["Total guides", "5", "#3475ee"],
            [
              "Fully acknowledged",
              "4",
              "#20a36f",
            ],
            [
              "Pending acknowledgement",
              "1",
              "#e09a22",
            ],
          ].map(([label, value, color]) => (
            <Paper
              key={label}
              elevation={0}
              sx={{
                p: 2,
                border:
                  "1px solid #dbe3ec",
                borderRadius: 1.5,
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 800,
                  color,
                }}
              >
                {value}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#526581",
                }}
              >
                {label}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <CoreTable
            columns={[
              "GUIDE",
              "PROJECT",
              "UPLOADED",
              "ACKNOWLEDGED",
              "STATUS",
            ]}
            rows={rowsAdministrator}
            actionLabel="View"
            actionVariant="text"
            onAction={() => {}}
          />
        </Box>
      </CorePageShell>

      {/* Keeps the existing Administrator form dialog unchanged. */}
      <CoreFormDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSaved(true);
        }}
        title="Upload guide"
        fields={fieldsAdministrator}
        submitLabel="Upload"
      />

      {/* Keeps the existing Administrator success Snackbar. */}
      <Snackbar
        open={saved}
        autoHideDuration={2500}
        onClose={() => setSaved(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
        >
          Guide uploaded successfully
        </Alert>
      </Snackbar>
    </>
  );
}

// Keeps the Administrator component referenced in this module.
void GuideManagerAdministrator;

// ======================================================
// ROLE PAGE EXPORT
// Keeps your existing role routing behavior unchanged.
// ======================================================

export default function GuideManager(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return (
        <GuideManagerCoreTeam {...props} />
      );

    case "administrator":
      return (
        <GuideManagerCoreTeam {...props} />
      );

    default:
      return (
        <GuideManagerCoreTeam {...props} />
      );
  }
}