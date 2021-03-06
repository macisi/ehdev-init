const path = require('path');
const fs = require('fs');
const fsPath = require('fs-path');
const glob = require('glob');
const ejs = require('ejs');
const projectConfig = require('../projects/index');

function renderTemplate(file, data) {
  return new Promise((resolve, reject) => {
    if (/^(png|jpe?g|gif)$/.test(path.extname(file))) {
      fs.readFile(file, (err, content) => {
        if (err) {
          return reject();
        }
        resolve(content);
      });
    } else {
      fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
          return reject();
        }
        resolve(ejs.render(content, data));
      });
    }
  });
}

exports.renderTo = async (file, data, target,action) => {
  var data = action&&action(data)||data;
  const fileContent = await renderTemplate(file, data);
  fsPath.writeFile(target, fileContent, (err, data) => {
    if (err) {
      console.log(`create template error:
        ${err}`);
    }
  })
};

exports.getTemplates = (inittype,type) => {
  return new Promise((resolve, reject) => {
    glob('**/*', {
      cwd: path.resolve(__dirname, projectConfig[inittype][type]),
      nodir: true,
    }, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    })
  });
};