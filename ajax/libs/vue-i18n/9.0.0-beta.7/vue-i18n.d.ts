import { App } from 'vue';
import { ComponentInternalInstance } from 'vue';
import { ComputedRef } from '@vue/reactivity';
import { ObjectDirective } from 'vue';
import { RawSourceMap } from 'source-map';
import { RenderFunction } from 'vue';
import { SetupContext } from 'vue';
import { VNode } from 'vue';
import { WritableComputedRef } from '@vue/reactivity';

/** @internal */
export declare function baseCompile(source: string, options?: CompileOptions): CodeGenResult;

/** @internal */
export declare interface BaseFormatProps {
    tag?: string | object;
    locale?: Locale;
    scope?: ComponetI18nScope;
}

export declare type Choice = number;

/** @internal */
export declare function clearCompileCache(): void;

/** @internal */
export declare function clearDateTimeFormat<DateTimeFormats = {}, Message = string>(ctx: RuntimeDateTimeContext<DateTimeFormats, Message>, locale: Locale, format: DateTimeFormat): void;

/** @internal */
export declare function clearNumberFormat<NumberFormats, Message = string>(ctx: RuntimeNumberContext<NumberFormats, Message>, locale: Locale, format: NumberFormat_2): void;

declare interface CodeGenOptions {
    mode?: 'normal' | 'arrow';
    onError?: CompileErrorHandler;
    sourceMap?: boolean;
    filename?: string;
}

declare interface CodeGenResult {
    code: string;
    ast: ResourceNode;
    map?: RawSourceMap;
}

/** @internal */
export declare function compile<T = string>(source: string, options?: CompileOptions): MessageFunction<T>;

declare type CompileCacheKeyHandler = (source: string) => string;

/** @internal */
export declare type CompileDomain = 'tokenizer' | 'parser' | 'generator' | 'transformer' | 'compiler';

/** @internal */
export declare interface CompileError extends SyntaxError {
    code: number;
    domain?: CompileDomain;
    location?: SourceLocation;
}

/** @internal */
export declare const enum CompileErrorCodes {
    EXPECTED_TOKEN = 0,
    INVALID_TOKEN_IN_PLACEHOLDER = 1,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER = 2,
    UNKNOWN_ESCAPE_SEQUENCE = 3,
    INVALID_UNICODE_ESCAPE_SEQUENCE = 4,
    UNBALANCED_CLOSING_BRACE = 5,
    UNTERMINATED_CLOSING_BRACE = 6,
    EMPTY_PLACEHOLDER = 7,
    NOT_ALLOW_NEST_PLACEHOLDER = 8,
    INVALID_LINKED_FORMAT = 9,
    MUST_HAVE_MESSAGES_IN_PLURAL = 10,
    UNEXPECTED_LEXICAL_ANALYSIS = 11,
    __EXTEND_POINT__ = 12
}

export declare type CompileErrorHandler = (error: CompileError) => void;

export declare type CompileOptions = {
    warnHtmlMessage?: boolean;
    onCacheKey?: CompileCacheKeyHandler;
} & TransformOptions & CodeGenOptions & ParserOptions & TokenizeOptions;

declare type ComponentInstanceCreatedListener = <Messages>(target: VueI18n<Messages>, global: VueI18n<Messages>) => void;

export declare type ComponetI18nScope = Exclude<I18nScope, 'local'>;

/**
 * Composer Interfaces
 *
 * @remarks
 * This is the interface for being used for Vue 3 Composition API.
 */
