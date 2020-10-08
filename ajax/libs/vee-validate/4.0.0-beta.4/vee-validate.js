/**
  * vee-validate v4.0.0-beta.4
  * (c) 2020 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VeeValidate = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  function isCallable(fn) {
      return typeof fn === 'function';
  }
  const isObject = (obj) => obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj);

  const RULES = {};
  /**
   * Adds a custom validator to the list of validation rules.
   */
  function defineRule(id, validator) {
      // makes sure new rules are properly formatted.
      guardExtend(id, validator);
      RULES[id] = validator;
  }
  /**
   * Gets an already defined rule
   */
  function resolveRule(id) {
      return RULES[id];
  }
  /**
   * Guards from extension violations.
   */
  function guardExtend(id, validator) {
      if (isCallable(validator)) {
          return;
      }
      throw new Error(`Extension Error: The validator '${id}' must be a function.`);
  }

  function isLocator(value) {
      return isCallable(value) && !!value.__locatorRef;
  }
  /**
   * Checks if an tag name is a native HTML tag and not a Vue component
   */
  function isHTMLTag(tag) {
      return ['input', 'textarea', 'select'].includes(tag);
  }
  /**
   * Checks if an input is of type file
   */
  function isFileInput(tag, type) {
      return isHTMLTag(tag) && type === 'file';
  }
  function isYupValidator(value) {
      return value && isCallable(value.validate);
  }
  function hasCheckedAttr(type) {
      return type === 'checkbox' || type === 'radio';
  }
  function isIndex(value) {
      return Number(value) >= 0;
  }
  /**
   * True if the value is an empty object or array
   */
  function isEmptyContainer(value) {
      if (Array.isArray(value)) {
          return value.length === 0;
      }
      return isObject(value) && Object.keys(value).length === 0;
  }
  /**
   * Checks if the path opted out of nested fields using `[fieldName]` syntax
   */
  function isNotNestedPath(path) {
      return /^\[.+\]$/i.test(path);
  }

  function genFieldErrorId(fieldName) {
      return `v_${fieldName}_error`;
  }
  function cleanupNonNestedPath(path) {
      if (isNotNestedPath(path)) {
          return path.replace(/\[|\]/gi, '');
      }
      return path;
  }
  /**
   * Gets a nested property value from an object
   */
  function getFromPath(object, path) {
      if (isNotNestedPath(path)) {
          return object[cleanupNonNestedPath(path)];
      }
      return path
          .split(/\.|\[(\d+)\]/)
          .filter(Boolean)
          .reduce((acc, propKey) => {
          if (acc && propKey in acc) {
              return acc[propKey];
          }
          return undefined;
      }, object);
  }
  /**
   * Sets a nested property value in a path, creates the path properties if it doesn't exist
   */
  function setInPath(object, path, value) {
      if (isNotNestedPath(path)) {
          object[cleanupNonNestedPath(path)] = value;
          return;
      }
      const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
      let acc = object;
      for (let i = 0; i < keys.length; i++) {
          // Last key, set it
          if (i === keys.length - 1) {
              acc[keys[i]] = value;
              return;
          }
          // Key does not exist, create a container for it
          if (!(keys[i] in acc)) {
              // container can be either an object or an array depending on the next key if it exists
              acc[keys[i]] = isIndex(keys[i + 1]) ? [] : {};
          }
          acc = acc[keys[i]];
      }
  }
  function unset(object, key) {
      if (Array.isArray(object) && isIndex(key)) {
          object.splice(Number(key), 1);
          return;
      }
      delete object[key];
  }
  /**
   * Removes a nested property from object
   */
  function unsetPath(object, path) {
      if (isNotNestedPath(path)) {
          delete object[cleanupNonNestedPath(path)];
          return;
      }
      const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
      let acc = object;
      for (let i = 0; i < keys.length; i++) {
          // Last key, unset it
          if (i === keys.length - 1) {
              unset(acc, keys[i]);
              break;
          }
          // Key does not exist, exit
          if (!(keys[i] in acc)) {
              break;
          }
          acc = acc[keys[i]];
      }
      const pathValues = keys.map((_, idx) => {
          return getFromPath(object, keys.slice(0, idx).join('.'));
      });
      for (let i = pathValues.length - 1; i >= 0; i--) {
          if (!isEmptyContainer(pathValues[i])) {
              continue;
          }
          if (i === 0) {
              unset(object, keys[0]);
              continue;
          }
          unset(pathValues[i - 1], keys[i - 1]);
      }
  }

  const isEvent = (evt) => {
      if (!evt) {
          return false;
      }
      if (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) {
          return true;
      }
      // this is for IE
      /* istanbul ignore next */
      if (evt && evt.srcElement) {
          return true;
      }
      return false;
  };
  function normalizeEventValue(value) {
      if (!isEvent(value)) {
          return value;
      }
      const input = value.target;
      // Vue sets the current bound value on `_value` prop
      // for checkboxes it it should fetch the value binding type as is (boolean instead of string)
      if (input.type === 'checkbox' && '_value' in input) {
          return input._value;
      }
      if (input.type === 'file' && input.files) {
          return Array.from(input.files);
      }
      return input.value;
  }

  function unwrap(ref) {
      return vue.isRef(ref) ? ref.value : ref;
  }

  /**
   * Normalizes the given rules expression.
   */
  function normalizeRules(rules) {
      // if falsy value return an empty object.
      const acc = {};
      Object.defineProperty(acc, '_$$isNormalized', {
          value: true,
          writable: false,
          enumerable: false,
          configurable: false,
      });
      if (!rules) {
          return acc;
      }
      // If its a single validate function or a yup fn, leave as is.
      if (isCallable(rules) || isYupValidator(rules)) {
          return rules;
      }
      // Object is already normalized, skip.
      if (isObject(rules) && rules._$$isNormalized) {
          return rules;
      }
      if (isObject(rules)) {
          return Object.keys(rules).reduce((prev, curr) => {
              const params = normalizeParams(rules[curr]);
              if (rules[curr] !== false) {
                  prev[curr] = buildParams(params);
              }
              return prev;
          }, acc);
      }
      /* istanbul ignore if */
      if (typeof rules !== 'string') {
          return acc;
      }
      return rules.split('|').reduce((prev, rule) => {
          const parsedRule = parseRule(rule);
          if (!parsedRule.name) {
              return prev;
          }
          prev[parsedRule.name] = buildParams(parsedRule.params);
          return prev;
      }, acc);
  }
  /**
   * Normalizes a rule param.
   */
  function normalizeParams(params) {
      if (params === true) {
          return [];
      }
      if (Array.isArray(params)) {
          return params;
      }
      if (isObject(params)) {
          return params;
      }
      return [params];
  }
  function buildParams(provided) {
      const mapValueToLocator = (value) => {
          // A target param using interpolation
          if (typeof value === 'string' && value[0] === '@') {
              return createLocator(value.slice(1));
          }
          return value;
      };
      if (Array.isArray(provided)) {
          return provided.map(mapValueToLocator);
      }
      return Object.keys(provided).reduce((prev, key) => {
          prev[key] = mapValueToLocator(provided[key]);
          return prev;
      }, {});
  }
  /**
   * Parses a rule string expression.
   */
  const parseRule = (rule) => {
      let params = [];
      const name = rule.split(':')[0];
      if (rule.includes(':')) {
          params = rule.split(':').slice(1).join(':').split(',');
      }
      return { name, params };
  };
  function createLocator(value) {
      const locator = (crossTable) => {
          const val = crossTable[value];
          return val;
      };
      locator.__locatorRef = value;
      return locator;
  }
  function extractLocators(params) {
      if (Array.isArray(params)) {
          return params.filter(isLocator);
      }
      return Object.keys(params)
          .filter(key => isLocator(params[key]))
          .map(key => params[key]);
  }

  const normalizeChildren = (context, slotProps) => {
      if (!context.slots.default) {
          return [];
      }
      return context.slots.default(slotProps) || [];
  };

  const DEFAULT_CONFIG = {
      generateMessage: ({ field }) => `${field} is not valid.`,
      bails: true,
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
  };
  let currentConfig = Object.assign({}, DEFAULT_CONFIG);
  const getConfig = () => currentConfig;
  const setConfig = (newConf) => {
      currentConfig = Object.assign(Object.assign({}, currentConfig), newConf);
  };
  const configure = setConfig;

  /**
   * Validates a value against the rules.
   */
  async function validate(value, rules, options = {}) {
      const shouldBail = options === null || options === void 0 ? void 0 : options.bails;
      const field = {
          name: (options === null || options === void 0 ? void 0 : options.name) || '{field}',
          rules: normalizeRules(rules),
          bails: shouldBail !== null && shouldBail !== void 0 ? shouldBail : true,
          formData: (options === null || options === void 0 ? void 0 : options.values) || {},
      };
      const result = await _validate(field, value);
      const errors = result.errors;
      return {
          errors,
      };
  }
  /**
   * Starts the validation process.
   */
  async function _validate(field, value) {
      if (isYupValidator(field.rules)) {
          return validateFieldWithYup(field, value);
      }
      // if a generic function, use it as the pipeline.
      if (isCallable(field.rules)) {
          const result = await field.rules(value);
          const isValid = typeof result !== 'string' && result;
          const message = typeof result === 'string'
              ? result
              : _generateFieldError({
                  field: field.name,
                  value,
                  form: field.formData,
              });
          return {
              errors: !isValid ? [message] : [],
          };
      }
      const errors = [];
      const rules = Object.keys(field.rules);
      const length = rules.length;
      for (let i = 0; i < length; i++) {
          const rule = rules[i];
          const result = await _test(field, value, {
              name: rule,
              params: field.rules[rule],
          });
          if (result.error) {
              errors.push(result.error);
              if (field.bails) {
                  return {
                      errors,
                  };
              }
          }
      }
      return {
          errors,
      };
  }
  /**
   * Handles yup validation
   */
  async function validateFieldWithYup(field, value) {
      const errors = await field.rules
          .validate(value, {
          abortEarly: field.bails,
      })
          .then(() => [])
          .catch((err) => {
          // Yup errors have a name prop one them.
          // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
          if (err.name === 'ValidationError') {
              return err.errors;
          }
          // re-throw the error so we don't hide it
          throw err;
      });
      return {
          errors,
      };
  }
  /**
   * Tests a single input value against a rule.
   */
  async function _test(field, value, rule) {
      const validator = resolveRule(rule.name);
      if (!validator) {
          throw new Error(`No such validator '${rule.name}' exists.`);
      }
      const params = fillTargetValues(rule.params, field.formData);
      const ctx = {
          field: field.name,
          value,
          form: field.formData,
          rule,
      };
      const result = await validator(value, params, ctx);
      if (typeof result === 'string') {
          return {
              error: result,
          };
      }
      return {
          error: result ? undefined : _generateFieldError(ctx),
      };
  }
  /**
   * Generates error messages.
   */
  function _generateFieldError(fieldCtx) {
      const message = getConfig().generateMessage;
      if (!message) {
          return 'Field is invalid';
      }
      return message(fieldCtx);
  }
  function fillTargetValues(params, crossTable) {
      const normalize = (value) => {
          if (isLocator(value)) {
              return value(crossTable);
          }
          return value;
      };
      if (Array.isArray(params)) {
          return params.map(normalize);
      }
      return Object.keys(params).reduce((acc, param) => {
          acc[param] = normalize(params[param]);
          return acc;
      }, {});
  }

  const FormSymbol = Symbol('vee-validate-form');
  const FormErrorsSymbol = Symbol('vee-validate-form-errors');
  const FormInitialValues = Symbol('vee-validate-form-initial-values');

  /**
   * Creates a field composite.
   */
  function useField(name, rules, opts) {
      const { initialValue, form, validateOnMount, bails, disabled, type, valueProp, label, validateOnValueUpdate, } = normalizeOptions(name, opts);
      const { meta, errors, handleBlur, handleInput, reset, patch, value, checked } = useValidationState({
          name,
          // make sure to unwrap initial value because of possible refs passed in
          initValue: unwrap(initialValue),
          form,
          type,
          valueProp,
      });
      const nonYupSchemaRules = extractRuleFromSchema(form === null || form === void 0 ? void 0 : form.schema, name);
      const normalizedRules = vue.computed(() => {
          return normalizeRules(nonYupSchemaRules || unwrap(rules));
      });
      const runValidation = async () => {
          var _a;
          meta.pending = true;
          if (!form || !form.validateSchema) {
              const result = await validate(value.value, normalizedRules.value, {
                  name: label,
                  values: (_a = form === null || form === void 0 ? void 0 : form.values) !== null && _a !== void 0 ? _a : {},
                  bails,
              });
              // Must be updated regardless if a mutation is needed or not
              // FIXME: is this needed?
              meta.valid = !result.errors.length;
              meta.invalid = !!result.errors.length;
              meta.pending = false;
              return result;
          }
          const results = await form.validateSchema();
          meta.pending = false;
          return results[name];
      };
      const runValidationWithMutation = () => runValidation().then(patch);
      // Common input/change event handler
      const handleChange = (e) => {
          var _a, _b;
          if (checked && checked.value === ((_b = (_a = e) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.checked)) {
              return;
          }
          value.value = normalizeEventValue(e);
          meta.dirty = true;
          meta.pristine = false;
          if (!validateOnValueUpdate) {
              return runValidationWithMutation();
          }
      };
      vue.onMounted(() => {
          runValidation().then(result => {
              if (validateOnMount) {
                  patch(result);
              }
          });
      });
      const errorMessage = vue.computed(() => {
          return errors.value[0];
      });
      const aria = useAriAttrs(name, meta);
      const field = {
          name,
          value: value,
          meta,
          errors,
          errorMessage,
          aria,
          reset,
          validate: runValidationWithMutation,
          handleChange,
          handleBlur,
          handleInput,
          disabled,
          setValidationState: patch,
          type,
          valueProp,
          checked,
          idx: -1,
      };
      if (validateOnValueUpdate) {
          vue.watch(value, runValidationWithMutation, {
              deep: true,
          });
      }
      if (vue.isRef(rules)) {
          vue.watch(rules, runValidationWithMutation, {
              deep: true,
          });
      }
      // if no associated form return the field API immediately
      if (!form) {
          return field;
      }
      // associate the field with the given form
      form.register(field);
      vue.onBeforeUnmount(() => {
          form.unregister(field);
      });
      // extract cross-field dependencies in a computed prop
      const dependencies = vue.computed(() => {
          const rulesVal = normalizedRules.value;
          // is falsy, a function schema or a yup schema
          if (!rulesVal || isCallable(rulesVal) || isCallable(rulesVal.validate)) {
              return [];
          }
          return Object.keys(rulesVal).reduce((acc, rule) => {
              const deps = extractLocators(normalizedRules.value[rule]).map((dep) => dep.__locatorRef);
              acc.push(...deps);
              return acc;
          }, []);
      });
      // Adds a watcher that runs the validation whenever field dependencies change
      vue.watchEffect(() => {
          // Skip if no dependencies
          if (!dependencies.value.length) {
              return;
          }
          // For each dependent field, validate it if it was validated before
          dependencies.value.forEach(dep => {
              if (dep in form.values && meta.validated) {
                  runValidationWithMutation();
              }
          });
      });
      return field;
  }
  /**
   * Normalizes partial field options to include the full
   */
  function normalizeOptions(name, opts) {
      const form = vue.inject(FormSymbol, undefined);
      const defaults = () => ({
          initialValue: undefined,
          validateOnMount: false,
          bails: true,
          rules: '',
          disabled: false,
          form,
          label: name,
          validateOnValueUpdate: true,
      });
      if (!opts) {
          return defaults();
      }
      return Object.assign(Object.assign({}, defaults()), (opts || {}));
  }
  /**
   * Manages the validation state of a field.
   */
  function useValidationState({ name, initValue, form, type, valueProp, }) {
      var _a;
      const errors = vue.ref([]);
      const { reset: resetFlags, meta } = useMeta();
      const initialValue = (_a = getFromPath(vue.inject(FormInitialValues, {}), name)) !== null && _a !== void 0 ? _a : initValue;
      const value = useFieldValue(initialValue, name, form);
      if (hasCheckedAttr(type) && initialValue) {
          value.value = initialValue;
      }
      const checked = hasCheckedAttr(type)
          ? vue.computed(() => {
              if (Array.isArray(value.value)) {
                  return value.value.includes(unwrap(valueProp));
              }
              return unwrap(valueProp) === value.value;
          })
          : undefined;
      if (checked === undefined || checked.value) {
          // Set the value without triggering the watcher
          value.value = initialValue;
      }
      /**
       * Handles common onBlur meta update
       */
      const handleBlur = () => {
          meta.touched = true;
          meta.untouched = false;
      };
      /**
       * Handles common on blur events
       */
      const handleInput = (e) => {
          // Checkboxes/Radio will emit a `change` event anyway, custom components will use `update:modelValue`
          // so this is redundant
          if (!hasCheckedAttr(type)) {
              value.value = normalizeEventValue(e);
          }
          meta.dirty = true;
          meta.pristine = false;
      };
      // Updates the validation state with the validation result
      function patch(result) {
          errors.value = result.errors;
          meta.changed = initialValue !== value.value;
          meta.valid = !result.errors.length;
          meta.invalid = !!result.errors.length;
          meta.validated = true;
          return result;
      }
      // Resets the validation state
      const reset = () => {
          errors.value = [];
          resetFlags();
      };
      return {
          meta,
          errors,
          patch,
          reset,
          handleBlur,
          handleInput,
          value,
          checked,
      };
  }
  /**
   * Exposes meta flags state and some associated actions with them.
   */
  function useMeta() {
      const initialMeta = () => ({
          untouched: true,
          touched: false,
          dirty: false,
          pristine: true,
          valid: false,
          invalid: false,
          validated: false,
          pending: false,
          changed: false,
          passed: false,
          failed: false,
      });
      const meta = vue.reactive(initialMeta());
      vue.watchEffect(() => {
          meta.passed = meta.valid && meta.validated;
          meta.failed = meta.invalid && meta.validated;
      });
      /**
       * Resets the flag state
       */
      function reset() {
          const defaults = initialMeta();
          Object.keys(meta).forEach((key) => {
              // Skip these, since they are computed anyways
              if (['passed', 'failed'].includes(key)) {
                  return;
              }
              meta[key] = defaults[key];
          });
      }
      return {
          meta,
          reset,
      };
  }
  function useAriAttrs(fieldName, meta) {
      return vue.computed(() => {
          return {
              'aria-invalid': meta.failed ? 'true' : 'false',
              'aria-describedBy': genFieldErrorId(fieldName),
          };
      });
  }
  /**
   * Extracts the validation rules from a schema
   */
  function extractRuleFromSchema(schema, fieldName) {
      // no schema at all
      if (!schema) {
          return undefined;
      }
      // there is a key on the schema object for this field
      return schema[fieldName];
  }
  /**
   * Manages the field value
   */
  function useFieldValue(initialValue, path, form) {
      // if no form is associated, use a regular ref.
      if (!form) {
          return vue.ref(initialValue);
      }
      // set initial value
      setInPath(form.values, path, initialValue);
      // otherwise use a computed setter that triggers the `setFieldValue`
      const value = vue.computed({
          get() {
              return getFromPath(form.values, path);
          },
          set(newVal) {
              form.setFieldValue(path, newVal);
          },
      });
      return value;
  }

  const Field = vue.defineComponent({
      name: 'Field',
      inheritAttrs: false,
      props: {
          as: {
              type: [String, Object],
              default: undefined,
          },
          name: {
              type: String,
              required: true,
          },
          rules: {
              type: [Object, String, Function],
              default: null,
          },
          validateOnMount: {
              type: Boolean,
              default: false,
          },
          bails: {
              type: Boolean,
              default: () => getConfig().bails,
          },
          disabled: {
              type: Boolean,
              default: false,
          },
          label: {
              type: String,
              default: undefined,
          },
      },
      setup(props, ctx) {
          const [disabled, rules] = [vue.toRef(props, 'disabled'), vue.toRef(props, 'rules')];
          const { errors, value, errorMessage, validate: validateField, handleChange, handleBlur, handleInput, reset, meta, aria, checked, } = useField(props.name, rules, {
              validateOnMount: props.validateOnMount,
              bails: props.bails,
              disabled,
              type: ctx.attrs.type,
              // Gets the initial value either from `value` prop/attr or `v-model` binding (modelValue)
              // For checkboxes and radio buttons it will always be the model value not the `value` attribute
              initialValue: hasCheckedAttr(ctx.attrs.type)
                  ? ctx.attrs.modelValue
                  : 'modelValue' in ctx.attrs
                      ? ctx.attrs.modelValue
                      : ctx.attrs.value,
              // Only for checkboxes and radio buttons
              valueProp: ctx.attrs.value,
              label: props.label || props.name,
              validateOnValueUpdate: false,
          });
          let isDuringValueTick = false;
          // Prevents re-render updates that rests value when using v-model (#2941)
          function valueTick() {
              isDuringValueTick = true;
              vue.nextTick(() => {
                  isDuringValueTick = false;
              });
          }
          // If there is a v-model applied on the component we need to emit the `update:modelValue` whenever the value binding changes
          const onChangeHandler = 'modelValue' in ctx.attrs
              ? function handleChangeWithModel(e) {
                  handleChange(e);
                  ctx.emit('update:modelValue', value.value);
              }
              : handleChange;
          const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = getConfig();
          const makeSlotProps = () => {
              const fieldProps = {
                  name: props.name,
                  disabled: props.disabled,
                  onBlur: [handleBlur],
                  onInput: [handleInput, valueTick],
                  onChange: [handleInput, valueTick],
              };
              if (validateOnInput) {
                  fieldProps.onInput.push(onChangeHandler);
              }
              if (validateOnChange) {
                  fieldProps.onChange.push(onChangeHandler);
              }
              if (validateOnBlur) {
                  fieldProps.onBlur.push(validateField);
              }
              if (validateOnModelUpdate) {
                  fieldProps['onUpdate:modelValue'] = [onChangeHandler, valueTick];
              }
              if (hasCheckedAttr(ctx.attrs.type) && checked) {
                  fieldProps.checked = checked.value;
              }
              else {
                  fieldProps.value = value.value;
              }
              if (isFileInput(resolveTag(props, ctx), ctx.attrs.type)) {
                  delete fieldProps.value;
              }
              return {
                  field: fieldProps,
                  aria: aria.value,
                  meta,
                  errors: errors.value,
                  errorMessage: errorMessage.value,
                  validate: validateField,
                  reset,
                  handleChange: onChangeHandler,
              };
          };
          return () => {
              const tag = resolveTag(props, ctx);
              const slotProps = makeSlotProps();
              // Sync the model value with the inner field value if they mismatch
              // a simple string comparison is used here
              // make sure to check if the re-render isn't caused by a value update tick
              if ('modelValue' in ctx.attrs && String(ctx.attrs.modelValue) !== String(value.value) && !isDuringValueTick) {
                  vue.nextTick(() => {
                      handleChange(ctx.attrs.modelValue);
                  });
              }
              const children = normalizeChildren(ctx, slotProps);
              if (tag) {
                  return vue.h(tag, Object.assign(Object.assign(Object.assign({}, ctx.attrs), slotProps.field), (isHTMLTag(tag) ? slotProps.aria : {})), children);
              }
              return children;
          };
      },
  });
  function resolveTag(props, ctx) {
      let tag = props.as || '';
      if (!props.as && !ctx.slots.default) {
          tag = 'input';
      }
      return tag;
  }

  function useForm(opts) {
      const fields = vue.ref([]);
      const isSubmitting = vue.ref(false);
      const fieldsById = vue.computed(() => {
          return fields.value.reduce((acc, field) => {
              // if the field was not added before
              if (!acc[field.name]) {
                  acc[field.name] = field;
                  field.idx = -1;
                  return acc;
              }
              // if the same name is detected
              if (!Array.isArray(acc[field.name])) {
                  const firstField = acc[field.name];
                  firstField.idx = 0;
                  acc[field.name] = [firstField];
              }
              field.idx = acc[field.name].length;
              acc[field.name].push(field);
              return acc;
          }, {});
      });
      const activeFields = vue.computed(() => {
          return fields.value.filter(field => !unwrap(field.disabled));
      });
      // a private ref for all form values
      const formValues = vue.reactive({});
      const controller = {
          register(field) {
              fields.value.push(field);
          },
          unregister(field) {
              var _a, _b;
              const idx = fields.value.indexOf(field);
              if (idx === -1) {
                  return;
              }
              fields.value.splice(idx, 1);
              const fieldName = field.name;
              // in this case, this is a single field not a group (checkbox or radio)
              // so remove the field value key immediately
              if (field.idx === -1) {
                  unsetPath(formValues, fieldName);
                  return;
              }
              // otherwise find the actual value in the current array of values and remove it
              const valueIdx = (_b = (_a = getFromPath(formValues, fieldName)) === null || _a === void 0 ? void 0 : _a.indexOf) === null || _b === void 0 ? void 0 : _b.call(_a, unwrap(field.valueProp));
              if (valueIdx === undefined) {
                  unsetPath(formValues, fieldName);
                  return;
              }
              if (valueIdx === -1) {
                  return;
              }
              if (Array.isArray(formValues[fieldName])) {
                  unsetPath(formValues, `${fieldName}.${valueIdx}`);
                  return;
              }
              unsetPath(formValues, fieldName);
          },
          fields: fieldsById,
          values: formValues,
          schema: opts === null || opts === void 0 ? void 0 : opts.validationSchema,
          validateSchema: isYupValidator(opts === null || opts === void 0 ? void 0 : opts.validationSchema)
              ? (shouldMutate = false) => {
                  return validateYupSchema(controller, shouldMutate);
              }
              : undefined,
          setFieldValue(path, value) {
              const field = fieldsById.value[path];
              // singular inputs fields
              if (!field || (!Array.isArray(field) && field.type !== 'checkbox')) {
                  setInPath(formValues, path, value);
                  return;
              }
              // Radio buttons and other unknown group type inputs
              if (Array.isArray(field) && field[0].type !== 'checkbox') {
                  setInPath(formValues, path, value);
                  return;
              }
              // Single Checkbox
              if (!Array.isArray(field) && field.type === 'checkbox') {
                  const newVal = getFromPath(formValues, path) === value ? undefined : value;
                  setInPath(formValues, path, newVal);
                  return;
              }
              // Multiple Checkboxes but their whole value was updated
              if (Array.isArray(value)) {
                  setInPath(formValues, path, value);
                  return;
              }
              // Multiple Checkboxes and a single item is updated
              const oldVal = getFromPath(formValues, path);
              const newVal = Array.isArray(oldVal) ? [...oldVal] : [];
              if (newVal.includes(value)) {
                  const idx = newVal.indexOf(value);
                  newVal.splice(idx, 1);
                  setInPath(formValues, path, newVal);
                  return;
              }
              newVal.push(value);
              setInPath(formValues, path, newVal);
          },
      };
      const validate = async () => {
          if (controller.validateSchema) {
              return controller.validateSchema(true).then(results => {
                  return Object.keys(results).every(r => !results[r].errors.length);
              });
          }
          const results = await Promise.all(activeFields.value.map((f) => {
              return f.validate();
          }));
          return results.every(r => !r.errors.length);
      };
      const errors = vue.computed(() => {
          return activeFields.value.reduce((acc, field) => {
              // Check if its a grouped field (checkbox/radio)
              if (Array.isArray(fieldsById.value[field.name])) {
                  const group = fieldsById.value[field.name];
                  acc[field.name] = unwrap((group.find((f) => unwrap(f.checked)) || field).errorMessage);
                  return acc;
              }
              acc[field.name] = unwrap(field.errorMessage);
              return acc;
          }, {});
      });
      const handleReset = () => {
          fields.value.forEach((f) => f.reset());
      };
      const activeFormValues = vue.computed(() => {
          return activeFields.value.reduce((formData, field) => {
              setInPath(formData, field.name, unwrap(field.value));
              return formData;
          }, {});
      });
      const handleSubmit = (fn) => {
          return function submissionHandler(e) {
              if (e instanceof Event) {
                  e.preventDefault();
                  e.stopPropagation();
              }
              isSubmitting.value = true;
              return validate()
                  .then(result => {
                  if (result && typeof fn === 'function') {
                      return fn(activeFormValues.value, e);
                  }
              })
                  .then(() => {
                  isSubmitting.value = false;
              }, err => {
                  isSubmitting.value = false;
                  // re-throw the err so it doesn't go silent
                  throw err;
              });
          };
      };
      const submitForm = handleSubmit((_, e) => {
          if (e) {
              e.target.submit();
          }
      });
      const meta = useFormMeta(fields);
      vue.provide(FormSymbol, controller);
      vue.provide(FormErrorsSymbol, errors);
      vue.provide(FormInitialValues, (opts === null || opts === void 0 ? void 0 : opts.initialValues) || {});
      vue.onMounted(() => {
          if (opts === null || opts === void 0 ? void 0 : opts.validateOnMount) {
              validate();
          }
      });
      return {
          errors,
          meta,
          form: controller,
          values: formValues,
          validate,
          isSubmitting,
          handleReset,
          handleSubmit,
          submitForm,
      };
  }
  const MERGE_STRATEGIES = {
      valid: 'every',
      invalid: 'some',
      dirty: 'some',
      pristine: 'every',
      touched: 'some',
      untouched: 'every',
      pending: 'some',
      validated: 'every',
      changed: 'some',
      passed: 'every',
      failed: 'some',
  };
  function useFormMeta(fields) {
      const flags = Object.keys(MERGE_STRATEGIES);
      return vue.computed(() => {
          return flags.reduce((acc, flag) => {
              const mergeMethod = MERGE_STRATEGIES[flag];
              acc[flag] = fields.value[mergeMethod](field => field.meta[flag]);
              return acc;
          }, {});
      });
  }
  async function validateYupSchema(form, shouldMutate = false) {
      const errors = await form.schema
          .validate(form.values, { abortEarly: false })
          .then(() => [])
          .catch((err) => {
          // Yup errors have a name prop one them.
          // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
          if (err.name !== 'ValidationError') {
              throw err;
          }
          // list of aggregated errors
          return err.inner || [];
      });
      const fields = form.fields.value;
      const errorsByPath = errors.reduce((acc, err) => {
          acc[err.path] = err;
          return acc;
      }, {});
      // Aggregates the validation result
      const aggregatedResult = Object.keys(fields).reduce((result, fieldId) => {
          const field = fields[fieldId];
          const messages = (errorsByPath[fieldId] || { errors: [] }).errors;
          const fieldResult = {
              errors: messages,
          };
          result[fieldId] = fieldResult;
          const isGroup = Array.isArray(field);
          const touched = isGroup ? field.some((f) => f.meta.validated) : field.meta.validated;
          if (!shouldMutate && !touched) {
              return result;
          }
          if (isGroup) {
              field.forEach((f) => f.setValidationState(fieldResult));
              return result;
          }
          field.setValidationState(fieldResult);
          return result;
      }, {});
      return aggregatedResult;
  }

  const Form = vue.defineComponent({
      name: 'Form',
      inheritAttrs: false,
      props: {
          as: {
              type: String,
              default: 'form',
          },
          validationSchema: {
              type: Object,
              default: undefined,
          },
          initialValues: {
              type: Object,
              default: undefined,
          },
          validateOnMount: {
              type: Boolean,
              default: false,
          },
      },
      setup(props, ctx) {
          const { errors, validate, handleSubmit, handleReset, values, meta, isSubmitting, submitForm } = useForm({
              validationSchema: props.validationSchema,
              initialValues: props.initialValues,
              validateOnMount: props.validateOnMount,
          });
          const onSubmit = ctx.attrs.onSubmit ? handleSubmit(ctx.attrs.onSubmit) : submitForm;
          function handleFormReset() {
              handleReset();
              if (typeof ctx.attrs.onReset === 'function') {
                  ctx.attrs.onReset();
              }
          }
          return () => {
              const children = normalizeChildren(ctx, {
                  meta: meta.value,
                  errors: errors.value,
                  values: values,
                  isSubmitting: isSubmitting.value,
                  validate,
                  handleSubmit,
                  handleReset,
                  submitForm,
              });
              if (!props.as) {
                  return children;
              }
              // Attributes to add on a native `form` tag
              const formAttrs = props.as === 'form'
                  ? {
                      // Disables native validation as vee-validate will handle it.
                      novalidate: true,
                  }
                  : {};
              return vue.h(props.as, Object.assign(Object.assign(Object.assign({}, formAttrs), ctx.attrs), { onSubmit, onReset: handleFormReset }), children);
          };
      },
  });

  const ErrorMessage = vue.defineComponent({
      props: {
          as: {
              type: String,
              default: undefined,
          },
          name: {
              type: String,
              required: true,
          },
      },
      setup(props, ctx) {
          const errors = vue.inject(FormErrorsSymbol, undefined);
          const message = vue.computed(() => {
              return errors.value[props.name];
          });
          return () => {
              const children = normalizeChildren(ctx, {
                  message: message.value,
              });
              const tag = props.as;
              const attrs = Object.assign({ id: genFieldErrorId(props.name), role: 'alert' }, ctx.attrs);
              // If no tag was specified and there are children
              // render the slot as is without wrapping it
              if (!tag && children.length) {
                  return children;
              }
              // If no children in slot
              // render whatever specified and fallback to a <span> with the message in it's contents
              if (!children.length) {
                  return vue.h(tag || 'span', attrs, message.value);
              }
              return vue.h(tag, attrs, children);
          };
      },
  });

  exports.ErrorMessage = ErrorMessage;
  exports.Field = Field;
  exports.Form = Form;
  exports.configure = configure;
  exports.defineRule = defineRule;
  exports.useField = useField;
  exports.useForm = useForm;
  exports.validate = validate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
