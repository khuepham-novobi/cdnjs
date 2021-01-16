import Router from 'koa-router';
import type { Auth } from './auth';
import type { Server, Game, StorageAPI } from '../types';
/**
 * Creates a new match.
 *
 * @param {object} db - The storage API.
 * @param {object} game - The game config object.
 * @param {number} numPlayers - The number of players.
 * @param {object} setupData - User-defined object that's available
 *                             during game setup.
 * @param {object } lobbyConfig - Configuration options for the lobby.
 * @param {boolean} unlisted - Whether the match should be excluded from public listing.
 */
export declare const CreateMatch: ({ db, game, numPlayers, setupData, uuid, unlisted, }: {
    db: StorageAPI.Sync | StorageAPI.Async;
    game: Game<any, import("../types").Ctx, any>;
    numPlayers: number;
    setupData: any;
    uuid: () => string;
    unlisted: boolean;
}) => Promise<string>;
export declare const createRouter: ({ db, auth, games, uuid, }: {
    auth: Auth;
    games: Game<any, import("../types").Ctx, any>[];
    uuid?: () => string;
    db: StorageAPI.Sync | StorageAPI.Async;
}) => Router<any, Server.AppCtx>;
export declare const configureApp: (app: Server.App, router: Router<any, Server.AppCtx>) => void;
