import React, { useRef, useState } from "react";

import PropTypes from "prop-types";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../firebase/config";

import { Button, InputGroup, Input } from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import { Validator } from "../helpers/Validator";

import { Toast } from "../helpers/Toast";

import { ModeColor } from "../helpers/ModeColor";

export const FileAll = ({ setUrlImage, fileName, save, image }) => {
  const [progress, setProgress] = useState(0);
  // mode Color
  const { bg } = ModeColor();
  // file
  const file = useRef();

  function handleUpload({ target }) {
    const file = target.files[0];

    const { mImage } = Validator({ imgsize: file.size });

    if (!mImage) return Toast(image, "error", 5000);

    const metadata = {
      cacheControl: "public,max-age=300",
      contentType: "image/jpeg",
    };

    try {
      const uploadTask = uploadBytesResumable(
        storageRef(storage, `${fileName}/${file.name}`),
        file,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrlImage(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <InputGroup>
      <Input
        onChange={handleUpload}
        name="imp"
        type={"file"}
        ref={file}
        display="none"
      />
      <Button
        w={"full"}
        rightIcon={<DownloadIcon w={6} h={6} />}
        variant={"outline"}
        textTransform={"uppercase"}
        onClick={() => file.current.click()}
        size="md"
        fontWeight={"normal"}
        _hover={{ border: bg }}
        p={1}
      >
        {save}: {progress}%
      </Button>
    </InputGroup>
  );
};

FileAll.propTypes = {
  setUrlImage: PropTypes.func,
  fileName: PropTypes.string,
  save: PropTypes.string,
  image: PropTypes.string,
};
