"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApiMetadata = setApiMetadata;
function setApiMetadata(metadata) {
    return (req, res, next) => {
        req.metadata = metadata;
        next();
    };
}
