import { MARVIN_EDITOR_IS_EMPTY, MARVIN_ID } from '../config';

const SETTINGS = {
  width: 700,
  height: 450,
  typeImg: 'image/png',
  zoomMode: 'autoshrink',
};

const windowsLoad = () => new Promise((resolve) => { window.onload = resolve(window.MarvinJSUtil); });


const getEditor = editorID => windowsLoad()
  .then(marvinJSUtil => marvinJSUtil.getEditor(editorID));

const getPackage = editorID => windowsLoad()
  .then(marvinJSUtil => marvinJSUtil.getPackage(editorID));

export const exportCml = (editorID = MARVIN_ID) => getEditor(editorID)
  .then(sketcher => sketcher.exportStructure('mrv'));

export const clearEditor = (editorID = MARVIN_ID) => getEditor(editorID)
  .then((sketcher) => {
    sketcher.importStructure('mrv', MARVIN_EDITOR_IS_EMPTY);
  });

export const convertCmlToBase64 = (cml, editorID = MARVIN_ID) => new Promise((resolve) => {
  getPackage(editorID)
    .then((marvinName) => {
      marvinName.onReady(() => {
        const c = marvinName.ImageExporter.mrvToDataUrl(cml,
          SETTINGS.typeImg, SETTINGS);
        resolve(c);
      });
    });
});

export const convertCmlToBase64Arr = (arrStructures, settings = SETTINGS, editorID = MARVIN_ID) => new Promise((resolve) => {
  getPackage(editorID)
    .then((marvinName) => {
      marvinName.onReady(() => {
        const c = arrStructures.map((structure) => {
          structure.base64 = marvinName.ImageExporter.mrvToDataUrl(structure.data,
            SETTINGS.typeImg, settings);
          return structure;
        });
        resolve(c);
      });
    });
});

export const importCml = (cml, editorID = MARVIN_ID) => getEditor(editorID)
  .then(sketcher => sketcher.importStructure('mrv', cml));

export const textToCml = (text, editorID = MARVIN_ID) => getEditor(editorID)
  .then(sketcher => sketcher.importStructure('auto', text)
    .then(() => sketcher.exportStructure('mrv')),
  );

