import {ChildProcess, spawn} from 'child_process';

/**
 * SmbClientNotifArg
 */
export type SmbClientNotifArg = {
    auth?: {
        username: string;
        password: string;
    };
    server: string;
    share: string;
    path?: string;
};

/**
 * SmbClientNotif
 */
export class SmbClientNotif {

    /**
     * command
     * @protected
     */
    protected _command: string = 'smbclient';

    /**
     * process of smbclient
     * @protected
     */
    protected _process: ChildProcess|null = null;

    /**
     * _getArguments
     * @protected
     */
    protected _getArguments(smbarg: SmbClientNotifArg): any[] {
        const args = [];

        let path = '/';

        if (smbarg.path) {
            path = smbarg.path;
        }

        args.push(`//${smbarg.server}/${smbarg.share}/`);

        if (smbarg.auth) {
            args.push(`--user=${smbarg.auth.username}`);
            args.push(`--password=${smbarg.auth.password}`);
        }

        args.push(`--command="notif ${path}"`);

        return args;
    }

    /**
     * start
     */
    public start(arg: SmbClientNotifArg): void {
        const args = this._getArguments(arg);

        this._process = spawn(this._command, args);

        this._process.stdout!.on('data', (buf) => {
            const msgs = buf.toString().split('\n');

        });

        this._process.stderr!.on('data', (buf) => {
            const msgs = buf.toString().split('\n');
        });
    }

    /**
     * isRun
     */
    public isRun(): boolean {
        if (this._process) {
            if (this._process.exitCode === null) {
                return true;
            }
        }

        return false;
    }

    /**
     * stop
     */
    public stop(): void {
        if (this._process) {
            this._process.disconnect();
            this._process = null;
        }
    }

}