import { spawn } from 'child_process';
export class SmbClient {
    static APP = 'smbclient';
    static async isInstall() {
        const process = spawn('which', [SmbClient.APP]);
        let outBuffer = '';
        process.stdout.on('data', (buf) => {
            outBuffer = buf.toString().replace('\n', '');
        });
        process.stderr.on('data', (buf) => {
            console.error(buf.toString());
        });
        await new Promise((resolve) => {
            process.on('close', resolve);
        });
        if (outBuffer !== '') {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=SmbClient.js.map