export declare interface Composer<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    id: number;
    /**
     * The current locale this composer is using.
     */
    locale: WritableComputedRef<Locale>;
    /**
     * The fallback locale that is used if a string could not be found in the
     * current locale
     */
    fallbackLocale: WritableComputedRef<FallbackLocale>;
    inheritLocale: boolean;
    readonly availableLocales: Locale[];
    readonly messages: ComputedRef<Messages>;
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    readonly numberFormats: ComputedRef<NumberFormats>;
    readonly modifiers: LinkedModifiers<Message>;
    readonly pluralRules?: PluralizationRules;
    readonly isGlobal: boolean;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackRoot: boolean;
    fallbackFormat: boolean;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    /**
     * Get the translation for a given key as string
     * @param key The key to get the translation for
     */
    t(key: Path): string;
    /**
     * Get the translation for a given key as string, searching for plurals.
     *
     * If this method is used in a reactive context, it will re-evaluate once
     * the locale changes.
     *
     * The translated string should contain a | separated value of the
     * singular / plural strings
     *
     * @param key The key to get the translation for
     * @param plural Which plural string to get. 1 returns the first one.
     * @param options Additional options for translation
     */
    t(key: Path, plural: number, options?: TranslateOptions): string;
    /**
     * Get the translation for a given key as string, searching for plurals.
     *
     * If this method is used in a reactive context, it will re-evaluate once
     * the locale changes.
     *
     * @param key The key to get the translation for
     * @param defaultMsg The text to return if no translation was found
     * @param options Additional options for translation
     */
    t(key: Path, defaultMsg: string, options?: TranslateOptions): string;
    /**
     * Get the translation for a given key as string, replacing indexed
     * placeholders.
     *
     * If this method is used in a reactive context, it will re-evaluate once
     * the locale changes.
     *
     * The translated string should contain a {0}, {1}, … for each placeholder
     * in the list.
     * @param key The key to get the translation for
     * @param list The list of placeholders to replace
     * @param options Additional options for translation
     */
    t(key: Path, list: unknown[], options?: TranslateOptions): string;
    t(key: Path, list: unknown[], plural: number): string;
    t(key: Path, list: unknown[], defaultMsg: string): string;
    /**
     * Get the translation for a given key as string, replacing named
     * placeholders.
     *
     * If this method is used in a reactive context, it will re-evaluate once
     * the locale changes.
     *
     * For each placeholder x, the translated string should contain a {x} token.
     * @param key The key to get the translation for
     * @param named The placeholders to replace
     * @param options Additional options for translation
     */
    t(key: Path, named: NamedValue, options?: TranslateOptions): string;
    t(key: Path, named: NamedValue, plural: number): string;
    t(key: Path, named: NamedValue, defaultMsg: string): string;
    t(...args: unknown[]): string;
    d(value: number | Date | string): string;
    d(value: number | Date | string, key: string): string;
    d(value: number | Date | string, key: string, locale: Locale): string;
    d(value: number | Date | string, options: DateTimeOptions): string;
    d(...args: unknown[]): string;
    n(value: number): string;
    n(value: number, key: string): string;
    n(value: number, key: string, locale: Locale): string;
    n(value: number, options: NumberOptions): string;
    n(...args: unknown[]): string;
    tm(key: Path): LocaleMessageValue<Message> | {};
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<Message>;
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    getNumberFormat(locale: Locale): NumberFormat_2;
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    getPostTranslationHandler(): PostTranslationHandler<Message> | null;
    setPostTranslationHandler(handler: PostTranslationHandler<Message> | null): void;
    getMissingHandler(): MissingHandler | null;
    setMissingHandler(handler: MissingHandler | null): void;
}

/**
 * Composer additional options for `useI18n`
 *
 * @remarks
 * `ComposerAdditionalOptions` is extend for {@link ComposerOptions}, so you can specify these options.
 */
export declare interface ComposerAdditionalOptions {
    useScope?: I18nScope;
}

/**
 * Composer Options
 *
 * @remarks
 * This is options to create composer.
 */
export declare interface ComposerOptions<Message = VueMessageType> {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    inheritLocale?: boolean;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: MissingHandler;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackRoot?: boolean;
    fallbackFormat?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
}

/**
 * I18n factory function
 *
 * @param options - see the {@link I18nOptions}
 * @returns {@link I18n} object
 *
 * @remarks
 * When you use Legacy API, you need toto specify options of {@link VueI18nOptions} and `legacy: true` option.
 * When you use composition API, you need to specify options of {@link ComposerOptions}.
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for composition API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: false, // you must specify 'lagacy: false' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 */
export declare function createI18n<Options extends I18nOptions = {}, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): I18n<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Options['legacy'] extends boolean ? Options['legacy'] : true>;

/** @internal */
export declare function createParser(options?: ParserOptions): Parser;

/** @internal */
export declare function createRuntimeContext<Message = string, Options extends RuntimeOptions<Message> = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<Message>> = Record<keyof Options['messages'], LocaleMessageDictionary<Message>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): RuntimeContext<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Message>;

/**
 *  number
 */
declare type CurrencyDisplay = 'symbol' | 'code' | 'name';

declare interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

/** @internal */
export declare type CustomBlocks<Message = VueMessageType> = Array<string | LocaleMessages<Message>> | PreCompileHandler<Message>;

/** @internal */
export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date): string | number | Intl.DateTimeFormatPart[];

/** @internal */
export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string): string | number | Intl.DateTimeFormatPart[];

/** @internal */
export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string, locale: Locale): string | number | Intl.DateTimeFormatPart[];

/** @internal */
export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, options: DateTimeOptions): string | number | Intl.DateTimeFormatPart[];

/** @internal */
export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, ...args: unknown[]): string | number | Intl.DateTimeFormatPart[];

declare type DateTimeDigital = 'numeric' | '2-digit';

declare type DateTimeFormat = {
    [key: string]: DateTimeFormatOptions;
};

export declare const DatetimeFormat: {
    name: string;
    props: {
        value: {
            type: (NumberConstructor | DateConstructor)[];
            required: boolean;
        };
        format: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: DatetimeFormatProps, context: SetupContext): RenderFunction;
};

declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

export declare type DatetimeFormatProps = FormattableProps<number | Date, Intl.DateTimeFormatOptions>;

export declare type DateTimeFormatResult = string;

export declare type DateTimeFormats = {
    [locale: string]: DateTimeFormat;
};

declare type DateTimeHumanReadable = 'long' | 'short' | 'narrow';

