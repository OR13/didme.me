import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "@toast-ui/react-image-editor";

import { useEffect, createRef } from "react";

import { colors } from "./theme";

declare var window: any;

const defaultTextColor = "#FFF";
const defaultFontFamily = "'Impact', monospace";

const initEditor = ({ image, editorRef }: any) => {
  const editorInstance = editorRef.current.getInstance();
  const editor = editorInstance;
  editor.loadImageFromURL(image, "example");
  editor.ui.shape.options.stroke = defaultTextColor;
  editor.ui.shape._els.strokeColorpicker._color = defaultTextColor;
  editor.ui.shape.colorPickerControls[1].colorElement.style.backgroundColor =
    defaultTextColor;
  editor.ui.text.colorPickerInputBox.defaultValue = defaultTextColor;
  editor.ui.text._els.color = defaultTextColor;
  editor.ui.text._els.textColorpicker.color = defaultTextColor;
  editor.ui.text._els.textColorpicker.colorElement.style.backgroundColor =
    defaultTextColor;

  editor.ui.activeMenuEvent();

  window.handlePublishDidMeme = () => {
    const dataURL = editor.toDataURL();
    const memeCanvasExport: any = document.createElement("CANVAS");
    const context = memeCanvasExport.getContext("2d");
    const imageObj = new Image();
    imageObj.onload = function () {
      const self: any = this;
      memeCanvasExport.setAttribute("id", "meme-canvas");
      memeCanvasExport.setAttribute("width", self.width);
      memeCanvasExport.setAttribute("height", self.height);
      context.drawImage(
        self,
        0,
        0,
        self.width,
        self.height,
        0,
        0,
        memeCanvasExport.width,
        memeCanvasExport.height
      );
    };
    imageObj.src = dataURL;
    document.body.appendChild(memeCanvasExport);
  };

  editor.on("objectActivated", function (props: any) {
    setTimeout(() => {
      if (props.fontFamily !== defaultFontFamily) {
        editor.changeTextStyle(props.id, {
          fontFamily: defaultFontFamily,
        });
      }
    }, 500);
  });

  setTimeout(() => {
    editor.addText("DID MEME", {
      styles: {
        fill: defaultTextColor,
        fontFamily: defaultFontFamily,
      },
      position: {
        x: 10,
        y: 10,
      },
    });
  }, 75);

  return editor;
};
const CanvasEditor = ({ image, setCanvasReady }: any) => {
  const editorRef: any = createRef();

  useEffect(() => {
    if (image !== null) {
      const editor = initEditor({ image, editorRef });
      const imageObj = new Image();
      imageObj.onload = function () {
        const self: any = this;
        editor.ui.resizeEditor({
          uiSize: {
            height: self.height + 200 + "px",
          },
        });
        setCanvasReady(true);
      };
      imageObj.src = image;
    }
  }, [image, editorRef]);

  const myTheme = {
    "downloadButton.color": colors.secondary,
    "downloadButton.fontFamily": "'Impact', monospace",
    "downloadButton.backgroundColor": "unset",
    "downloadButton.border": `1px solid ${colors.secondary}`,
    "downloadButton.fontSize": "16px",
  };

  return (
    <>
      <ImageEditor
        ref={editorRef}
        includeUI={{
          theme: myTheme,
          initMenu: "text",
          menuBarPosition: "bottom",
        }}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
    </>
  );
};

export default CanvasEditor;
