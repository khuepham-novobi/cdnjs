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

/**
 * BaseFormat Props for Components that is offered Vue I18n
 *
 * @remarks
 * The interface definitions of the underlying props of components such as Translation, DatetimeForamt, and NumberFromat.
 *
 * @VueI18nComponent
 */
export declare interface BaseFormatProps {
    /**
     * @remarks
     * Used to wrap the content that is distribute in the slot. If omitted, the slot content is treated as Fragments.
     *
     * You can specify a string-based tag name, such as `p`, or the object for which the component is defined.
     */
    tag?: string | object;
    /**
     * @remarks
     * Specifies the locale to be used for the component.
     *
     * If specified, the global scope or the locale of the parent scope of the target component will not be overridden and the specified locale will be used.
     */
    locale?: Locale;
    /**
     * @remarks
     * Specifies the scope to be used in the target component.
     *
     * You can specify either `global` or `parent`.
     *
     * If `global` is specified, global scope is used, else then `parent` is specified, the scope of the parent of the target component is used.
     *
     * If the parent is a global scope, the global scope is used, if it's a local scope, the local scope is used.
     */
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
 * Composer interfaces
 *
 * @remarks
 * This is the interface for being used for Vue 3 Composition API.
 *
 * @VueI18nComposition
 */
export declare interface Composer<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    /**
     * @remarks
     * Instance ID.
     */
    id: number;
    /**
     * @remarks
     * The current locale this Composer instance is using.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     */
    locale: WritableComputedRef<Locale>;
    /**
     * @remarks
     * The current fallback locales this Composer instance is using.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    fallbackLocale: WritableComputedRef<FallbackLocale>;
    /**
     * @remarks
     * Whether inherit the root level locale to the component localization locale.
     *
     * @VueI18nSee [Local Scope](../essentials/scope#local-scope-2)
     */
    inheritLocale: boolean;
    /**
     * @remarks
     * The list of available locales in `messages` in lexical order.
     */
    readonly availableLocales: Locale[];
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../essentials/started)
     */
    readonly messages: ComputedRef<Messages>;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../essentials/datetime)
     */
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../essentials/number)
     */
    readonly numberFormats: ComputedRef<NumberFormats>;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../essentials/syntax#custom-modifiers)
     */
    readonly modifiers: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../essentials/pluralization#custom-pluralization)
     */
    readonly pluralRules: PluralizationRules;
    /**
     * @remarks
     * Whether this composer instance is global or not
     */
    readonly isGlobal: boolean;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    missingWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress fallback warnings when localization fails.
     */
    fallbackWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether to fallback to root level (global) localization when localization fails.
     *
     * If `false`, it's warned, and is returned the key.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    fallbackRoot: boolean;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    fallbackFormat: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * If you set `false`, will check the locale messages on the Composer instance.
     *
     * If you are specified `true`, a warning will be output at console.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../migration/breaking#change-warnhtmlinmessage-option-default-value)
     */
    warnHtmlMessage: boolean;
    /**
     * @remarks
     * Whether interpolation parameters are escaped before the message is translated.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     */
    escapeParameter: boolean;
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If not, then it’s translated with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     */
    t(key: Path): string;
    /**
     * Locale message translation for plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, return a pluralized translation message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../essentials/pluralization)
     */
    t(key: Path, plural: number, options?: TranslateOptions): string;
    /**
     * Locale message translation for missing default mssage
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, if no translation was found, return a default message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A defautl message to return if no translation was found
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    t(key: Path, defaultMsg: string, options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../essentials/syntax#list-interpolation)
     */
    t(key: Path, list: unknown[], options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../essentials/pluralization)
     * @VueI18nSee [List interpolation](../essentials/syntax#list-interpolation)
     */
    t(key: Path, list: unknown[], plural: number): string;
    /**
     * Locale message translation for list interpolations and missing default mssage
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A defautl message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../essentials/syntax#list-interpolation)
     */
    t(key: Path, list: unknown[], defaultMsg: string): string;
    /**
     * Locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../essentials/syntax#named-interpolation)
     */
    t(key: Path, named: NamedValue, options?: TranslateOptions): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../essentials/pluralization)
     * @VueI18nSee [Named interpolation](../essentials/syntax#named-interpolation)
     */
    t(key: Path, named: NamedValue, plural: number): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A defautl message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../essentials/syntax#named-interpolation)
     */
    t(key: Path, named: NamedValue, defaultMsg: string): string;
    /** @internal */
    t(...args: unknown[]): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Datetime formatting](../essentials/datetime)
     */
    d(value: number | Date | string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats at target locale
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string, locale: Locale): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link DateTimeOptions}.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param options - Additional {@link DateTimeOptions | options} for datetime formatting
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, options: DateTimeOptions): string;
    /** @internal */
    d(...args: unknown[]): string;
    /**
     * Number Formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope number formats.
     *
     * @param value - A number value
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Number formatting](../essentials/number)
     */
    n(value: number): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns Formatted value
     */
    n(value: number, key: string): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats at target locale.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    n(value: number, key: string, locale: Locale): string;
    /**
     *
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link NumberOptions}.
     *
     * @param value - A number value
     * @param options - Additional {@link NumberOptions | options} for number formatting
     *
     * @returns Formatted value
     */
    n(value: number, options: NumberOptions): string;
    /** @internal */
    n(...args: unknown[]): string;
    /**
     * Translation locale message exist
     *
     * @remarks
     * whether do exist locale message on Composer instance [messages](composition#messages).
     *
     * If you specified `locale`, check the locale messages of `locale`.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope
     *
     * @returns If found locale message, `true`, else `false`
     */
    te(key: Path, locale?: Locale): boolean;
    /**
     * Locale messages getter
     *
     * @remarks
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @return Locale messages
     */
    tm(key: Path): LocaleMessageValue<Message> | {};
    /**
     * Get locale message
     *
     * @remarks
     * get locale message from Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     *
     * @returns Locale messages
     */
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<Message>;
    /**
     * Set locale message
     *
     * @remarks
     * Set locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Merge locale message
     *
     * @remarks
     * Merge locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Get datetime format
     *
     * @remarks
     * get datetime format from Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     *
     * @returns Datetime format
     */
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    /**
     * Set datetime format
     *
     * @remarks
     * Set datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Merge datetime format
     *
     * @remarks
     * Merge datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Get number format
     *
     * @remarks
     * get number format from Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     *
     * @returns Number format
     */
    getNumberFormat(locale: Locale): NumberFormat_2;
    /**
     * Set number format
     *
     * @remarks
     * Set number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    /**
     * Merge number format
     *
     * @remarks
     * Merge number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    /**
     * Get post translation handler
     *
     * @returns {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    getPostTranslationHandler(): PostTranslationHandler<Message> | null;
    /**
     * Set post translation handler
     *
     * @param handler - A {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    setPostTranslationHandler(handler: PostTranslationHandler<Message> | null): void;
    /**
     * Get missing handler
     *
     * @returns {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    getMissingHandler(): MissingHandler | null;
    /**
     * Set missing handler
     *
     * @param handler - A {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    setMissingHandler(handler: MissingHandler | null): void;
}

/**
 * Composer additional options for `useI18n`
 *
 * @remarks
 * `ComposerAdditionalOptions` is extend for {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export declare interface ComposerAdditionalOptions {
    useScope?: I18nScope;
}

/**
 * Composer Options
 *
 * @remarks
 * This is options to create composer.
 *
 * @VueI18nComposition
 */