/**
 *  # datetime
 *
 *  ## usages:
 *    // for example `context.datetimeFormats` below
 *    'en-US': {
 *      short: {
 *        year: 'numeric', month: '2-digit', day: '2-digit',
 *        hour: '2-digit', minute: '2-digit'
 *      }
 *    },
 *    'ja-JP': { ... }
 *
 *    // datetimeable value only
 *    datetime(context, value)
 *
 *    // key argument
 *    datetime(context, value, 'short')
 *
 *    // key & locale argument
 *    datetime(context, value, 'short', 'ja-JP')
 *
 *    // object sytle argument
 *    datetime(context, value, { key: 'short', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted datetime in parts
 *    datetime(context, value, { key: 'short', part: true })
 *
 *    // orverride context.datetimeFormats[locale] options with functino options
 *    datetime(cnotext, value, 'short', { currency: 'EUR' })
 *    datetime(cnotext, value, 'short', 'ja-JP', { currency: 'EUR' })
 *    datetime(context, value, { key: 'short', part: true }, { currency: 'EUR'})
 */
/** @internal */
export declare type DateTimeOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

declare type DevToolsEmitter = Emittable<DevToolsEmitterEvents>;

declare type DevToolsEmitterEvents = {
    [DevToolsTimelineEvents.COMPILE_ERROR]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.COMPILE_ERROR];
    [DevToolsTimelineEvents.MISSING]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MISSING];
    [DevToolsTimelineEvents.FALBACK]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.FALBACK];
    [DevToolsTimelineEvents.MESSAGE_RESOLVE]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_RESOLVE];
    [DevToolsTimelineEvents.MESSAGE_COMPILATION]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_COMPILATION];
    [DevToolsTimelineEvents.MESSAGE_EVALUATION]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_EVALUATION];
};

declare type DevToolsTimelineEventPayloads = {
    [DevToolsTimelineEvents.COMPILE_ERROR]: {
        message: PathValue;
        error: string;
        start?: number;
        end?: number;
    };
    [DevToolsTimelineEvents.MISSING]: {
        locale: Locale;
        key: Path;
        type: RuntimeMissingType;
    };
    [DevToolsTimelineEvents.FALBACK]: {
        key: Path;
        type: RuntimeMissingType;
        from?: Locale;
        to: Locale | 'global';
    };
    [DevToolsTimelineEvents.MESSAGE_RESOLVE]: {
        type: DevToolsTimelineEvents.MESSAGE_RESOLVE;
        key: Path;
        message: PathValue;
        time: number;
    };
    [DevToolsTimelineEvents.MESSAGE_COMPILATION]: {
        type: DevToolsTimelineEvents.MESSAGE_COMPILATION;
        message: PathValue;
        time: number;
    };
    [DevToolsTimelineEvents.MESSAGE_EVALUATION]: {
        type: DevToolsTimelineEvents.MESSAGE_EVALUATION;
        value: unknown;
        time: number;
    };
};

declare const enum DevToolsTimelineEvents {
    COMPILE_ERROR = "compile-error",
    MISSING = "missing",
    FALBACK = "fallback",
    MESSAGE_RESOLVE = "message-resolve",
    MESSAGE_COMPILATION = "message-compilation",
    MESSAGE_EVALUATION = "message-evaluation"
}

/**
 * Event emitter interface
 */
declare interface Emittable<Events extends Record<EventType, unknown> = {}> {
    /**
     * A map of event names of registered event handlers
     */
    events: EventHandlerMap<Events>;
    /**
     * Register an event handler with the event type
     *
     * @param event - An {@link EventType}
     * @param handler - An {@link EventHandler}, or a {@link WildcardEventHandler} if you are specified "*"
     */
    on<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    /**
     * Unregister an event handler for the event type
     *
     * @param event - An {@link EventType}
     * @param handler - An {@link EventHandler}, or a {@link WildcardEventHandler} if you are specified "*"
     */
    off<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    /**
     * Invoke all handlers with the event type
     *
     * @remarks
     * Note Manually firing "*" handlers should be not supported
     *
     * @param event - An {@link EventType}
     * @param payload - An event payload, optional
     */
    emit<Key extends keyof Events>(event: Key, payload?: Events[keyof Events]): void;
}

/**
 * Event handler
 */
declare type EventHandler<T = unknown> = (payload?: T) => void;

/**
 * Event handler list
 */
declare type EventHandlerList<T = unknown> = Array<EventHandler<T>>;

/**
 * Event handler map
 */
declare type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<keyof Events | '*', EventHandlerList<Events[keyof Events]> | WildcardEventHandlerList<Events>>;

/**
 * Event type
 */
declare type EventType = string | symbol;

/**
 * Exported global composer interface
 *
 * @remarks
 * This interface is the {@link I18n.global | global composer } that is provided interface that is injected into each component with `app.config.globalProperties`.
 */
export declare interface ExportedGlobalComposer {
    /**
     * Locale
     *
     * @remarks
     * This property is proxy-like property for `composer#locale`. About details, see the {@link Composer | Composer#locale } property
     */
    locale: Locale;
    /**
     * Fallback locale
     *
     * @remarks
     * This property is proxy-like property for `composer#fallbackLocale`. About details, see the {@link Composer | Composer#fallbackLocale } property
     */
    fallbackLocale: FallbackLocale;
    /**
     * Available locales
     *
     * @remarks
     * This property is proxy-like property for `composer#availableLocales`. About details, see the {@link Composer | Composer#availableLocales } property
     */
    readonly availableLocales: Locale[];
}

