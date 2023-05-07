"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = exports.Message = void 0;
// enums
var Message;
(function (Message) {
    Message["INITIALIZE"] = "INITIALIZE";
    Message["RENDER"] = "RENDER";
    Message["UPDATE"] = "UPDATE";
    Message["CLEAR"] = "CLEAR";
})(Message || (Message = {}));
exports.Message = Message;
var Color;
(function (Color) {
    Color["Grey"] = "#696969";
    Color["Orange"] = "#edbb99";
    Color["White"] = "#ffffff";
    Color["Purple"] = "#9F2B68";
    Color["Blue"] = "#00a2ed";
})(Color || (Color = {}));
exports.Color = Color;
//# sourceMappingURL=index.js.map