import { spawn } from 'child_process';
import { SmbClient } from './SmbClient.js';
import { EventEmitter } from 'events';
export class SmbClientNotif extends EventEmitter {
    static FILE_NOTIFY_CHANGE_FILE_NAME = 1;
    static FILE_NOTIFY_CHANGE_DIR_NAME = 2;
    static FILE_NOTIFY_CHANGE_ATTRIBUTES = 3;
    static FILE_NOTIFY_CHANGE_SIZE = 4;
    static FILE_NOTIFY_CHANGE_LAST_WRITE = 10;
    static FILE_NOTIFY_CHANGE_LAST_ACCESS = 20;
    static FILE_NOTIFY_CHANGE_CREATION = 40;
    static FILE_NOTIFY_CHANGE_EA = 80;
    static FILE_NOTIFY_CHANGE_SECURITY = 100;
    static FILE_NOTIFY_CHANGE_STREAM_NAME = 200;
    static FILE_NOTIFY_CHANGE_STREAM_SIZE = 400;
    static FILE_NOTIFY_CHANGE_STREAM_WRITE = 800;
    static EVENT_START = 'start';
    static EVENT_ERROR = 'error';
    static EVENT_NOTIFY = 'notify';
    static EVENT_CLOSE = 'close';
    _process = null;
    constructor() {
        super();
    }
    _getArguments(smbarg) {
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
    start(arg) {
        const args = this._getArguments(arg);
        this._process = spawn(SmbClient.APP, args);
        this.emit(SmbClientNotif.EVENT_START, {});
        this._process.stdout.on('data', (buf) => {
            const msgs = buf.toString().split('\n');
            console.log(msgs);
        });
        this._process.stderr.on('data', (buf) => {
            const msgs = buf.toString().split('\n');
            console.log(msgs);
            this.emit(SmbClientNotif.EVENT_ERROR, {});
        });
    }
    isRun() {
        if (this._process) {
            if (this._process.exitCode === null) {
                return true;
            }
        }
        return false;
    }
    stop() {
        if (this._process) {
            this.emit(SmbClientNotif.EVENT_CLOSE, {});
            this._process.disconnect();
            this._process = null;
        }
    }
}
//# sourceMappingURL=SmbClientNotif.js.map