declare type ExtractToStringFunction<T> = T[ExtractToStringKey<T>];

declare type ExtractToStringKey<T> = Extract<keyof T, 'toString'>;

export declare type FallbackLocale = Locale | Locale[] | {
    [locale in string]: Locale[];
} | false;

export declare interface FormattableProps<Value, Format> extends BaseFormatProps {
    value: Value;
    format?: string | Format;
}

export declare interface Formatter {
    interpolate(message: string, values: any, path: string): Array<any> | null;
}

/** @internal */
export declare const friendlyJSONstringify: (json: unknown) => string;

/** @internal */
export declare const generateFormatCacheKey: (locale: string, key: string, source: string) => string;

/** @internal */
export declare function getLocaleChain<Message = string>(ctx: RuntimeCommonContext<Message>, fallback: FallbackLocale, start?: Locale): Locale[];

/** @internal */
export declare function handleMissing<Message = string>(context: RuntimeCommonContext<Message>, key: Path, locale: Locale, missingWarn: boolean | RegExp, type: RuntimeMissingType): unknown;

/**
 * I18n interface
 */
export declare interface I18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Legacy extends boolean = true> {
    /**
     * Vue I18n API mode
     *
     * @remarks
     * if you specified `legacy: true` option in `createI18n`, return `legacy`,
     * else `composition`
     *
     * @default composition
     */
    readonly mode: I18nMode;
    /**
     * Global composer
     */
    readonly global: Legacy extends true ? VueI18n<Messages, DateTimeFormats, NumberFormats> : Composer<Messages, DateTimeFormats, NumberFormats>;
    /**
     * @internal
     */
    install(app: App, ...options: unknown[]): void;
}

/**
 * I18n Additional Options for `createI18n`
 */
export declare interface I18nAdditionalOptions {
    /**
     * Whether vue-i18n legacy API use on your Vue App
     *
     * @default true
     */
    legacy?: boolean;
    /**
     * Whether Whether to inject global props & methods into for each component
     *
     * @default true
     */
    globalInjection?: boolean;
}

/**
 * Vue I18n API mode
 */
export declare type I18nMode = 'legacy' | 'composition';

/**
 * I18n Options for `createI18n`
 *
 * @remarks
 * `I18nOptions` is inherited {@link I18nAdditionalOptions}, {@link ComposerOptions} and {@link VueI18nOptions},
 * so you can specify these options.
 *
 */
export declare type I18nOptions = I18nAdditionalOptions & (ComposerOptions | VueI18nOptions);

/**
 * I18n plugin options
 *
 * @remarks
 * An options specified when installing vue-i18n as Vue plugin with using `app.use`.
 */
export declare interface I18nPluginOptions {
    useI18nComponentName?: boolean;
    globalInstall?: boolean;
}

/**
 * I18n Scope
 */
export declare type I18nScope = 'local' | 'parent' | 'global';

declare type Identifier = string;

/** @internal */
export declare function isTranslateFallbackWarn(fallback: boolean | RegExp, key: Path): boolean;

/** @internal */
export declare function isTranslateMissingWarn(missing: boolean | RegExp, key: Path): boolean;

declare interface LinkedKeyNode extends Node_2 {
    type: NodeTypes.LinkedKey;
    value: string;
}

export declare type LinkedModifiers<T = string> = {
    [key: string]: LinkedModify<T>;
};

declare type LinkedModify<T = string> = (value: T) => MessageType<T>;

declare interface LinkedModitierNode extends Node_2 {
    type: NodeTypes.LinkedModifier;
    value: Identifier;
}

declare interface LinkedNode extends Node_2 {
    type: NodeTypes.Linked;
    modifier?: LinkedModitierNode;
    key: LinkedKeyNode | NamedNode | ListNode | LiteralNode;
}

declare interface ListNode extends Node_2 {
    type: NodeTypes.List;
    index: number;
}

declare interface LiteralNode extends Node_2 {
    type: NodeTypes.Literal;
    value: string;
}

export declare type Locale = string;

export declare interface LocaleMessageArray<Message = string> extends Array<LocaleMessageValue<Message>> {
}

export declare type LocaleMessageDictionary<Message = string> = {
    [property: string]: LocaleMessageValue<Message>;
};

export declare type LocaleMessageObject<Message = string> = LocaleMessageDictionary<Message>;

export declare type LocaleMessages<Message = string> = Record<Locale, LocaleMessageDictionary<Message>>;

export declare type LocaleMessageValue<Message = string> = string | MessageFunction<Message> | LocaleMessageDictionary<Message> | LocaleMessageArray<Message>;

/** @internal */
export declare type MessageCompiler<Message = string> = (source: string, options?: CompileOptions) => MessageFunction<Message>;

