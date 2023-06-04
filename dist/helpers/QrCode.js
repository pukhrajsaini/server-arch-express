var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const qr = require('qrcode');
const qrCodeGenerate = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let qrCodeReturn = yield (qr === null || qr === void 0 ? void 0 : qr.toDataURL());
        if (qrCodeReturn) {
            console.log('qrCodeReturn', qrCodeReturn);
            return qrCodeReturn;
        }
    }
    catch (e) {
        console.log('error_newQrCodeGenerate');
    }
});
