import ready from 'document-ready-promise';
import { MARVIN_EDITOR_IS_EMPTY } from '../config';

const SETTINGS = {
  width: 700,
  height: 450,
  typeImg: 'image/png',
  zoomMode: 'autoshrink',
};

const getEditor = () => window.MarvinJSUtil.getEditor('#marvinjs');

export const exportCml = () => window.MarvinJSUtil.getEditor('#marvinjs')
  .then(sketcher => sketcher.exportStructure('mrv'));

export const clearEditor = () => window.MarvinJSUtil.getEditor('#marvinjs')
  .then((sketcher) => {
    sketcher.importStructure('mrv', MARVIN_EDITOR_IS_EMPTY);
  },
  );

export const convertCmlToBase64 = cml => new Promise((resolve) => {
  window.MarvinJSUtil.getPackage('#marvinjs')
    .then((marvinName) => {
      marvinName.onReady(() => {
        const c = marvinName.ImageExporter.mrvToDataUrl(cml,
          SETTINGS.typeImg, SETTINGS);
        resolve(c);
      });
    });
});

export const convertCmlToBase64Arr = (arrStructures, settings = SETTINGS) => ready().then(() => new Promise((resolve) => {
  window.MarvinJSUtil.getPackage('#marvinjs')
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
}));

export const importCml = cml => window.MarvinJSUtil.getEditor('#marvinjs')
  .then(sketcher => sketcher.importStructure('mrv', cml));

export const textToCml = text => getEditor()
  .then(sketcher => sketcher.importStructure('auto', text)
    .then(() => sketcher.exportStructure('mrv')),
  );