declare interface MessageContext<T = string> {
    list(index: number): unknown;
    named(key: string): unknown;
    plural(messages: T[]): T;
    linked(key: Path, modifier?: string): MessageType<T>;
    message(key: Path): MessageFunction<T>;
    type: string;
    interpolate: MessageInterpolate<T>;
    normalize: MessageNormalize<T>;
}

declare type MessageElementNode = TextNode | NamedNode | ListNode | LiteralNode | LinkedNode;

export declare type MessageFunction<T = string> = MessageFunctionCallable | MessageFunctionInternal<T>;

declare type MessageFunctionCallable = <T = string>(ctx: MessageContext<T>) => MessageType<T>;

declare type MessageFunctionInternal<T = string> = {
    (ctx: MessageContext<T>): MessageType<T>;
    key?: string;
    locale?: string;
    source?: string;
};

export declare type MessageFunctions<T = string> = Record<string, MessageFunction<T>>;

declare type MessageInterpolate<T = string> = (val: unknown) => MessageType<T>;

declare interface MessageNode extends Node_2 {
    type: NodeTypes.Message;
    items: MessageElementNode[];
}

declare type MessageNormalize<T = string> = (values: MessageType<string | T>[]) => MessageType<T | T[]>;

declare interface MessageProcessor<T = string> {
    type?: string;
    interpolate?: MessageInterpolate<T>;
    normalize?: MessageNormalize<T>;
}

declare type MessageType<T = string> = T extends string ? string : StringConvertable<T>;

/** @internal */
export declare const MISSING_RESOLVE_VALUE = "";

export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;

declare interface NamedNode extends Node_2 {
    type: NodeTypes.Named;
    key: Identifier;
}

declare type NamedValue<T = {}> = T & Record<string, unknown>;

declare interface Node_2 {
    type: NodeTypes;
    start: number;
    end: number;
    loc?: SourceLocation;
}

declare const enum NodeTypes {
    Resource = 0,
    Plural = 1,
    Message = 2,
    Text = 3,
    Named = 4,
    List = 5,
    Linked = 6,
    LinkedKey = 7,
    LinkedModifier = 8,
    Literal = 9
}

/** @internal */
export declare const NOT_REOSLVED = -1;

/** @internal */
export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number): string | number | Intl.NumberFormatPart[];

/** @internal */
export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, key: string): string | number | Intl.NumberFormatPart[];

/** @internal */
export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, key: string, locale: Locale): string | number | Intl.NumberFormatPart[];

/** @internal */
export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, options: NumberOptions): string | number | Intl.NumberFormatPart[];

/** @internal */
export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, ...args: unknown[]): string | number | Intl.NumberFormatPart[];

export declare const NumberFormat: {
    name: string;
    props: {
        value: {
            type: NumberConstructor;
            required: boolean;
        };
        format: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: NumberFormatProps, context: SetupContext): RenderFunction;
};

declare type NumberFormat_2 = {
    [key: string]: NumberFormatOptions;
};

declare type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

export declare type NumberFormatProps = FormattableProps<number, Intl.NumberFormatOptions>;

export declare type NumberFormatResult = string;

export declare type NumberFormats = {
    [locale: string]: NumberFormat_2;
};

/**
 *  # number
 *
 *  ## usages
 *    // for example `context.numberFormats` below
 *    'en-US': {
 *      'currency': {
 *        style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
 *      }
 *    },
 *    'ja-JP: { ... }
 *
 *    // value only
 *    number(context, value)
 *
 *    // key argument
 *    number(context, value, 'currency')
 *
 *    // key & locale argument
 *    number(context, value, 'currency', 'ja-JP')
 *
 *    // object sytle argument
 *    number(context, value, { key: 'currency', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted number in parts
 *    number(context, value, { key: 'currenty', part: true })
 *
 *    // orverride context.numberFormats[locale] options with functino options
 *    number(cnotext, value, 'currency', { year: '2-digit' })
 *    number(cnotext, value, 'currency', 'ja-JP', { year: '2-digit' })
 *    number(context, value, { key: 'currenty', part: true }, { year: '2-digit'})
 */
/** @internal */
export declare type NumberOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

/** @internal */
export declare function parseDateTimeArgs(...args: unknown[]): [string, number | Date, DateTimeOptions, Intl.DateTimeFormatOptions];

/** @internal */
export declare function parseNumberArgs(...args: unknown[]): [string, number, NumberOptions, Intl.NumberFormatOptions];

/** @internal */
export declare interface Parser {
    parse(source: string): ResourceNode;
}

declare interface ParserOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}

/** @internal */
export declare function parseTranslateArgs(...args: unknown[]): [Path, TranslateOptions];

export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};

export declare type PluralizationRulesMap = {
    [locale: string]: PluralizationRule;
};

declare interface PluralNode extends Node_2 {
    type: NodeTypes.Plural;
    cases: MessageNode[];
}

declare interface Position_2 {
    offset: number;
    line: number;
    column: number;
}

export declare type PostTranslationHandler<Message = string> = (translated: MessageType<Message>) => MessageType<Message>;

declare type PreCompileHandler<Message = VueMessageType> = () => {
    messages: LocaleMessages<Message>;
    functions: MessageFunctions<Message>;
};

