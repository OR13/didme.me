import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "@toast-ui/react-image-editor";

import { useEffect, createRef } from "react";

import { colors } from "./theme";

const defaultTextColor = "#FFF";
const defaultFontFamily = "'Impact', monospace";

const CanvasEditor = ({ image }: any) => {
  const editorRef: any = createRef();

  useEffect(() => {
    if (image !== null) {
      const editorInstance = editorRef.current.getInstance();
      const editor = editorInstance;

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

      editor.on("objectActivated", function (props: any) {
        setTimeout(() => {
          if (props.fontFamily !== defaultFontFamily) {
            editor.changeTextStyle(props.id, {
              fontFamily: defaultFontFamily,
            });
          }
        }, 500);
      });

      editor.loadImageFromURL(image, "example");
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
          uiSize: {
            // width: "1000px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
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
