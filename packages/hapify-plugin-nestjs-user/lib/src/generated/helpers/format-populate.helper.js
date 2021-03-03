"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPopulate = void 0;
function formatPopulate(populate) {
    return populate.reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});
}
exports.formatPopulate = formatPopulate;
//# sourceMappingURL=format-populate.helper.js.map