declare interface ResourceNode extends Node_2 {
    type: NodeTypes.Resource;
    body: MessageNode | PluralNode;
    helpers?: string[];
}

/** @internal */
export declare interface RuntimeCommonContext<Message = string> {
    locale: Locale;
    fallbackLocale: FallbackLocale;
    missing: RuntimeMissingHandler<Message> | null;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackFormat: boolean;
    unresolving: boolean;
    onWarn(msg: string, err?: Error): void;
}

/** @internal */
export declare interface RuntimeContext<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = string> extends RuntimeTranslationContext<Messages, Message>, RuntimeDateTimeContext<DateTimeFormats, Message>, RuntimeNumberContext<NumberFormats, Message> {
}

/** @internal */
export declare interface RuntimeDateTimeContext<DateTimeFormats = {}, Message = string> extends RuntimeCommonContext<Message> {
    datetimeFormats: DateTimeFormats;
}

/** @internal */
export declare interface RuntimeInternalContext {
    __datetimeFormatters: Map<string, Intl.DateTimeFormat>;
    __numberFormatters: Map<string, Intl.NumberFormat>;
    __localeChainCache?: Map<Locale, Locale[]>;
    __emitter?: DevToolsEmitter;
}

/** @internal */
export declare interface RuntimeInternalOptions {
    __datetimeFormatters?: Map<string, Intl.DateTimeFormat>;
    __numberFormatters?: Map<string, Intl.NumberFormat>;
    __emitter?: DevToolsEmitter;
}

/** @internal */
export declare type RuntimeMissingHandler<Message = string> = (context: RuntimeCommonContext<Message>, locale: Locale, key: Path, type: RuntimeMissingType, ...values: unknown[]) => string | void;

/** @internal */
export declare type RuntimeMissingType = 'translate' | 'datetime format' | 'number format';

/** @internal */
export declare interface RuntimeNumberContext<NumberFormats = {}, Message = string> extends RuntimeCommonContext<Message> {
    numberFormats: NumberFormats;
}

/** @internal */
export declare interface RuntimeOptions<Message = string> {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: RuntimeMissingHandler<Message>;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackFormat?: boolean;
    unresolving?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    processor?: MessageProcessor<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
    messageCompiler?: MessageCompiler<Message>;
    onWarn?: (msg: string, err?: Error) => void;
}

/** @internal */
export declare interface RuntimeTranslationContext<Messages = {}, Message = string> extends RuntimeCommonContext<Message> {
    messages: Messages;
    modifiers: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    postTranslation: PostTranslationHandler<Message> | null;
    processor: MessageProcessor<Message> | null;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    messageCompiler: MessageCompiler<Message>;
}

declare interface SourceLocation {
    start: Position_2;
    end: Position_2;
    source?: string;
}

declare interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

declare interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

declare type StringConvertable<T> = ExtractToStringKey<T> extends never ? unknown : ExtractToStringFunction<T> extends (...args: any) => string ? T : unknown;

declare interface TextNode extends Node_2 {
    type: NodeTypes.Text;
    value: string;
}

declare interface TokenizeOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}

declare interface TransformOptions {
    onError?: CompileErrorHandler;
}

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, plural: number): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, plural: number, options: TranslateOptions): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, defaultMsg: string): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, defaultMsg: string, options: TranslateOptions): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[]): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], plural: number): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], defaultMsg: string): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], options: TranslateOptions): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, plural: number): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, defaultMsg: string): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;

/** @internal */
export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, ...args: unknown[]): MessageType<Message> | number;

/**
 *  # translate
 *
 *  ## usages:
 *    // for example, locale messages key
 *    { 'foo.bar': 'hi {0} !' or 'hi {name} !' }
 *
 *    // no argument, context & path only
 *    translate(context, 'foo.bar')
 *
 *    // list argument
 *    translate(context, 'foo.bar', ['kazupon'])
 *
 *    // named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' })
 *
 *    // plural choice number
 *    translate(context, 'foo.bar', 2)
 *
 *    // plural choice number with name argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 2)
 *
 *    // default message argument
 *    translate(context, 'foo.bar', 'this is default message')
 *
 *    // default message with named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 'Hello {name} !')
 *
 *    // use key as default message
 *    translate(context, 'hi {0} !', ['kazupon'], { default: true })
 *
 *    // locale option, override context.locale
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { locale: 'ja' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { fallbackWarn: false })
 *
 *    // escape parameter option, override context.escapeParameter
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { escapeParameter: true })
 */
/** @internal */
export declare type TranslateOptions = {
    list?: unknown[];
    named?: NamedValue;
    plural?: number;
    default?: string | boolean;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    escapeParameter?: boolean;
};

export declare type TranslateResult = string;

