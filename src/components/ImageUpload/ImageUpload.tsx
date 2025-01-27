// @ts-strict-ignore
import { Typography } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { ImageIcon, makeStyles } from "@saleor/macaw-ui";
import { vars } from "@saleor/macaw-ui-next";
import clsx from "clsx";
import React from "react";
import { FormattedMessage } from "react-intl";

import Dropzone from "../Dropzone";

interface ImageUploadProps {
  children?: (props: { isDragActive: boolean }) => React.ReactNode;
  className?: string;
  disableClick?: boolean;
  isActiveClassName?: string;
  iconContainerClassName?: string;
  iconContainerActiveClassName?: string;
  hideUploadIcon?: boolean;
  onImageUpload: (file: FileList) => void;
}

const useStyles = makeStyles(
  theme => ({
    backdrop: {
      background: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
    fileField: {
      display: "none",
    },
    imageContainer: {
      background: "#ffffff",
      border: `1px solid ${vars.colors.border.neutralPlain}`,
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      transition: theme.transitions.duration.standard + "s",
      width: 148,
    },
    photosIcon: {
      height: 32,
      margin: "0 auto",
      width: 32,
    },
    photosIconContainer: {
      padding: theme.spacing(5, 0),
      textAlign: "center",
    },
    uploadText: {
      color: theme.typography.body1.color,
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
    },
  }),
  { name: "ImageUpload" },
);

export const ImageUpload: React.FC<ImageUploadProps> = props => {
  const {
    children,
    className,
    disableClick,
    iconContainerActiveClassName,
    iconContainerClassName,
    isActiveClassName,
    hideUploadIcon,
    onImageUpload,
  } = props;

  const classes = useStyles(props);

  return (
    <Dropzone disableClick={disableClick} onDrop={onImageUpload}>
      {({ isDragActive, getInputProps, getRootProps }) => (
        <>
          <div
            {...getRootProps()}
            className={clsx(className, classes.photosIconContainer, {
              [classes.backdrop]: isDragActive,
              [isActiveClassName]: isDragActive,
            })}
          >
            {!hideUploadIcon && (
              <div
                className={clsx(iconContainerClassName, {
                  [iconContainerActiveClassName]: isDragActive,
                })}
              >
                <input
                  {...getInputProps()}
                  className={classes.fileField}
                  accept="image/*"
                />
                <ImageIcon className={classes.photosIcon} />
                <Typography className={classes.uploadText}>
                  <FormattedMessage
                    id="NxeDbG"
                    defaultMessage="Drop here to upload"
                    description="image upload"
                  />
                </Typography>
              </div>
            )}
          </div>
          {children && children({ isDragActive })}
        </>
      )}
    </Dropzone>
  );
};
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