export declare interface ComposerOptions<Message = VueMessageType> {
    /**
     * @remarks
     * The locale of localization.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     *
     * @defaultValue `'en-US'`
     */
    locale?: Locale;
    /**
     * @remarks
     * The locale of fallback localization.
     *
     * For more complex fallback definitions see fallback.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackLocale?: FallbackLocale;
    /**
     * @remarks
     * Whether inheritance the root level locale to the component localization locale.
     *
     * If `false`, regardless of the root level locale, localize for each component locale.
     *
     * @VueI18nSee [Local Scope](../essentials/scope#local-scope-2)
     *
     * @defaultValue `true`
     */
    inheritLocale?: boolean;
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../essentials/started)
     *
     * @defaultValue `{}`
     */
    messages?: LocaleMessages<Message>;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../essentials/datetime)
     *
     * @defaultValue `{}`
     */
    datetimeFormats?: DateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../essentials/number)
     *
     * @defaultValue `{}`
     */
    numberFormats?: NumberFormats;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../essentials/syntax#custom-modifiers)
     */
    modifiers?: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../essentials/pluralization#custom-pluralization)
     *
     * @defaultValue `{}`
     */
    pluralRules?: PluralizationRules;
    /**
     * @remarks
     * A handler for localization missing.
     *
     * The handler gets called with the localization target locale, localization path key, the Vue instance and values.
     *
     * If missing handler is assigned, and occurred localization missing, it's not warned.
     *
     * @defaultValue `null`
     */
    missing?: MissingHandler;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * If `true`, suppress localization fail warnings.
     *
     * If you use regular expression, you can suppress localization fail warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    missingWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key.
     *
     * If `true`, skip writing templates for your "base" language; the keys are your templates.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    fallbackWarn?: boolean | RegExp;
    /**
     * @remarks
     * In the component localization, whether to fall back to root level (global) localization when localization fails.
     *
     * If `false`, it's warned, and is returned the key.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackRoot?: boolean;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    fallbackFormat?: boolean;
    /**
     * @remarks
     * A handler for post processing of translation.
     *
     * The handler gets after being called with the `t`.
     *
     * This handler is useful if you want to filter on translated text such as space trimming.
     *
     * @defaultValue `null`
     */
    postTranslation?: PostTranslationHandler<Message>;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * See the warnHtmlMessage property.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../migration/breaking#change-warnhtmlinmessage-option-default-value)
     *
     * @defaultValue `'off'`
     */
    warnHtmlMessage?: boolean;
    /**
     * @remarks
     * If `escapeParameter` is configured as true then interpolation parameters are escaped before the message is translated.
     *
     * This is useful when translation output is used in `v-html` and the translation resource contains html markup (e.g. <b> around a user provided value).
     *
     * This usage pattern mostly occurs when passing precomputed text strings into UI compontents.
     *
     * The escape process involves replacing the following symbols with their respective HTML character entities: `<`, `>`, `"`, `'`.
     *
     * Setting `escapeParameter` as true should not break existing functionality but provides a safeguard against a subtle type of XSS attack vectors.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     *
     * @defaultValue `false`
     */
    escapeParameter?: boolean;
}

