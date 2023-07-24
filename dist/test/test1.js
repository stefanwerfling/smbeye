import { SmbClient } from '../inc/SmbClient.js';
(async () => {
    if (await SmbClient.isInstall()) {
        console.log('Smb client is installed!');
    }
    else {
        console.log('smb client can not found!');
    }
})();
//# sourceMappingURL=test1.js.map