export declare const Translation: {
    name: string;
    props: {
        keypath: {
            type: StringConstructor;
            required: boolean;
        };
        plural: {
            type: (StringConstructor | NumberConstructor)[];
            validator: (val: any) => boolean;
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: TranslationProps, context: SetupContext): RenderFunction;
};

export declare interface TranslationProps extends BaseFormatProps {
    keypath: string;
    plural?: number | string;
}

/** @internal */
export declare function updateFallbackLocale<Message = string>(ctx: RuntimeCommonContext<Message>, locale: Locale, fallback: FallbackLocale): void;

/**
 * Use Composition API starting function
 *
 * @param options - See {@link UseI18nOptions}
 * @returns {@link Composer} object
 *
 * @remarks
 * This function is mainly used by `setup`.
 * If options are specified, Composer object is created for each component and you can be localized on the component.
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 */
export declare function useI18n<Options extends UseI18nOptions = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;

/**
 * I18n Options for `useI18n`
 *
 * @remarks
 * `UseI18nOptions` is inherited {@link ComposerAdditionalOptions} and {@link ComposerOptions},
 * so you can specify these options.
 */
export declare type UseI18nOptions = ComposerAdditionalOptions & ComposerOptions;

export declare const VERSION: string;

export declare function vTDirective<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(i18n: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>): ObjectDirective<HTMLElement>;

/**
 *  VueI18n Interfaces
 *
 *  @remarks
 *  This interface is compatible with interface of `VueI18n` class (offered with vue-i18n@8.x).
 */
export declare interface VueI18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}> {
    id: number;
    locale: Locale;
    fallbackLocale: FallbackLocale;
    readonly availableLocales: Locale[];
    readonly messages: Messages;
    readonly datetimeFormats: DateTimeFormats;
    readonly numberFormats: NumberFormats;
    readonly modifiers: LinkedModifiers<VueMessageType>;
    formatter: Formatter;
    missing: MissingHandler | null;
    postTranslation: PostTranslationHandler<VueMessageType> | null;
    silentTranslationWarn: boolean | RegExp;
    silentFallbackWarn: boolean | RegExp;
    formatFallbackMessages: boolean;
    sync: boolean;
    warnHtmlInMessage: WarnHtmlInMessageLevel;
    escapeParameterHtml: boolean;
    preserveDirectiveContent: boolean;
    t(key: Path): TranslateResult;
    t(key: Path, locale: Locale): TranslateResult;
    t(key: Path, locale: Locale, list: unknown[]): TranslateResult;
    t(key: Path, locale: Locale, named: object): TranslateResult;
    t(key: Path, list: unknown[]): TranslateResult;
    t(key: Path, named: Record<string, unknown>): TranslateResult;
    t(...args: unknown[]): TranslateResult;
    tc(key: Path): TranslateResult;
    tc(key: Path, locale: Locale): TranslateResult;
    tc(key: Path, list: unknown[]): TranslateResult;
    tc(key: Path, named: Record<string, unknown>): TranslateResult;
    tc(key: Path, choice: number): TranslateResult;
    tc(key: Path, choice: number, locale: Locale): TranslateResult;
    tc(key: Path, choice: number, list: unknown[]): TranslateResult;
    tc(key: Path, choice: number, named: Record<string, unknown>): TranslateResult;
    tc(...args: unknown[]): TranslateResult;
    te(key: Path, locale?: Locale): boolean;
    tm(key: Path): LocaleMessageValue<VueMessageType> | {};
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<VueMessageType>;
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    d(value: number | Date): DateTimeFormatResult;
    d(value: number | Date, key: string): DateTimeFormatResult;
    d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult;
    d(value: number | Date, args: {
        [key: string]: string;
    }): DateTimeFormatResult;
    d(...args: unknown[]): DateTimeFormatResult;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    n(value: number): NumberFormatResult;
    n(value: number, key: string): NumberFormatResult;
    n(value: number, key: string, locale: Locale): NumberFormatResult;
    n(value: number, args: {
        [key: string]: string;
    }): NumberFormatResult;
    n(...args: unknown[]): NumberFormatResult;
    getNumberFormat(locale: Locale): NumberFormat_2;
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    getChoiceIndex: (choice: Choice, choicesLength: number) => number;
}

/**
 *  VueI18n Options
 *
 *  @remarks
 *  This option is compatible with the constructor options of `VueI18n` class (offered with vue-i18n@8.x).
 */
export declare interface VueI18nOptions {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<VueMessageType>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    availableLocales?: Locale[];
    modifiers?: LinkedModifiers<VueMessageType>;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    silentTranslationWarn?: boolean | RegExp;
    silentFallbackWarn?: boolean | RegExp;
    formatFallbackMessages?: boolean;
    preserveDirectiveContent?: boolean;
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    escapeParameterHtml?: boolean;
    sharedMessages?: LocaleMessages<VueMessageType>;
    pluralizationRules?: PluralizationRules;
    postTranslation?: PostTranslationHandler<VueMessageType>;
    sync?: boolean;
    componentInstanceCreatedListener?: ComponentInstanceCreatedListener;
}

export declare type VueMessageType = string | VNode;

export declare type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

/**
 * Wildcard event handler
 */
declare type WildcardEventHandler<T = Record<string, unknown>> = (event: keyof T, payload?: T[keyof T]) => void;

/**
 * Wildcard event handler list
 */
declare type WildcardEventHandlerList<T = Record<string, unknown>> = Array<WildcardEventHandler<T>>;

export { }

declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
    /**
     * VueI18n options
     *
     * @remarks
     * See the {@link VueI18nOptions}
     */
    i18n?: VueI18nOptions
    /**
     * For custom blocks options
     * @internal
     */
    __i18n?: CustomBlocks
  }

  export interface ComponentCustomProperties {
    /**
     * Exported Global Composer instance, or global VueI18n instance.
     *
     * @remarks
     * You can get the {@link ExportedGlobalComposer | exported composer instance} which are exported from global {@link Composer | composer instance} created with {@link createI18n}, or global {@link VueI18n | VueI18n instance}.
     * You can get the exported composer instance in {@link I18nMode | compostion mode}, or the Vuei18n instance in {@link I18nMode | legacy mode}, which is the instance you can refer to with this property.
     * The locales, locale messages, and other resources managed by the instance referenced by this property are valid as global scope.
     * If the `i18n` component option is not specified, it's the same as the VueI18n instance that can be referenced by the {@link I18n.global | global} property of the i18n instance.
     */
    $i18n: VueI18n | ExportedGlobalComposer
    /**
     * Translation function
     *
     * @remarks
     * In {@link I18nMode | compostion mode}, the `$t` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer.t | `Composer#t` }.
     *
     * In {@link I18nMode | legacy mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.t | `VueI18n#t`}.
     */
    $t(key: Path): TranslateResult
    $t(key: Path, locale: Locale): TranslateResult
    $t(key: Path, locale: Locale, list: unknown[]): TranslateResult
    $t(key: Path, locale: Locale, named: object): TranslateResult
    $t(key: Path, list: unknown[]): TranslateResult
    $t(key: Path, named: Record<string, unknown>): TranslateResult
    $t(key: Path): string
    $t(key: Path, plural: number): string
    $t(key: Path, plural: number, options: TranslateOptions): string
    $t(key: Path, defaultMsg: string): string
    $t(key: Path, defaultMsg: string, options: TranslateOptions): string
    $t(key: Path, list: unknown[]): string
    $t(key: Path, list: unknown[], plural: number): string
    $t(key: Path, list: unknown[], defaultMsg: string): string
    $t(key: Path, list: unknown[], options: TranslateOptions): string
    $t(key: Path, named: NamedValue): string
    $t(key: Path, named: NamedValue, plural: number): string
    $t(key: Path, named: NamedValue, defaultMsg: string): string
    $t(key: Path, named: NamedValue, options: TranslateOptions): string
    /**
     * Pluralization function
     *
     * @remarks
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.tc | `VueI18n#tc` }.
     *
     * This property is supported for legacy mode only
     */
    $tc(key: Path): TranslateResult
    $tc(key: Path, locale: Locale): TranslateResult
    $tc(key: Path, list: unknown[]): TranslateResult
    $tc(key: Path, named: Record<string, unknown>): TranslateResult
    $tc(key: Path, choice: number): TranslateResult
    $tc(key: Path, choice: number, locale: Locale): TranslateResult
    $tc(key: Path, choice: number, list: unknown[]): TranslateResult
    $tc(
      key: Path,
      choice: number,
      named: Record<string, unknown>
    ): TranslateResult
    /**
     * Translation exist function
     *
     * @remarks
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.te | `VueI18n.#te` }.
     *
     * This property is supported for legacy mode only
     */
    $te(key: Path, locale?: Locale): boolean
    /**
     * Datetime localization function
     *
     * @remarks
     * In {@link I18nMode | compostion mode}, the `$d` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer.d | `Composer#d` }.
     *
     * In {@link I18nMode | legacy mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.d | `VueI18n#d` }.
     */
    $d(value: number | Date): DateTimeFormatResult
    $d(value: number | Date, key: string): DateTimeFormatResult
    $d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult
    $d(
      value: number | Date,
      args: { [key: string]: string }
    ): DateTimeFormatResult
    $d(value: number | Date): string
    $d(value: number | Date, key: string): string
    $d(value: number | Date, key: string, locale: Locale): string
    $d(value: number | Date, options: DateTimeOptions): string
    /**
     * Number localization function
     *
     * @remarks
     * In {@link I18nMode | compostion mode}, the `$n` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance,  and it work on **global scope**. About that details, see {@link Composer.n | `Composer.n` }.
     *
     * In {@link I18nMode | legacy mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.n | `VueI18n.n` }.
     */
    $n(value: number): NumberFormatResult
    $n(value: number, key: string): NumberFormatResult
    $n(value: number, key: string, locale: Locale): NumberFormatResult
    $n(value: number, args: { [key: string]: string }): NumberFormatResult
    $n(value: number): string
    $n(value: number, key: string): string
    $n(value: number, key: string, locale: Locale): string
    $n(value: number, options: NumberOptions): string
    /**
     * Translation locale messages function
     *
     * @remarks
     * In {@link I18nMode | compostion mode}, the `$tm` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer.tm | `Composer.tm` }.
     *
     * In {@link I18nMode | legacy mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n.tm | `VueI18n#tm` }.
     */
    $tm(key: Path): LocaleMessageValue<VueMessageType> | {}
  }
}