/**
 * Vue I18n factory
 *
 * @param options - An options, see the {@link I18nOptions}
 *
 * @returns {@link I18n} instance
 *
 * @remarks
 * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
 *
 * If you use composition API mode, you need to specify {@link ComposerOptions}.
 *
 * @VueI18nSee [Getting Started](../essentials/started)
 * @VueI18nSee [Composition API](../advanced/composition)
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
 *
 * @VueI18nGeneral
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

/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeForamt#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */
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

/**
 * DatetimeForamt Component Props
 *
 * @VueI18nComponent
 */
export declare type DatetimeFormatProps = FormattableProps<number | Date, Intl.DateTimeFormatOptions>;

/** @VueI18nLegacy */
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
/**
 * DateTime options
 *
 * @remarks
 * Options for Datetime formatting API
 *
 * @VueI18nGeneral
 */
export declare interface DateTimeOptions {
    /**
     * @remarks
     * The target format key
     */
    key?: string;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do resolve on format keys when your language lacks a formatting for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether to use [Intel.DateTimeForrmat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
     */
    part?: boolean;
}

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
 * Exported global composer instance
 *
 * @remarks
 * This interface is the [global composer](general#global) that is provided interface that is injected into each component with `app.config.globalProperties`.
 *
 * @VueI18nGeneral
 */
export declare interface ExportedGlobalComposer {
    /**
     * Locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#locale`. About details, see the [Composer#locale](composition#locale)
     */
    locale: Locale;
    /**
     * Fallback locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#fallbackLocale`. About details, see the [Composer#fallbackLocale](composition#fallbacklocale)
     */
    fallbackLocale: FallbackLocale;
    /**
     * Available locales
     *
     * @remarks
     * This property is proxy-like property for `Composer#availableLocales`. About details, see the [Composer#availableLocales](composition#availablelocales)
     */
    readonly availableLocales: Locale[];
}

declare type ExtractToStringFunction<T> = T[ExtractToStringKey<T>];

declare type ExtractToStringKey<T> = Extract<keyof T, 'toString'>;

/** @VueI18nGeneral */
export declare type FallbackLocale = Locale | Locale[] | {
    [locale in string]: Locale[];
} | false;

/**
 * Formattable Props
 *
 * @remarks
 * The props used in DatetimeFormat, or NumberFormat component
 *
 * @VueI18nComponent
 */
export declare interface FormattableProps<Value, Format> extends BaseFormatProps {
    /**
     * @remarks
     * The value specified for the target component
     */
    value: Value;
    /**
     * @remarks
     * The format to use in the target component.
     *
     * Specify the format key string or the format as defined by the Intl API in ECMA 402.
     */
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
 * I18n instance
 *
 * @remarks
 * The instance required for installation as the Vue plugin
 *
 * @VueI18nGeneral
 */
export declare interface I18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Legacy extends boolean = true> {
    /**
     * Vue I18n API mode
     *
     * @remarks
     * If you specified `legacy: true` option in `createI18n`, return `legacy`, else `composition`
     *
     * @defaultValue `'composition'`
     */
    readonly mode: I18nMode;
    /**
     * The property accessible to the global Composer instance or VueI18n instance
     *
     * @remarks
     * If the [I18n#mode](general#mode) is `'legacy'`, then you can access to a global {@link VueI18n} instance, else then [I18n#mode](general#mode) is `'legacy' `, you can access to the global {@link Composer} instance.
     *
     * An instance of this property is **global scope***.
     */
    readonly global: Legacy extends true ? VueI18n<Messages, DateTimeFormats, NumberFormats> : Composer<Messages, DateTimeFormats, NumberFormats>;
    /**
     * @internal
     */
    install(app: App, ...options: unknown[]): void;
}

/**
 * I18n Additional Options
 *
 * @remarks
 * Specific options for {@link createI18n}
 *
 * @VueI18nGeneral
 */
export declare interface I18nAdditionalOptions {
    /**
     * Whether vue-i18n Legacy API mode use on your Vue App
     *
     * @remarks
     * The default is to use the Lagacy API mode. If you want to use the compositoin API mode, you need to set it to `false`.
     *
     * @VueI18nSee [Composition API](../advanced/composition)
     *
     * @defaultValue `true`
     */
    legacy?: boolean;
    /**
     * Whether Whether to inject global properties & functions into for each component.
     *
     * @remarks
     * If set to `true`, then properties and methods prefixed with `$` are injected into Vue Component.
     *
     * @VueI18nSee [Implicit with injected properties and functions](../advanced/composition#implicit-with-injected-properties-and-functions)
     * @VueI18nSee [ComponentCustomProperties](injection#componentcustomproperties)
     *
     * @defaultValue `false`
     */
    globalInjection?: boolean;
}

/**
 * Vue I18n API mode
 *
 * @VueI18nSee [I18n#mode](general#mode)
 *
 * @VueI18nGeneral
 */
export declare type I18nMode = 'legacy' | 'composition';

/**
 * I18n Options for `createI18n`
 *
 * @remarks
 * `I18nOptions` is inherited {@link I18nAdditionalOptions}, {@link ComposerOptions} and {@link VueI18nOptions},
 * so you can specify these options.
 *
 * @VueI18nGeneral
 */
export declare type I18nOptions = I18nAdditionalOptions & (ComposerOptions | VueI18nOptions);

/**
 * Vue I18n plugin options
 *
 * @remarks
 * An options specified when installing Vue I18n as Vue plugin with using `app.use`.
 *
 * @VueI18nGeneral
 */
export declare interface I18nPluginOptions {
    /**
     * Whether to use the tag name `i18n` for Translation Component
     *
     * @remarks
     * This option is used for compatibility with Vue I18n v8.x.
     *
     * If you can't migrate right away, you can temporarily enable this option, and you can work Translation Component.
     *
     * @defaultValue `false`
     */
    useI18nComponentName?: boolean;
    /**
     * Whether to globally install the components that is offered by Vue I18n
     *
     * @remarks
     * If this option is enabled, the components will be installed globally at `app.use` time.
     *
     * If you want to install manually in the `import` syntax, you can set it to `false` to install when needed.
     *
     * @defaultValue `true`
     */
    globalInstall?: boolean;
}

/**
 * I18n Scope
 *
 * @VueI18nSee [ComposerAdditionalOptions#useScope](composition#usescope)
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nGeneral
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

/** @VueI18nGeneral */
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

/** @VueI18nGeneral */
export declare type Locale = string;

/** @VueI18nGeneral */
export declare interface LocaleMessageArray<Message = string> extends Array<LocaleMessageValue<Message>> {
}

/** @VueI18nGeneral */
export declare type LocaleMessageDictionary<Message = string> = {
    [property: string]: LocaleMessageValue<Message>;
};

/** @VueI18nLegacy */
export declare type LocaleMessageObject<Message = string> = LocaleMessageDictionary<Message>;

/** @VueI18nGeneral */
export declare type LocaleMessages<Message = string> = Record<Locale, LocaleMessageDictionary<Message>>;

/** @VueI18nGeneral */
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

/** @VueI18nComposition */
export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;

declare interface NamedNode extends Node_2 {
    type: NodeTypes.Named;
    key: Identifier;
}

/** @VueI18nGeneral */
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

/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberForamt#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */
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

/**
 * NumberFormat Component Props
 *
 * @VueI18nComponent
 */
export declare type NumberFormatProps = FormattableProps<number, Intl.NumberFormatOptions>;

/** @VueI18nLegacy */
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
/**
 * Number Options
 *
 * @remarks
 * Options for Number formatting API
 *
 * @VueI18nGeneral
 */
export declare interface NumberOptions {
    /**
     * @remarks
     * The target format key
     */
    key?: string;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do resolve on format keys when your language lacks a formatting for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether to use [Intel.NumberForrmat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
     */
    part?: boolean;
}

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

/** @VueI18nGeneral */
export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

/** @VueI18nGeneral */
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

/** @VueI18nGeneral */
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
/**
 * Translate Options
 *
 * @remarks
 * Options for Translation API
 *
 * @VueI18nGeneral
 */
export declare interface TranslateOptions {
    /**
     * @remarks
     * List interpolation
     */
    list?: unknown[];
    /**
     * @remarks
     * Named interpolation
     */
    named?: NamedValue;
    /**
     * @remarks
     * Plulralzation choice number
     */
    plural?: number;
    /**
     * @remarks
     * Default message when is occured translation missing
     */
    default?: string | boolean;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether do escape parameter for list or named interpolation values
     */
    escapeParameter?: boolean;
}

/** @VueI18nLegacy */
export declare type TranslateResult = string;

/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n path="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */
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

/**
 * Translation Directive (`v-t`)
 *
 * @remarks
 * Update the element `textContent` that localized with locale messages.
 *
 * You can use string syntax or object syntax.
 *
 * String syntax can be specified as a keypath of locale messages.
 *
 * If you can be used object syntax, you need to specify as the object key the following params
 *
 * ```
 * - path: required, key of locale messages
 * - locale: optional, locale
 * - args: optional, for list or named formatting
 * ```
 *
 * @example
 * ```html
 * <!-- string syntax: literal -->
 * <p v-t="'foo.bar'"></p>
 *
 * <!-- string syntax: binding via data or computed props -->
 * <p v-t="msg"></p>
 *
 * <!-- object syntax: literal -->
 * <p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>
 *
 * <!-- object syntax: binding via data or computed props -->
 * <p v-t="{ path: greeting, args: { name: fullName } }"></p>
 * ```
 *
 * @VueI18nDirective
 */
export declare type TranslationDirective<T = HTMLElement> = ObjectDirective<T>;

/**
 * Translation Component Props
 *
 * @VueI18nComponent
 */
export declare interface TranslationProps extends BaseFormatProps {
    /**
     * @remarks
     * The locale message key can be specified prop
     */
    keypath: string;
    /**
     * @remarks
     * The Plural Choicing the message number prop
     */
    plural?: number | string;
}

/** @internal */
export declare function updateFallbackLocale<Message = string>(ctx: RuntimeCommonContext<Message>, locale: Locale, fallback: FallbackLocale): void;

/**
 * Use Composition API for Vue I18n
 *
 * @param options - An options, see {@link UseI18nOptions}
 *
 * @returns {@link Composer} instance
 *
 * @remarks
 * This function is mainly used by `setup`.
 *
 * If options are specified, Composer instance is created for each component and you can be localized on the component.
 *
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
 *
 * @VueI18nComposition
 */
export declare function useI18n<Options extends UseI18nOptions = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;

/**
 * I18n Options for `useI18n`
 *
 * @remarks
 * `UseI18nOptions` is inherited {@link ComposerAdditionalOptions} and {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export declare type UseI18nOptions = ComposerAdditionalOptions & ComposerOptions;

/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
export declare const VERSION: string;

export declare function vTDirective<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(i18n: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>): TranslationDirective<HTMLElement>;

/**
 *  VueI18n legacy interfaces
 *
 *  @remarks
 *  This interface is compatible with interface of `VueI18n` class (offered with Vue I18n v8.x).
 *
 *  @VueI18nLegacy
 */
export declare interface VueI18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}> {
    /**
     * @remarks
     * Instance ID.
     */
    id: number;
    /**
     * @remarks
     * The current locale this VueI18n instance is using.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     */
    locale: Locale;
    /**
     * @remarks
     * The current fallback locales this VueI18n instance is using.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    fallbackLocale: FallbackLocale;
    /**
     * @remarks
     * The list of available locales in `messages` in lexical order.
     */
    readonly availableLocales: Locale[];
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../essentials/started)
     */
    readonly messages: Messages;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../essentials/datetime)
     */
    readonly datetimeFormats: DateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../essentials/number)
     */
    readonly numberFormats: NumberFormats;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../essentials/syntax#custom-modifiers)
     */
    readonly modifiers: LinkedModifiers<VueMessageType>;
    /**
     * @remarks
     * The formatter that implemented with Formatter interface.
     *
     * @deprecated TODO
     */
    formatter: Formatter;
    /**
     * @remarks
     * A handler for localization missing.
     */
    missing: MissingHandler | null;
    /**
     * @remarks
     * A handler for post processing of translation.
     */
    postTranslation: PostTranslationHandler<VueMessageType> | null;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    silentTranslationWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress fallback warnings when localization fails.
     */
    silentFallbackWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     */
    formatFallbackMessages: boolean;
    /**
     * @remarks
     * Whether synchronize the root level locale to the component localization locale.
     *
     * @VueI18nSee [Local Scope](../essentials/scope#local-scope-2)
     */
    sync: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * If you set `warn` or` error`, will check the locale messages on the VueI18n instance.
     *
     * If you are specified `warn`, a warning will be output at console.
     *
     * If you are specified `error` will occurred an Error.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../migration/breaking#change-warnhtmlinmessage-option-default-value)
     */
    warnHtmlInMessage: WarnHtmlInMessageLevel;
    /**
     * @remarks
     * Whether interpolation parameters are escaped before the message is translated.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     */
    escapeParameterHtml: boolean;
    /**
     * @remarks
     * Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.
     *
     * @VueI18nSee [Custom Directive](../advanced/directive)
     * @VueI18nSee [Remove preserveDirectiveContent option](../migration/breaking#remove-preservedirectivecontent-option)
     *
     * @deprecated The `v-t` directive for Vue 3 now preserves the default content. Therefore, this option and its properties have been removed from the VueI18n instance.
     */
    preserveDirectiveContent: boolean;
    /**
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../essentials/pluralization#custom-pluralization)
     */
    pluralizationRules: PluralizationRules;
    /**
     * Locale message translation.
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s translated with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     */
    t(key: Path): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Translated message
     */
    t(key: Path, locale: Locale): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     * @param list - A values of list interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../essentials/syntax#list-interpolation)
     */
    t(key: Path, locale: Locale, list: unknown[]): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     * @param named - A values of named interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../essentials/syntax#named-interpolation)
     */
    t(key: Path, locale: Locale, named: object): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../essentials/syntax#list-interpolation)
     */
    t(key: Path, list: unknown[]): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../essentials/syntax#named-interpolation)
     */
    t(key: Path, named: Record<string, unknown>): TranslateResult;
    /** @internal */
    t(...args: unknown[]): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s pluraled in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s pluraled with global scope locale messages.
     *
     * The plural choice number is handled with default `1`.
     *
     * @param key - A target locale message key
     *
     * @returns Pluraled message
     *
     * @VueI18nSee [Pluralization](../essentials/pluralization)
     */
    tc(key: Path): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Pluraled message
     */
    tc(key: Path, locale: Locale): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, list: unknown[]): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, named: Record<string, unknown>): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, locale: Locale): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param list - A values of list interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, list: unknown[]): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param named - A values of named interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, named: Record<string, unknown>): TranslateResult;
    /** @internal */
    tc(...args: unknown[]): TranslateResult;
    /**
     * Translation locale message exist
     *
     * @remarks
     * whether do exist locale message on VueI18n instance [messages](legacy#messages).
     *
     * If you specified `locale`, check the locale messages of `locale`.
     *
     * @param key - A target locale message key
     * @param locale - A target locale
     *
     * @returns If found locale message, `true`, else `false`
     */
    te(key: Path, locale?: Locale): boolean;
    /**
     * Locale messages getter
     *
     * @remarks
     * If [i18n component options](injection#i18n) is specified, it’s get in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s get with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @return Locale messages
     */
    tm(key: Path): LocaleMessageValue<VueMessageType> | {};
    /**
     * Get locale message
     *
     * @remarks
     * get locale message from VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     *
     * @returns Locale messages
     */
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<VueMessageType>;
    /**
     * Set locale message
     *
     * @remarks
     * Set locale message to VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    /**
     * Merge locale message
     *
     * @remarks
     * Merge locale message to VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    /**
     * Datetime formating
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s formatted in preferentially local scope datetime formats than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s formatted with global scope datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Datetime formatting](../essentials/datetime)
     */
    d(value: number | Date): DateTimeFormatResult;
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns Formatted value
     */
    d(value: number | Date, key: string): DateTimeFormatResult;
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult;
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param args - An argument values
     *
     * @returns Formatted value
     */
    d(value: number | Date, args: {
        [key: string]: string;
    }): DateTimeFormatResult;
    /** @internal */
    d(...args: unknown[]): DateTimeFormatResult;
    /**
     * Get datetime format
     *
     * @remarks
     * get datetime format from VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     *
     * @returns Datetime format
     */
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    /**
     * Set datetime format
     *
     * @remarks
     * Set datetime format to VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Merge datetime format
     *
     * @remarks
     * Merge datetime format to VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Number formating
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s formatted in preferentially local scope number formats than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s formatted with global scope number formats.
     *
     * @param value - A number value
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Number formatting](../essentials/number)
     */
    n(value: number): NumberFormatResult;
    /**
     * Number formating
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
       @param key - A key of number formats
     *
     * @returns Formatted value
     */
    n(value: number, key: string): NumberFormatResult;
    /**
     * Number formating
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    n(value: number, key: string, locale: Locale): NumberFormatResult;
    /**
     * Number formating
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
     * @param args - An argument values
     *
     * @returns Formatted value
     */
    n(value: number, args: {
        [key: string]: string;
    }): NumberFormatResult;
    /** @internal */
    n(...args: unknown[]): NumberFormatResult;
    /**
     * Get number format
     *
     * @remarks
     * get number format from VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     *
     * @returns Number format
     */
    getNumberFormat(locale: Locale): NumberFormat_2;
    /**
     * Set number format
     *
     * @remarks
     * Set number format to VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    /**
     * Merge number format
     *
     * @remarks
     * Merge number format to VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    /**
     * Get choice index
     *
     * @remarks
     * Get pluralization index for current pluralizing number and a given amount of choices.
     *
     * @deprecated Use `pluralizationRules` option insted of `getChoiceIndex`.
     */
    getChoiceIndex: (choice: Choice, choicesLength: number) => number;
}

