/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
export type SmbClientNotifArg = {
    auth?: {
        username: string;
        password: string;
    };
    server: string;
    share: string;
    path?: string;
};
export declare class SmbClientNotif extends EventEmitter {
    static FILE_NOTIFY_CHANGE_FILE_NAME: number;
    static FILE_NOTIFY_CHANGE_DIR_NAME: number;
    static FILE_NOTIFY_CHANGE_ATTRIBUTES: number;
    static FILE_NOTIFY_CHANGE_SIZE: number;
    static FILE_NOTIFY_CHANGE_LAST_WRITE: number;
    static FILE_NOTIFY_CHANGE_LAST_ACCESS: number;
    static FILE_NOTIFY_CHANGE_CREATION: number;
    static FILE_NOTIFY_CHANGE_EA: number;
    static FILE_NOTIFY_CHANGE_SECURITY: number;
    static FILE_NOTIFY_CHANGE_STREAM_NAME: number;
    static FILE_NOTIFY_CHANGE_STREAM_SIZE: number;
    static FILE_NOTIFY_CHANGE_STREAM_WRITE: number;
    static EVENT_START: string;
    static EVENT_ERROR: string;
    static EVENT_NOTIFY: string;
    static EVENT_CLOSE: string;
    protected _process: ChildProcess | null;
    constructor();
    protected _getArguments(smbarg: SmbClientNotifArg): any[];
    start(arg: SmbClientNotifArg): void;
    isRun(): boolean;
    stop(): void;
}
