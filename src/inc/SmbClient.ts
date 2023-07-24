import {spawn} from 'child_process';

/**
 * SmbClient
 */
export class SmbClient {

    /**
     * command
     * @protected
     */
    public static APP: string = 'smbclient';

    /**
     * isInstall
     */
    public static async isInstall(): Promise<boolean> {
        const process = spawn('which', [SmbClient.APP]);
        let outBuffer = '';

        process.stdout!.on('data', (buf) => {
            outBuffer = buf.toString().replace('\n', '');
        });

        process.stderr!.on('data', (buf) => {
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