/**
 *  VueI18n Options
 *
 *  @remarks
 *  This option is compatible with `VueI18n` class constructor options (offered with Vue I18n v8.x)
 *
 *  @VueI18nLegacy
 */
export declare interface VueI18nOptions {
    /**
     * @remarks
     * The locale of localization.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../essentials/scope)
     *
     * @defaultValue `'en-US'`
     */
    locale?: Locale;
    /**
     * @remarks
     * The locale of fallback localization.
     *
     * For more complex fallback definitions see fallback.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackLocale?: FallbackLocale;
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../essentials/started)
     *
     * @defaultValue `{}`
     */
    messages?: LocaleMessages<VueMessageType>;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../essentials/datetime)
     *
     * @defaultValue `{}`
     */
    datetimeFormats?: DateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../essentials/number)
     *
     * @defaultValue `{}`
     */
    numberFormats?: NumberFormats;
    /**
     * @remarks
     * The list of available locales in messages in lexical order.
     *
     * @defaultValue `[]`
     */
    availableLocales?: Locale[];
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../essentials/syntax#custom-modifiers)
     */
    modifiers?: LinkedModifiers<VueMessageType>;
    /**
     * @remarks
     * The formatter that implemented with Formatter interface.
     *
     * @deprecated TODO
     */
    formatter?: Formatter;
    /**
     * @remarks
     * A handler for localization missing.
     *
     * The handler gets called with the localization target locale, localization path key, the Vue instance and values.
     *
     * If missing handler is assigned, and occurred localization missing, it's not warned.
     *
     * @defaultValue `null`
     */
    missing?: MissingHandler;
    /**
     * @remarks
     * In the component localization, whether to fall back to root level (global) localization when localization fails.
     *
     * If `false`, it's warned, and is returned the key.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackRoot?: boolean;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * If `true`, suppress localization fail warnings.
     *
     * If you use regular expression, you can suppress localization fail warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    silentTranslationWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key.
     *
     * If `true`, skip writing templates for your "base" language; the keys are your templates.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    silentFallbackWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../essentials/fallback)
     *
     * @defaultValue `false`
     */
    formatFallbackMessages?: boolean;
    /**
     * @remarks
     * Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.
     *
     * @VueI18nSee [Custom Directive](../advanced/directive)
     * @VueI18nSee [Remove `preserveDirectiveContent` option](../migration/breaking#remove-preservedirectivecontent-option)
     *
     * @defaultValue `false`
     *
     * @deprecated The `v-t` directive for Vue 3 now preserves the default content. Therefore, this option and its properties have been removed from the VueI18n instance.
     */
    preserveDirectiveContent?: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * See the warnHtmlInMessage property.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../migration/breaking#change-warnhtmlinmessage-option-default-value)
     *
     * @defaultValue `'off'`
     */
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    /**
     * @remarks
     * If `escapeParameterHtml` is configured as true then interpolation parameters are escaped before the message is translated.
     *
     * This is useful when translation output is used in `v-html` and the translation resource contains html markup (e.g. <b> around a user provided value).
     *
     * This usage pattern mostly occurs when passing precomputed text strings into UI compontents.
     *
     * The escape process involves replacing the following symbols with their respective HTML character entities: `<`, `>`, `"`, `'`.
     *
     * Setting `escapeParameterHtml` as true should not break existing functionality but provides a safeguard against a subtle type of XSS attack vectors.
     *
     * @VueI18nSee [HTML Message](../essentials/syntax#html-message)
     *
     * @defaultValue `false`
     */
    escapeParameterHtml?: boolean;
    /**
     * @remarks
     * The shared locale messages of localization for components. More detail see Component based localization.
     *
     * @VueI18nSee [Shared locale messages for components](../essentials/local#shared-locale-messages-for-components)
     *
     * @defaultValue `undefined`
     */
    sharedMessages?: LocaleMessages<VueMessageType>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../essentials/pluralization#custom-pluralization)
     *
     * @defaultValue `{}`
     */
    pluralizationRules?: PluralizationRules;
    /**
     * @remarks
     * A handler for post processing of translation. The handler gets after being called with the `$t`, `t`, `$tc`, and `tc`.
     *
     * This handler is useful if you want to filter on translated text such as space trimming.
     *
     * @defaultValue `null`
     */
    postTranslation?: PostTranslationHandler<VueMessageType>;
    /**
     * @remarks
     * Whether synchronize the root level locale to the component localization locale.
     *
     * If `false`, regardless of the root level locale, localize for each component locale.
     *
     * @VueI18nSee [Local Scope](../essentials/scope#local-scope-2)
     *
     * @defaultValue `true`
     */
    sync?: boolean;
    /**
     * @remarks
     * A handler for getting notified when component-local instance was created.
     *
     * The handler gets called with new and old (root) VueI18n instances.
     *
     * This handler is useful when extending the root VueI18n instance and wanting to also apply those extensions to component-local instance.
     *
     * @defaultValue `null`
     */
    componentInstanceCreatedListener?: ComponentInstanceCreatedListener;
}

