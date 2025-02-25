export = IPFS;
declare const IPFS: typeof import("ipfs-core/src");
declare namespace IPFS {
    export { IPFS };
}
type IPFS = {
    add: (source: import("../../ipfs-core/node_modules/ipfs-core-utils/dist/src/files/normalise-input/normalise-input").FileInput, options?: (import("ipfs-core/src/components/add").AddOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => Promise<import("ipfs-core/src/components/add-all").UnixFSEntry>;
    addAll: (source: import("../../ipfs-core/node_modules/ipfs-core-utils/dist/src/files/normalise-input/normalise-input").Source, options?: (import("ipfs-core/src/components/add-all").AddAllOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/components/add-all").UnixFSEntry>;
    bitswap: {
        stat: (_options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bitswap/stat").BitswapStats>;
        unwant: (cids: import("cids") | import("cids")[], options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<void>;
        wantlist: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("cids")[]>;
        wantlistForPeer: (peerId: string | Uint8Array | import("cids") | import("peer-id"), options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("cids")[]>;
    };
    block: import("ipfs-core/src/components").Block;
    bootstrap: {
        add: (multiaddr: import("multiaddr"), options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bootstrap/utils").Peers>;
        clear: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bootstrap/utils").Peers>;
        list: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bootstrap/utils").Peers>;
        reset: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bootstrap/utils").Peers>;
        rm: (multiaddr: import("multiaddr"), options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bootstrap/utils").Peers>;
    };
    cat: (ipfsPath: string | import("cids"), options?: (import("ipfs-core/src/components/cat").CatOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<Uint8Array>;
    config: import("ipfs-core/src/components/config").Config;
    dag: import("ipfs-core/src/components").DAG;
    dht: {
        get: (key: string | Uint8Array, options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<Uint8Array>;
        put: (key: Uint8Array, value: Uint8Array, options?: import("ipfs-core/src/utils").AbortOptions | undefined) => AsyncIterable<import("ipfs-core/src/components/dht").QueryEvent>;
        findProvs: (cid: import("cids"), options?: (import("ipfs-core/src/components/dht").FindProvsOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/components/dht").PeerInfo>;
        findPeer: (peerId: import("cids") | import("peer-id"), options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<{
            id: string;
            addrs: import("multiaddr")[];
        }>;
        provide: (cids: import("cids") | import("cids")[], options?: (import("ipfs-core/src/components/dht").ProvideOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/components/dht").QueryEvent>;
        query: (peerId: string | import("peer-id"), options?: import("ipfs-core/src/utils").AbortOptions | undefined) => AsyncIterable<{
            id: import("cids");
            addrs: import("multiaddr")[];
        }>;
    } | {
        get: () => Promise<never>;
        put: () => Promise<never>;
        findProvs: () => AsyncGenerator<never, never, unknown>;
        findPeer: () => Promise<never>;
        provide: () => AsyncGenerator<never, never, unknown>;
        query: () => AsyncGenerator<never, never, unknown>;
    };
    dns: (domain: string, options?: (import("ipfs-core/src/components/dns").DNSSettings & import("ipfs-core/src/utils").AbortOptions) | undefined) => Promise<string>;
    files: import("ipfs-core/src/components/files").MFS | undefined;
    get: (ipfsPath: string | import("cids"), options?: (import("ipfs-core/src/components/get").GetOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/utils").File | import("ipfs-core/src/utils").Directory>;
    id: (_options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/id").PeerId>;
    init: () => Promise<never>;
    isOnline: () => boolean;
    ipld: typeof import("ipfs-core/src/components");
    key: {
        export: (name?: any, password?: any, options?: any) => any;
        gen: (name?: any, options?: any) => any;
        import: (name?: any, pem?: any, password?: any, options?: any) => any;
        info: (name?: any, options?: any) => any;
        list: (options?: any) => any;
        rename: (oldName?: any, newName?: any, options?: any) => Promise<{
            was: any;
            now: any;
            id: any;
            overwrite: boolean;
        }>;
        rm: (name?: any, options?: any) => any;
    };
    libp2p: any;
    ls: (ipfsPath: string | import("cids"), options?: (import("ipfs-core/src/components/ls").LSOptions & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/utils").File | import("ipfs-core/src/utils").Directory>;
    name: {
        pubsub: {
            cancel: (name: string, options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<{
                canceled: boolean;
            }>;
            state: (_options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<{
                enabled: boolean;
            }>;
            subs: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<string[]>;
        };
        publish: (value: string, options?: (import("ipfs-core/src/components/name/publish").PublishSettings & import("ipfs-core/src/utils").AbortOptions) | undefined) => Promise<import("ipfs-core/src/components/name/publish").PublishResult>;
        resolve: (name: string, options?: (import("ipfs-core/src/components/name/resolve").ResolveSettings & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<string>;
    };
    object: {
        data: (multihash?: any, options?: any) => Promise<any>;
        get: (multihash?: any, options?: any) => Promise<any>;
        links: (multihash?: any, options?: any) => Promise<any>;
        new: (options?: any) => Promise<any>;
        patch: {
            addLink: (multihash?: any, link?: any, options?: any) => Promise<any>;
            appendData: (multihash?: any, data?: any, options?: any) => Promise<any>;
            rmLink: (multihash?: any, linkRef?: any, options?: any) => Promise<any>;
            setData: (multihash?: any, data?: any, options?: any) => Promise<any>;
        };
        put: (obj?: any, options?: any) => Promise<any>;
        stat: (multihash?: any, options?: any) => Promise<{
            Hash: any;
            NumLinks: any;
            BlockSize: any;
            LinksSize: number;
            DataSize: any;
            CumulativeSize: any;
        }>;
    };
    pin: import("ipfs-core/src/components").Pin;
    ping: (peerId: import("peer-id"), options?: (import("ipfs-core/src/components/ping").PingSettings & import("ipfs-core/src/utils").AbortOptions) | undefined) => AsyncIterable<import("ipfs-core/src/components/ping").Pong | import("ipfs-core/src/components/ping").PingFailure | import("ipfs-core/src/components/ping").StatusUpdate>;
    pubsub: {
        subscribe: (...args: any[]) => any;
        unsubscribe: (...args: any[]) => any;
        publish: (topic?: any, data?: any, _options?: any) => Promise<void>;
        ls: (...args: any[]) => any;
        peers: (...args: any[]) => any;
    };
    refs: ((ipfsPath?: any, options?: any) => AsyncGenerator<{
        ref: any;
    }, void, unknown>) & {
        local: (options?: any) => AsyncGenerator<{
            ref: any;
        }, void, any>;
    };
    repo: {
        gc: (_options?: import("ipfs-core/src/utils").AbortOptions | undefined) => AsyncIterable<import("ipfs-core/src/components/repo/gc").Err | import("ipfs-core/src/components/repo/gc").BlockID>;
        stat: (options?: any) => Promise<{
            numObjects: any;
            repoSize: any;
            repoPath: any;
            version: any;
            storageMax: any;
        }>;
        version: (options?: any) => Promise<any>;
    };
    resolve: (path: string, opts?: (import("ipfs-core/src/components/resolve").ResolveSettings & import("ipfs-core/src/utils").AbortOptions) | undefined) => Promise<string>;
    start: () => {};
    stats: {
        bitswap: (_options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/bitswap/stat").BitswapStats>;
        bw: ((options?: any) => AsyncGenerator<{
            totalIn: any;
            totalOut: any;
            rateIn: import("bignumber.js").default;
            rateOut: import("bignumber.js").default;
        }, void, any>) | (() => Promise<never>);
        repo: (options?: any) => Promise<{
            numObjects: any;
            repoSize: any;
            repoPath: any;
            version: any;
            storageMax: any;
        }>;
    };
    stop: (_options: import("ipfs-core/src/utils").AbortOptions) => Promise<void>;
    swarm: {
        addrs: (options?: any) => Promise<{
            id: any;
            addrs: any;
        }[]>;
        connect: (addr?: any, options?: any) => any;
        disconnect: (addr?: any, options?: any) => any;
        localAddrs: () => Promise<any>;
        peers: (options?: any) => Promise<{
            addr: any;
            peer: any;
        }[]>;
    };
    version: (options?: import("ipfs-core/src/utils").AbortOptions | undefined) => Promise<import("ipfs-core/src/components/version").Version>;
};
//# sourceMappingURL=index.d.ts.map