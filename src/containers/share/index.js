import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Spinner from "../../components/Spinner";
import { CopyButton } from "../../components/CustomButton";
import ImageAssets from "../../assets/images";
import { EmbedOptions } from "../../enums/Embed";
import { getPublishedForm } from "../../api";
import "./styles.css";

const ShareContainer = (props) => {
  const { history, handleBreadcrumbs } = props;

  const { enqueueSnackbar } = useSnackbar();

  const formRef = window.location.pathname.split("/")[2];

  const publicLink = `${process.env.REACT_APP_KITEE_APP_URL}/form/${formRef}`;

  const [isLoading, setIsLoading] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(publicLink);

    enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
  };

  useEffect(() => {
    setIsLoading(true);

    const getPublishedFormHandler = async () => {
      const response = await getPublishedForm({ formRef });

      if (!response || !response.success) {
        setWarningMessage(
          "⚠️ You need to publish your form before you can share it."
        );
      } else if (
        history.location &&
        history.location.state &&
        history.location.state.shouldPublish
      ) {
        setWarningMessage(
          "⚠️ This form has unpublished changes. Publish your form to share the latest version."
        );
      }
    };

    getPublishedFormHandler();

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      {
        title:
          history.location &&
          history.location.state &&
          history.location.state.title
            ? history.location.state.title
            : "Form",
        navigationRoute: `/form-builder/${formRef}`,
      },
      {
        title: "Share",
        isLast: true,
      },
    ]);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="share-root-container">
          <div className="share-container">
            {!!warningMessage && (
              <div className="share-warning-container">{warningMessage}</div>
            )}

            <div className="share-header">Share your form with the world</div>

            <Paper elevation={1} className="share-form-link-container">
              <div className="share-form-link-header-container">
                <img
                  src={ImageAssets.Share_Link_Icon}
                  alt=""
                  width={20}
                  height={20}
                />

                <span className="share-form-link-header">
                  Get the link to your form
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                <TextField
                  variant="outlined"
                  value={publicLink}
                  autoComplete="new-password"
                  style={{ width: "80%" }}
                  className="input-text-field"
                />

                <CopyButton onClick={handleCopy}>Copy</CopyButton>
              </div>
            </Paper>

            <div className="share-embed-header">
              Embed your form (coming soon)
            </div>

            <div className="share-form-embed-options-list">
              <Grid
                container
                direction="row"
                justifyContent="space-start"
                alignItems="flex-start"
              >
                {EmbedOptions.map((option) => (
                  <Paper
                    key={option.id}
                    elevation={1}
                    className="share-form-embed-options-card-container"
                  >
                    <img
                      src={option.icon}
                      alt={option.name}
                      className="share-form-embed-option-card-image"
                    />

                    <div className="share-form-embed-option-card-title">
                      {option.name}
                    </div>
                  </Paper>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ShareContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default ShareContainer;
