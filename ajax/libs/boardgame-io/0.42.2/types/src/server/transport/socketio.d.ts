/// <reference types="node" />
import { Socket, ServerOptions as SocketOptions } from 'socket.io';
import { ServerOptions as HttpsOptions } from 'https';
import PQueue from 'p-queue';
import { TransportAPI as MasterTransport, AuthFn } from '../../master/master';
/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
export declare function TransportAPI(matchID: string, socket: Socket, clientInfo: SocketIO['clientInfo'], roomInfo: SocketIO['roomInfo']): MasterTransport;
export interface SocketOpts {
    auth?: boolean | AuthFn;
    https?: HttpsOptions;
    socketOpts?: SocketOptions;
    socketAdapter?: any;
}
interface Client {
    matchID: string;
    playerID: string;
    socket: Socket;
}
/**
 * Transport interface that uses socket.io
 */
export declare class SocketIO {
    protected clientInfo: Map<string, Client>;
    protected roomInfo: Map<string, Set<string>>;
    protected perMatchQueue: Map<string, PQueue>;
    private auth;
    private https;
    private socketAdapter;
    private socketOpts;
    constructor({ auth, https, socketAdapter, socketOpts, }?: SocketOpts);
    init(app: any, games: any): void;
    /**
     * Create a PQueue for a given matchID if none exists and return it.
     * @param matchID
     * @returns
     */
    getMatchQueue(matchID: string): PQueue;
    /**
     * Delete a PQueue for a given matchID.
     * @param matchID
     */
    deleteMatchQueue(matchID: string): void;
}
export {};