/** @VueI18nComposition */
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
  /**
   * Component Custom Options for Vue I18n
   *
   * @VueI18nInjection
   */
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

  /**
   * Component Custom Propertieis for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomProperties {
    /**
     * Exported Global Composer instance, or global VueI18n instance.
     *
     * @remarks
     * You can get the {@link ExportedGlobalComposer | exported composer instance} which are exported from global {@link Composer | composer instance} created with {@link createI18n}, or global {@link VueI18n | VueI18n instance}.
     * You can get the exported composer instance in {@link I18nMode | Compostion API mode}, or the Vuei18n instance in {@link I18nMode | Legacy API mode}, which is the instance you can refer to with this property.
     * The locales, locale messages, and other resources managed by the instance referenced by this property are valid as global scope.
     * If the `i18n` component custom option is not specified, it's the same as the VueI18n instance that can be referenced by the i18n instance {@link I18n.global | global} property.
     */
    $i18n: VueI18n | ExportedGlobalComposer
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#t | `VueI18n#t`}.
     *
     * In {@link I18nMode | Compostion API mode}, the `$t` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#t | `Composer#t` }.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key -  A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, list: unknown[]): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, named: object): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[]): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - An options, see the {@link TranslateOptiions}
     *
     * @returns translation message
     */
    $t(key: Path, plural: number, options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A defautl message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A defautl message to return if no translation was found
     * @param options - An options, see the {@link TranslateOptiions}
     *
     * @returns translation message
     */
    $t(key: Path, defaultMsg: string, options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[]): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A defautl message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - An options, see the {@link TranslateOptiions}
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A defautl message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - An options, see the {@link TranslateOptiions}
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, options: TranslateOptions): string
    /**
     * Locale message pluralization
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tc | `VueI18n#tc` }.
     * The value of plural is handled with default `1`.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(
      key: Path,
      choice: number,
      named: Record<string, unknown>
    ): TranslateResult
    /**
     * Translation message exist
     *
     * @remarks
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#te | `VueI18n.#te` }.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns if found locale message, `true`, else `false`
     */
    $te(key: Path, locale?: Locale): boolean
    /**
     * Datetime formating
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#d | `VueI18n#d` }.
     *
     * In {@link I18nMode | Compostion API mode}, the `$d` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#d | `Composer#d` }.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): DateTimeFormatResult
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string): DateTimeFormatResult
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $d(
      value: number | Date,
      args: { [key: string]: string }
    ): DateTimeFormatResult
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): string
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string): string
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string, locale: Locale): string
    /**
     * Datetime formating
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param options - An options, see the {@link DateTimeOptions}
     *
     * @returns formatted value
     */
    $d(value: number | Date, options: DateTimeOptions): string
    /**
     * Number formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#n | `VueI18n.n` }.
     *
     * In {@link I18nMode | Compostion API mode}, the `$n` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance,  and it work on **global scope**. About that details, see {@link Composer#n | `Composer.n` }.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns formatted value
     */
    $n(value: number, key: string): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n(value: number, key: string, locale: Locale): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $n(value: number, args: { [key: string]: string }): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns formatted value
     */
    $n(value: number, key: string): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n(value: number, key: string, locale: Locale): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param options - An options, see the {@link NumberOptions}
     *
     * @returns formatted value
     */
    $n(value: number, options: NumberOptions): string
    /**
     * Locale messages getter
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tm | `VueI18n#tm` }.
     *
     * @remarks
     * In {@link I18nMode | Compostion API mode}, the `$tm` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#tm | `Composer.tm` }.
     *
     * @param key - A target locale message key
     *
     * @return locale messages
     */
    $tm(key: Path): LocaleMessageValue<VueMessageType> | {}
  }
}
