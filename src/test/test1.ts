/**
 * Main
 */
import {SmbClient} from '../inc/SmbClient.js';

(async(): Promise<void> => {

    if (await SmbClient.isInstall()) {
        console.log('Smb client is installed!');
    } else {
        console.log('smb client can not found!');
    }

})();