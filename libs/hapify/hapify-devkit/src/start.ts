import * as fs from 'fs';
import path = require('path');

import { DMMF } from '@prisma/client/runtime';

import { convertDmmfToHapify } from './hapify-hapify-devkit';

// readFile in libs/hapify/hapify-devkit/dmmf.json
fs.readFile(path.join(__dirname, 'dmmf.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const { datamodel } = JSON.parse(data);

  const schema = convertDmmfToHapify(datamodel as DMMF.Datamodel);

  fs.writeFile(
    path.join(__dirname, 'hapify.json'),
    JSON.stringify(schema, null, 2),
    (error) => {
      if (error) {
        console.error(error);
      }
    },
  );
});
