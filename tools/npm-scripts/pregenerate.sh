nx run-many --target build --projects hapify-config,hapify-generate-config,hapify-common,hapify-update-templates-import-path,hapify-templates-angular-rext-client,hapify-templates-casl,hapify-templates-dbml,hapify-templates-models,hapify-templates-nestjs-models,hapify-templates-nestjs-models-common,hapify-templates-nestjs-models-rest,hapify-templates-prisma,hapify-templates-react-admin,hapify-templates-rest-dtos,hapify-templates-rext-client

rm -rf node_modules/@tractr
mkdir -p node_modules/@tractr
cp -r dist/libs/config/hapify/ node_modules/@tractr/hapify-config/
cp -r dist/libs/hapify/generate-config/ node_modules/@tractr/hapify-generate-config/
cp -r dist/libs/hapify/hapify-common node_modules/@tractr/hapify-common/
cp -r dist/libs/hapify/update-templates-import-path node_modules/@tractr/hapify-update-templates-import-path/
cp -r dist/libs/hapify/templates/angular-rext-client node_modules/@tractr/hapify-templates-angular-rext-client/
cp -r dist/libs/hapify/templates/casl node_modules/@tractr/hapify-templates-casl/
cp -r dist/libs/hapify/templates/dbml node_modules/@tractr/hapify-templates-dbml/
cp -r dist/libs/hapify/templates/models node_modules/@tractr/hapify-templates-models/
cp -r dist/libs/hapify/templates/nestjs-models node_modules/@tractr/hapify-templates-nestjs-models/
cp -r dist/libs/hapify/templates/nestjs-models-common node_modules/@tractr/hapify-templates-nestjs-models-common/
cp -r dist/libs/hapify/templates/nestjs-models-rest node_modules/@tractr/hapify-templates-nestjs-models-rest/
cp -r dist/libs/hapify/templates/prisma node_modules/@tractr/hapify-templates-prisma/
cp -r dist/libs/hapify/templates/react-admin node_modules/@tractr/hapify-templates-react-admin/
cp -r dist/libs/hapify/templates/rest-dtos node_modules/@tractr/hapify-templates-rest-dtos/
cp -r dist/libs/hapify/templates/rext-client node_modules/@tractr/hapify-templates-rext-client/
