import {ChildProcess, spawn} from 'child_process';
import {SmbClient} from './SmbClient.js';
import {EventEmitter} from 'events';

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
export class SmbClientNotif extends EventEmitter {

    /**
     * https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-smb2/598f395a-e7a2-4cc8-afb3-ccb30dd2df7c
     */
    public static FILE_NOTIFY_CHANGE_FILE_NAME = 1;
    public static FILE_NOTIFY_CHANGE_DIR_NAME = 2;
    public static FILE_NOTIFY_CHANGE_ATTRIBUTES = 3;
    public static FILE_NOTIFY_CHANGE_SIZE = 4;
    public static FILE_NOTIFY_CHANGE_LAST_WRITE = 10;
    public static FILE_NOTIFY_CHANGE_LAST_ACCESS = 20;
    public static FILE_NOTIFY_CHANGE_CREATION = 40;
    public static FILE_NOTIFY_CHANGE_EA = 80;
    public static FILE_NOTIFY_CHANGE_SECURITY = 100;
    public static FILE_NOTIFY_CHANGE_STREAM_NAME = 200;
    public static FILE_NOTIFY_CHANGE_STREAM_SIZE = 400;
    public static FILE_NOTIFY_CHANGE_STREAM_WRITE = 800;

    public static EVENT_START = 'start';
    public static EVENT_ERROR = 'error';
    public static EVENT_NOTIFY = 'notify';
    public static EVENT_CLOSE = 'close';

    /**
     * process of smbclient
     * @protected
     */
    protected _process: ChildProcess|null = null;

    /**
     * constructor
     */
    public constructor() {
        super();
    }

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

        args.push(`--command="notify ${path}"`);

        return args;
    }

    /**
     * start
     */
    public start(arg: SmbClientNotifArg): void {
        const args = this._getArguments(arg);

        this._process = spawn(SmbClient.APP, args);

        this.emit(SmbClientNotif.EVENT_START, {});

        this._process.stdout!.on('data', (buf) => {
            const msgs = buf.toString().split('\n');
            console.log(msgs);
        });

        this._process.stderr!.on('data', (buf) => {
            const msgs = buf.toString().split('\n');
            console.log(msgs);

            this.emit(SmbClientNotif.EVENT_ERROR, {});
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
            this.emit(SmbClientNotif.EVENT_CLOSE, {});

            this._process.disconnect();
            this._process = null;
        }
    }

}