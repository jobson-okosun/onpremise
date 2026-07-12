/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Number = $util.global.Number, $isFinite = $util.global.isFinite, $Array = $util.global.Array, $parseInt = $util.global.parseInt, $BigInt = $util.global.BigInt, $Boolean = $util.global.Boolean;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const candidate_http = $root.candidate_http = (() => {

    /**
     * Namespace candidate_http.
     * @exports candidate_http
     * @namespace
     */
    const candidate_http = {};

    /**
     * AssessmentFont enum.
     * @name candidate_http.AssessmentFont
     * @enum {number}
     * @property {number} SMALL=0 SMALL value
     * @property {number} NORMAL=1 NORMAL value
     * @property {number} LARGE=2 LARGE value
     */
    candidate_http.AssessmentFont = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "SMALL"] = 0;
        values[valuesById[1] = "NORMAL"] = 1;
        values[valuesById[2] = "LARGE"] = 2;
        return values;
    })();

    /**
     * SectionType enum.
     * @name candidate_http.SectionType
     * @enum {number}
     * @property {number} OBJECTIVE=0 OBJECTIVE value
     * @property {number} THEORY=1 THEORY value
     */
    candidate_http.SectionType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "OBJECTIVE"] = 0;
        values[valuesById[1] = "THEORY"] = 1;
        return values;
    })();

    /**
     * BlockType enum.
     * @name candidate_http.BlockType
     * @enum {number}
     * @property {number} SINGLE_QUESTIONS=0 SINGLE_QUESTIONS value
     * @property {number} PASSAGES=1 PASSAGES value
     */
    candidate_http.BlockType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "SINGLE_QUESTIONS"] = 0;
        values[valuesById[1] = "PASSAGES"] = 1;
        return values;
    })();

    /**
     * AttemptRule enum.
     * @name candidate_http.AttemptRule
     * @enum {number}
     * @property {number} ATTEMPT_ALL=0 ATTEMPT_ALL value
     * @property {number} ATTEMPT_ANY=1 ATTEMPT_ANY value
     */
    candidate_http.AttemptRule = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ATTEMPT_ALL"] = 0;
        values[valuesById[1] = "ATTEMPT_ANY"] = 1;
        return values;
    })();

    /**
     * ItemType enum.
     * @name candidate_http.ItemType
     * @enum {number}
     * @property {number} MCQ=0 MCQ value
     * @property {number} MRQ=1 MRQ value
     * @property {number} ESSAY_PLAIN_TEXT=2 ESSAY_PLAIN_TEXT value
     * @property {number} ESSAY_RICH_TEXT=3 ESSAY_RICH_TEXT value
     * @property {number} CLOZE_TEXT=4 CLOZE_TEXT value
     * @property {number} CLOZE_DROPDOWN=5 CLOZE_DROPDOWN value
     * @property {number} SHORT_TEXT=6 SHORT_TEXT value
     * @property {number} TRUE_FALSE=7 TRUE_FALSE value
     * @property {number} YES_NO=8 YES_NO value
     * @property {number} ASSOCIATION=9 ASSOCIATION value
     * @property {number} CHOICE_MATRIX=10 CHOICE_MATRIX value
     * @property {number} ORDER_LIST=11 ORDER_LIST value
     * @property {number} CLOZE_TEXT_IMAGE=12 CLOZE_TEXT_IMAGE value
     * @property {number} CLOZE_DROPDOWN_IMAGE=13 CLOZE_DROPDOWN_IMAGE value
     * @property {number} IMAGE_DRAG_AND_DROP=14 IMAGE_DRAG_AND_DROP value
     * @property {number} DRAWING_AND_WRITING=15 DRAWING_AND_WRITING value
     * @property {number} CLOZERADIO=16 CLOZERADIO value
     */
    candidate_http.ItemType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "MCQ"] = 0;
        values[valuesById[1] = "MRQ"] = 1;
        values[valuesById[2] = "ESSAY_PLAIN_TEXT"] = 2;
        values[valuesById[3] = "ESSAY_RICH_TEXT"] = 3;
        values[valuesById[4] = "CLOZE_TEXT"] = 4;
        values[valuesById[5] = "CLOZE_DROPDOWN"] = 5;
        values[valuesById[6] = "SHORT_TEXT"] = 6;
        values[valuesById[7] = "TRUE_FALSE"] = 7;
        values[valuesById[8] = "YES_NO"] = 8;
        values[valuesById[9] = "ASSOCIATION"] = 9;
        values[valuesById[10] = "CHOICE_MATRIX"] = 10;
        values[valuesById[11] = "ORDER_LIST"] = 11;
        values[valuesById[12] = "CLOZE_TEXT_IMAGE"] = 12;
        values[valuesById[13] = "CLOZE_DROPDOWN_IMAGE"] = 13;
        values[valuesById[14] = "IMAGE_DRAG_AND_DROP"] = 14;
        values[valuesById[15] = "DRAWING_AND_WRITING"] = 15;
        values[valuesById[16] = "CLOZERADIO"] = 16;
        return values;
    })();

    /**
     * BackgroundType enum.
     * @name candidate_http.BackgroundType
     * @enum {number}
     * @property {number} BG_NONE=0 BG_NONE value
     * @property {number} BG_GRID=1 BG_GRID value
     * @property {number} BG_LINE=2 BG_LINE value
     * @property {number} BG_GRAPH=3 BG_GRAPH value
     */
    candidate_http.BackgroundType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "BG_NONE"] = 0;
        values[valuesById[1] = "BG_GRID"] = 1;
        values[valuesById[2] = "BG_LINE"] = 2;
        values[valuesById[3] = "BG_GRAPH"] = 3;
        return values;
    })();

    /**
     * DrawingWritingSplitType enum.
     * @name candidate_http.DrawingWritingSplitType
     * @enum {number}
     * @property {number} FULL=0 FULL value
     * @property {number} SPLIT=1 SPLIT value
     */
    candidate_http.DrawingWritingSplitType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "FULL"] = 0;
        values[valuesById[1] = "SPLIT"] = 1;
        return values;
    })();

    /**
     * ResponsePositionDirection enum.
     * @name candidate_http.ResponsePositionDirection
     * @enum {number}
     * @property {number} LEFT=0 LEFT value
     * @property {number} RIGHT=1 RIGHT value
     */
    candidate_http.ResponsePositionDirection = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "LEFT"] = 0;
        values[valuesById[1] = "RIGHT"] = 1;
        return values;
    })();

    candidate_http.OptionDto = (function() {

        /**
         * Properties of an OptionDto.
         * @typedef {Object} candidate_http.OptionDto.$Properties
         * @property {string|null} [label] OptionDto label
         * @property {string|null} [value] OptionDto value
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an OptionDto.
         * @memberof candidate_http
         * @interface IOptionDto
         * @augments candidate_http.OptionDto.$Properties
         * @deprecated Use candidate_http.OptionDto.$Properties instead.
         */

        /**
         * Shape of an OptionDto.
         * @typedef {candidate_http.OptionDto.$Properties} candidate_http.OptionDto.$Shape
         */

        /**
         * Constructs a new OptionDto.
         * @memberof candidate_http
         * @classdesc Represents an OptionDto.
         * @constructor
         * @param {candidate_http.OptionDto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const OptionDto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * OptionDto label.
         * @member {string} label
         * @memberof candidate_http.OptionDto
         * @instance
         */
        OptionDto.prototype.label = "";

        /**
         * OptionDto value.
         * @member {string} value
         * @memberof candidate_http.OptionDto
         * @instance
         */
        OptionDto.prototype.value = "";

        /**
         * Creates a new OptionDto instance using the specified properties.
         * @function create
         * @memberof candidate_http.OptionDto
         * @static
         * @param {candidate_http.OptionDto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.OptionDto} OptionDto instance
         * @type {{
         *   (properties: candidate_http.OptionDto.$Shape): candidate_http.OptionDto & candidate_http.OptionDto.$Shape;
         *   (properties?: candidate_http.OptionDto.$Properties): candidate_http.OptionDto;
         * }}
         */
        OptionDto.create = function(properties) {
            return new OptionDto(properties);
        };

        /**
         * Encodes the specified OptionDto message. Does not implicitly {@link candidate_http.OptionDto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.OptionDto
         * @static
         * @param {candidate_http.OptionDto.$Properties} message OptionDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OptionDto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.label != null && $Object.hasOwnProperty.call(message, "label") && message.label !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.label);
            if (message.value != null && $Object.hasOwnProperty.call(message, "value") && message.value !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified OptionDto message, length delimited. Does not implicitly {@link candidate_http.OptionDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.OptionDto
         * @static
         * @param {candidate_http.OptionDto.$Properties} message OptionDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OptionDto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an OptionDto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.OptionDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.OptionDto & candidate_http.OptionDto.$Shape} OptionDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OptionDto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.OptionDto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.label = value;
                        else
                            delete message.label;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.value = value;
                        else
                            delete message.value;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an OptionDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.OptionDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.OptionDto & candidate_http.OptionDto.$Shape} OptionDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OptionDto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OptionDto message.
         * @function verify
         * @memberof candidate_http.OptionDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OptionDto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                if (!$util.isString(message.label))
                    return "label: string expected";
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates an OptionDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.OptionDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.OptionDto} OptionDto
         */
        OptionDto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.OptionDto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.OptionDto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.OptionDto();
            if (object.label != null)
                if (typeof object.label !== "string" || object.label.length)
                    message.label = $String(object.label);
            if (object.value != null)
                if (typeof object.value !== "string" || object.value.length)
                    message.value = $String(object.value);
            return message;
        };

        /**
         * Creates a plain object from an OptionDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.OptionDto
         * @static
         * @param {candidate_http.OptionDto} message OptionDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OptionDto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.label = "";
                object.value = "";
            }
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this OptionDto to JSON.
         * @function toJSON
         * @memberof candidate_http.OptionDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OptionDto.prototype.toJSON = function() {
            return OptionDto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for OptionDto
         * @function getTypeUrl
         * @memberof candidate_http.OptionDto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        OptionDto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.OptionDto";
        };

        return OptionDto;
    })();

    candidate_http.ImageData = (function() {

        /**
         * Properties of an ImageData.
         * @typedef {Object} candidate_http.ImageData.$Properties
         * @property {string|null} [image] ImageData image
         * @property {string|null} [alt_text] ImageData alt_text
         * @property {number|null} [width] ImageData width
         * @property {number|null} [height] ImageData height
         * @property {string|null} [dimension] ImageData dimension
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an ImageData.
         * @memberof candidate_http
         * @interface IImageData
         * @augments candidate_http.ImageData.$Properties
         * @deprecated Use candidate_http.ImageData.$Properties instead.
         */

        /**
         * Shape of an ImageData.
         * @typedef {candidate_http.ImageData.$Properties} candidate_http.ImageData.$Shape
         */

        /**
         * Constructs a new ImageData.
         * @memberof candidate_http
         * @classdesc Represents an ImageData.
         * @constructor
         * @param {candidate_http.ImageData.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const ImageData = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * ImageData image.
         * @member {string} image
         * @memberof candidate_http.ImageData
         * @instance
         */
        ImageData.prototype.image = "";

        /**
         * ImageData alt_text.
         * @member {string} alt_text
         * @memberof candidate_http.ImageData
         * @instance
         */
        ImageData.prototype.alt_text = "";

        /**
         * ImageData width.
         * @member {number} width
         * @memberof candidate_http.ImageData
         * @instance
         */
        ImageData.prototype.width = 0;

        /**
         * ImageData height.
         * @member {number} height
         * @memberof candidate_http.ImageData
         * @instance
         */
        ImageData.prototype.height = 0;

        /**
         * ImageData dimension.
         * @member {string} dimension
         * @memberof candidate_http.ImageData
         * @instance
         */
        ImageData.prototype.dimension = "";

        /**
         * Creates a new ImageData instance using the specified properties.
         * @function create
         * @memberof candidate_http.ImageData
         * @static
         * @param {candidate_http.ImageData.$Properties=} [properties] Properties to set
         * @returns {candidate_http.ImageData} ImageData instance
         * @type {{
         *   (properties: candidate_http.ImageData.$Shape): candidate_http.ImageData & candidate_http.ImageData.$Shape;
         *   (properties?: candidate_http.ImageData.$Properties): candidate_http.ImageData;
         * }}
         */
        ImageData.create = function(properties) {
            return new ImageData(properties);
        };

        /**
         * Encodes the specified ImageData message. Does not implicitly {@link candidate_http.ImageData.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.ImageData
         * @static
         * @param {candidate_http.ImageData.$Properties} message ImageData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ImageData.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.image != null && $Object.hasOwnProperty.call(message, "image") && message.image !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.image);
            if (message.alt_text != null && $Object.hasOwnProperty.call(message, "alt_text") && message.alt_text !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.alt_text);
            if (message.width != null && $Object.hasOwnProperty.call(message, "width") && message.width !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.width);
            if (message.height != null && $Object.hasOwnProperty.call(message, "height") && message.height !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.height);
            if (message.dimension != null && $Object.hasOwnProperty.call(message, "dimension") && message.dimension !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.dimension);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ImageData message, length delimited. Does not implicitly {@link candidate_http.ImageData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.ImageData
         * @static
         * @param {candidate_http.ImageData.$Properties} message ImageData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ImageData.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an ImageData message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.ImageData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.ImageData & candidate_http.ImageData.$Shape} ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ImageData.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.ImageData(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.image = value;
                        else
                            delete message.image;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.alt_text = value;
                        else
                            delete message.alt_text;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.width = value;
                        else
                            delete message.width;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.height = value;
                        else
                            delete message.height;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.dimension = value;
                        else
                            delete message.dimension;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an ImageData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.ImageData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.ImageData & candidate_http.ImageData.$Shape} ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ImageData.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ImageData message.
         * @function verify
         * @memberof candidate_http.ImageData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ImageData.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.image != null && $Object.hasOwnProperty.call(message, "image"))
                if (!$util.isString(message.image))
                    return "image: string expected";
            if (message.alt_text != null && $Object.hasOwnProperty.call(message, "alt_text"))
                if (!$util.isString(message.alt_text))
                    return "alt_text: string expected";
            if (message.width != null && $Object.hasOwnProperty.call(message, "width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.height != null && $Object.hasOwnProperty.call(message, "height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            if (message.dimension != null && $Object.hasOwnProperty.call(message, "dimension"))
                if (!$util.isString(message.dimension))
                    return "dimension: string expected";
            return null;
        };

        /**
         * Creates an ImageData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.ImageData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.ImageData} ImageData
         */
        ImageData.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.ImageData)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.ImageData: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.ImageData();
            if (object.image != null)
                if (typeof object.image !== "string" || object.image.length)
                    message.image = $String(object.image);
            if (object.alt_text != null)
                if (typeof object.alt_text !== "string" || object.alt_text.length)
                    message.alt_text = $String(object.alt_text);
            if (object.width != null)
                if ($Number(object.width) !== 0)
                    message.width = object.width | 0;
            if (object.height != null)
                if ($Number(object.height) !== 0)
                    message.height = object.height | 0;
            if (object.dimension != null)
                if (typeof object.dimension !== "string" || object.dimension.length)
                    message.dimension = $String(object.dimension);
            return message;
        };

        /**
         * Creates a plain object from an ImageData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.ImageData
         * @static
         * @param {candidate_http.ImageData} message ImageData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ImageData.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.image = "";
                object.alt_text = "";
                object.width = 0;
                object.height = 0;
                object.dimension = "";
            }
            if (message.image != null && $Object.hasOwnProperty.call(message, "image"))
                object.image = message.image;
            if (message.alt_text != null && $Object.hasOwnProperty.call(message, "alt_text"))
                object.alt_text = message.alt_text;
            if (message.width != null && $Object.hasOwnProperty.call(message, "width"))
                object.width = message.width;
            if (message.height != null && $Object.hasOwnProperty.call(message, "height"))
                object.height = message.height;
            if (message.dimension != null && $Object.hasOwnProperty.call(message, "dimension"))
                object.dimension = message.dimension;
            return object;
        };

        /**
         * Converts this ImageData to JSON.
         * @function toJSON
         * @memberof candidate_http.ImageData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ImageData.prototype.toJSON = function() {
            return ImageData.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ImageData
         * @function getTypeUrl
         * @memberof candidate_http.ImageData
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ImageData.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.ImageData";
        };

        return ImageData;
    })();

    candidate_http.ResponsePosition = (function() {

        /**
         * Properties of a ResponsePosition.
         * @typedef {Object} candidate_http.ResponsePosition.$Properties
         * @property {number|null} [x] ResponsePosition x
         * @property {number|null} [y] ResponsePosition y
         * @property {candidate_http.ResponsePositionDirection|null} [direction] ResponsePosition direction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a ResponsePosition.
         * @memberof candidate_http
         * @interface IResponsePosition
         * @augments candidate_http.ResponsePosition.$Properties
         * @deprecated Use candidate_http.ResponsePosition.$Properties instead.
         */

        /**
         * Shape of a ResponsePosition.
         * @typedef {candidate_http.ResponsePosition.$Properties} candidate_http.ResponsePosition.$Shape
         */

        /**
         * Constructs a new ResponsePosition.
         * @memberof candidate_http
         * @classdesc Represents a ResponsePosition.
         * @constructor
         * @param {candidate_http.ResponsePosition.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const ResponsePosition = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * ResponsePosition x.
         * @member {number} x
         * @memberof candidate_http.ResponsePosition
         * @instance
         */
        ResponsePosition.prototype.x = 0;

        /**
         * ResponsePosition y.
         * @member {number} y
         * @memberof candidate_http.ResponsePosition
         * @instance
         */
        ResponsePosition.prototype.y = 0;

        /**
         * ResponsePosition direction.
         * @member {candidate_http.ResponsePositionDirection} direction
         * @memberof candidate_http.ResponsePosition
         * @instance
         */
        ResponsePosition.prototype.direction = 0;

        /**
         * Creates a new ResponsePosition instance using the specified properties.
         * @function create
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {candidate_http.ResponsePosition.$Properties=} [properties] Properties to set
         * @returns {candidate_http.ResponsePosition} ResponsePosition instance
         * @type {{
         *   (properties: candidate_http.ResponsePosition.$Shape): candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape;
         *   (properties?: candidate_http.ResponsePosition.$Properties): candidate_http.ResponsePosition;
         * }}
         */
        ResponsePosition.create = function(properties) {
            return new ResponsePosition(properties);
        };

        /**
         * Encodes the specified ResponsePosition message. Does not implicitly {@link candidate_http.ResponsePosition.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {candidate_http.ResponsePosition.$Properties} message ResponsePosition message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponsePosition.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.x != null && $Object.hasOwnProperty.call(message, "x") && !$Object.is(message.x, 0))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && $Object.hasOwnProperty.call(message, "y") && !$Object.is(message.y, 0))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction") && message.direction !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.direction);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ResponsePosition message, length delimited. Does not implicitly {@link candidate_http.ResponsePosition.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {candidate_http.ResponsePosition.$Properties} message ResponsePosition message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponsePosition.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a ResponsePosition message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape} ResponsePosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponsePosition.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.ResponsePosition(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        if (!$Object.is(value = reader.float(), 0))
                            message.x = value;
                        else
                            delete message.x;
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        if (!$Object.is(value = reader.float(), 0))
                            message.y = value;
                        else
                            delete message.y;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.direction = value;
                        else
                            delete message.direction;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a ResponsePosition message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape} ResponsePosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponsePosition.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResponsePosition message.
         * @function verify
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResponsePosition.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.x != null && $Object.hasOwnProperty.call(message, "x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && $Object.hasOwnProperty.call(message, "y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction"))
                if (typeof message.direction !== "number" || (message.direction | 0) !== message.direction)
                    return "direction: enum value expected";
            return null;
        };

        /**
         * Creates a ResponsePosition message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.ResponsePosition} ResponsePosition
         */
        ResponsePosition.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.ResponsePosition)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.ResponsePosition: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.ResponsePosition();
            if (object.x != null)
                if (!$Object.is($Number(object.x), 0))
                    message.x = $Number(object.x);
            if (object.y != null)
                if (!$Object.is($Number(object.y), 0))
                    message.y = $Number(object.y);
            if (object.direction !== 0 && (typeof object.direction !== "string" || $root.candidate_http.ResponsePositionDirection[object.direction] !== 0))
                switch (object.direction) {
                case "LEFT":
                case 0:
                    message.direction = 0;
                    break;
                case "RIGHT":
                case 1:
                    message.direction = 1;
                    break;
                default:
                    if (typeof object.direction === "number" && (object.direction | 0) === object.direction)
                        message.direction = object.direction;
                }
            return message;
        };

        /**
         * Creates a plain object from a ResponsePosition message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {candidate_http.ResponsePosition} message ResponsePosition
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResponsePosition.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.direction = options.enums === $String ? "LEFT" : 0;
            }
            if (message.x != null && $Object.hasOwnProperty.call(message, "x"))
                object.x = options.json && !$isFinite(message.x) ? $String(message.x) : message.x;
            if (message.y != null && $Object.hasOwnProperty.call(message, "y"))
                object.y = options.json && !$isFinite(message.y) ? $String(message.y) : message.y;
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction"))
                object.direction = options.enums === $String ? $root.candidate_http.ResponsePositionDirection[message.direction] === $undefined ? message.direction : $root.candidate_http.ResponsePositionDirection[message.direction] : message.direction;
            return object;
        };

        /**
         * Converts this ResponsePosition to JSON.
         * @function toJSON
         * @memberof candidate_http.ResponsePosition
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResponsePosition.prototype.toJSON = function() {
            return ResponsePosition.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ResponsePosition
         * @function getTypeUrl
         * @memberof candidate_http.ResponsePosition
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ResponsePosition.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.ResponsePosition";
        };

        return ResponsePosition;
    })();

    candidate_http.SubQuestion = (function() {

        /**
         * Properties of a SubQuestion.
         * @typedef {Object} candidate_http.SubQuestion.$Properties
         * @property {string|null} [id] SubQuestion id
         * @property {string|null} [stimulus] SubQuestion stimulus
         * @property {number|null} [score] SubQuestion score
         * @property {candidate_http.BackgroundType|null} [background_type] SubQuestion background_type
         * @property {Array.<candidate_http.SubQuestion.$Properties>|null} [children] SubQuestion children
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SubQuestion.
         * @memberof candidate_http
         * @interface ISubQuestion
         * @augments candidate_http.SubQuestion.$Properties
         * @deprecated Use candidate_http.SubQuestion.$Properties instead.
         */

        /**
         * Shape of a SubQuestion.
         * @typedef {candidate_http.SubQuestion.$Properties} candidate_http.SubQuestion.$Shape
         */

        /**
         * Constructs a new SubQuestion.
         * @memberof candidate_http
         * @classdesc Represents a SubQuestion.
         * @constructor
         * @param {candidate_http.SubQuestion.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SubQuestion = function (properties) {
            this.children = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * SubQuestion id.
         * @member {string} id
         * @memberof candidate_http.SubQuestion
         * @instance
         */
        SubQuestion.prototype.id = "";

        /**
         * SubQuestion stimulus.
         * @member {string} stimulus
         * @memberof candidate_http.SubQuestion
         * @instance
         */
        SubQuestion.prototype.stimulus = "";

        /**
         * SubQuestion score.
         * @member {number} score
         * @memberof candidate_http.SubQuestion
         * @instance
         */
        SubQuestion.prototype.score = 0;

        /**
         * SubQuestion background_type.
         * @member {candidate_http.BackgroundType|null|undefined} background_type
         * @memberof candidate_http.SubQuestion
         * @instance
         */
        SubQuestion.prototype.background_type = null;

        /**
         * SubQuestion children.
         * @member {Array.<candidate_http.SubQuestion.$Properties>} children
         * @memberof candidate_http.SubQuestion
         * @instance
         */
        SubQuestion.prototype.children = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SubQuestion.prototype, "_background_type", {
            get: $util.oneOfGetter($oneOfFields = ["background_type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SubQuestion instance using the specified properties.
         * @function create
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {candidate_http.SubQuestion.$Properties=} [properties] Properties to set
         * @returns {candidate_http.SubQuestion} SubQuestion instance
         * @type {{
         *   (properties: candidate_http.SubQuestion.$Shape): candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape;
         *   (properties?: candidate_http.SubQuestion.$Properties): candidate_http.SubQuestion;
         * }}
         */
        SubQuestion.create = function(properties) {
            return new SubQuestion(properties);
        };

        /**
         * Encodes the specified SubQuestion message. Does not implicitly {@link candidate_http.SubQuestion.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {candidate_http.SubQuestion.$Properties} message SubQuestion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubQuestion.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus") && message.stimulus !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.stimulus);
            if (message.score != null && $Object.hasOwnProperty.call(message, "score") && message.score !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.score);
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.background_type);
            if (message.children != null && message.children.length)
                for (let i = 0; i < message.children.length; ++i)
                    $root.candidate_http.SubQuestion.encode(message.children[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SubQuestion message, length delimited. Does not implicitly {@link candidate_http.SubQuestion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {candidate_http.SubQuestion.$Properties} message SubQuestion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubQuestion.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SubQuestion message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape} SubQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubQuestion.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.SubQuestion(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.stimulus = value;
                        else
                            delete message.stimulus;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.score = value;
                        else
                            delete message.score;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.background_type = reader.int32();
                        message._background_type = "background_type";
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.candidate_http.SubQuestion.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SubQuestion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape} SubQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubQuestion.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubQuestion message.
         * @function verify
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubQuestion.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                if (!$util.isString(message.stimulus))
                    return "stimulus: string expected";
            if (message.score != null && $Object.hasOwnProperty.call(message, "score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type")) {
                properties._background_type = 1;
                if (typeof message.background_type !== "number" || (message.background_type | 0) !== message.background_type)
                    return "background_type: enum value expected";
            }
            if (message.children != null && $Object.hasOwnProperty.call(message, "children")) {
                if (!$Array.isArray(message.children))
                    return "children: array expected";
                for (let i = 0; i < message.children.length; ++i) {
                    let error = $root.candidate_http.SubQuestion.verify(message.children[i], _depth + 1);
                    if (error)
                        return "children." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SubQuestion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.SubQuestion} SubQuestion
         */
        SubQuestion.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.SubQuestion)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.SubQuestion: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.SubQuestion();
            if (object.id != null)
                if (typeof object.id !== "string" || object.id.length)
                    message.id = $String(object.id);
            if (object.stimulus != null)
                if (typeof object.stimulus !== "string" || object.stimulus.length)
                    message.stimulus = $String(object.stimulus);
            if (object.score != null)
                if ($Number(object.score) !== 0)
                    message.score = object.score | 0;
            switch (object.background_type) {
            case "BG_NONE":
            case 0:
                message.background_type = 0;
                break;
            case "BG_GRID":
            case 1:
                message.background_type = 1;
                break;
            case "BG_LINE":
            case 2:
                message.background_type = 2;
                break;
            case "BG_GRAPH":
            case 3:
                message.background_type = 3;
                break;
            default:
                if (typeof object.background_type === "number" && (object.background_type | 0) === object.background_type)
                    message.background_type = object.background_type;
            }
            if (object.children) {
                if (!$Array.isArray(object.children))
                    throw $TypeError(".candidate_http.SubQuestion.children: array expected");
                message.children = $Array(object.children.length);
                for (let i = 0; i < object.children.length; ++i) {
                    if (!$util.isObject(object.children[i]))
                        throw $TypeError(".candidate_http.SubQuestion.children: object expected");
                    message.children[i] = $root.candidate_http.SubQuestion.fromObject(object.children[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubQuestion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {candidate_http.SubQuestion} message SubQuestion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubQuestion.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.children = [];
            if (options.defaults) {
                object.id = "";
                object.stimulus = "";
                object.score = 0;
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                object.stimulus = message.stimulus;
            if (message.score != null && $Object.hasOwnProperty.call(message, "score"))
                object.score = message.score;
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type"))
                object.background_type = options.enums === $String ? $root.candidate_http.BackgroundType[message.background_type] === $undefined ? message.background_type : $root.candidate_http.BackgroundType[message.background_type] : message.background_type;
            if (message.children && message.children.length) {
                object.children = $Array(message.children.length);
                for (let j = 0; j < message.children.length; ++j)
                    object.children[j] = $root.candidate_http.SubQuestion.toObject(message.children[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this SubQuestion to JSON.
         * @function toJSON
         * @memberof candidate_http.SubQuestion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubQuestion.prototype.toJSON = function() {
            return SubQuestion.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SubQuestion
         * @function getTypeUrl
         * @memberof candidate_http.SubQuestion
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SubQuestion.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.SubQuestion";
        };

        return SubQuestion;
    })();

    candidate_http.PossibleResponseCandidate = (function() {

        /**
         * Properties of a PossibleResponseCandidate.
         * @typedef {Object} candidate_http.PossibleResponseCandidate.$Properties
         * @property {Array.<candidate_http.OptionDto.$Properties>|null} [responses] PossibleResponseCandidate responses
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PossibleResponseCandidate.
         * @memberof candidate_http
         * @interface IPossibleResponseCandidate
         * @augments candidate_http.PossibleResponseCandidate.$Properties
         * @deprecated Use candidate_http.PossibleResponseCandidate.$Properties instead.
         */

        /**
         * Shape of a PossibleResponseCandidate.
         * @typedef {candidate_http.PossibleResponseCandidate.$Properties} candidate_http.PossibleResponseCandidate.$Shape
         */

        /**
         * Constructs a new PossibleResponseCandidate.
         * @memberof candidate_http
         * @classdesc Represents a PossibleResponseCandidate.
         * @constructor
         * @param {candidate_http.PossibleResponseCandidate.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const PossibleResponseCandidate = function (properties) {
            this.responses = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PossibleResponseCandidate responses.
         * @member {Array.<candidate_http.OptionDto.$Properties>} responses
         * @memberof candidate_http.PossibleResponseCandidate
         * @instance
         */
        PossibleResponseCandidate.prototype.responses = $util.emptyArray;

        /**
         * Creates a new PossibleResponseCandidate instance using the specified properties.
         * @function create
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {candidate_http.PossibleResponseCandidate.$Properties=} [properties] Properties to set
         * @returns {candidate_http.PossibleResponseCandidate} PossibleResponseCandidate instance
         * @type {{
         *   (properties: candidate_http.PossibleResponseCandidate.$Shape): candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape;
         *   (properties?: candidate_http.PossibleResponseCandidate.$Properties): candidate_http.PossibleResponseCandidate;
         * }}
         */
        PossibleResponseCandidate.create = function(properties) {
            return new PossibleResponseCandidate(properties);
        };

        /**
         * Encodes the specified PossibleResponseCandidate message. Does not implicitly {@link candidate_http.PossibleResponseCandidate.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {candidate_http.PossibleResponseCandidate.$Properties} message PossibleResponseCandidate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PossibleResponseCandidate.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    $root.candidate_http.OptionDto.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PossibleResponseCandidate message, length delimited. Does not implicitly {@link candidate_http.PossibleResponseCandidate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {candidate_http.PossibleResponseCandidate.$Properties} message PossibleResponseCandidate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PossibleResponseCandidate.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PossibleResponseCandidate message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape} PossibleResponseCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PossibleResponseCandidate.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.PossibleResponseCandidate();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push($root.candidate_http.OptionDto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PossibleResponseCandidate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape} PossibleResponseCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PossibleResponseCandidate.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PossibleResponseCandidate message.
         * @function verify
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PossibleResponseCandidate.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.responses != null && $Object.hasOwnProperty.call(message, "responses")) {
                if (!$Array.isArray(message.responses))
                    return "responses: array expected";
                for (let i = 0; i < message.responses.length; ++i) {
                    let error = $root.candidate_http.OptionDto.verify(message.responses[i], _depth + 1);
                    if (error)
                        return "responses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PossibleResponseCandidate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.PossibleResponseCandidate} PossibleResponseCandidate
         */
        PossibleResponseCandidate.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.PossibleResponseCandidate)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.PossibleResponseCandidate: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.PossibleResponseCandidate();
            if (object.responses) {
                if (!$Array.isArray(object.responses))
                    throw $TypeError(".candidate_http.PossibleResponseCandidate.responses: array expected");
                message.responses = $Array(object.responses.length);
                for (let i = 0; i < object.responses.length; ++i) {
                    if (!$util.isObject(object.responses[i]))
                        throw $TypeError(".candidate_http.PossibleResponseCandidate.responses: object expected");
                    message.responses[i] = $root.candidate_http.OptionDto.fromObject(object.responses[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PossibleResponseCandidate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {candidate_http.PossibleResponseCandidate} message PossibleResponseCandidate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PossibleResponseCandidate.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.responses = [];
            if (message.responses && message.responses.length) {
                object.responses = $Array(message.responses.length);
                for (let j = 0; j < message.responses.length; ++j)
                    object.responses[j] = $root.candidate_http.OptionDto.toObject(message.responses[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this PossibleResponseCandidate to JSON.
         * @function toJSON
         * @memberof candidate_http.PossibleResponseCandidate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PossibleResponseCandidate.prototype.toJSON = function() {
            return PossibleResponseCandidate.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PossibleResponseCandidate
         * @function getTypeUrl
         * @memberof candidate_http.PossibleResponseCandidate
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PossibleResponseCandidate.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.PossibleResponseCandidate";
        };

        return PossibleResponseCandidate;
    })();

    candidate_http.CandidateLoginResponseProto = (function() {

        /**
         * Properties of a CandidateLoginResponseProto.
         * @typedef {Object} candidate_http.CandidateLoginResponseProto.$Properties
         * @property {candidate_http.CandidateDataProto.$Properties|null} [candidate_data] CandidateLoginResponseProto candidate_data
         * @property {Array.<candidate_http.CandidateSectionsOverviewProto.$Properties>|null} [sections_overview] CandidateLoginResponseProto sections_overview
         * @property {candidate_http.CandidateAssessmentDataProto.$Properties|null} [assessment_data] CandidateLoginResponseProto assessment_data
         * @property {Array.<candidate_http.CandidateSectionQuestionsProto.$Properties>|null} [sections_questions] CandidateLoginResponseProto sections_questions
         * @property {Uint8Array|null} [events_session_id] CandidateLoginResponseProto events_session_id
         * @property {number|Long|null} [last_sequence] CandidateLoginResponseProto last_sequence
         * @property {number|Long|null} [resume_elapsed_ms] CandidateLoginResponseProto resume_elapsed_ms
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateLoginResponseProto.
         * @memberof candidate_http
         * @interface ICandidateLoginResponseProto
         * @augments candidate_http.CandidateLoginResponseProto.$Properties
         * @deprecated Use candidate_http.CandidateLoginResponseProto.$Properties instead.
         */

        /**
         * Shape of a CandidateLoginResponseProto.
         * @typedef {candidate_http.CandidateLoginResponseProto.$Properties} candidate_http.CandidateLoginResponseProto.$Shape
         */

        /**
         * Constructs a new CandidateLoginResponseProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateLoginResponseProto.
         * @constructor
         * @param {candidate_http.CandidateLoginResponseProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateLoginResponseProto = function (properties) {
            this.sections_overview = [];
            this.sections_questions = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateLoginResponseProto candidate_data.
         * @member {candidate_http.CandidateDataProto.$Properties|null|undefined} candidate_data
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.candidate_data = null;

        /**
         * CandidateLoginResponseProto sections_overview.
         * @member {Array.<candidate_http.CandidateSectionsOverviewProto.$Properties>} sections_overview
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.sections_overview = $util.emptyArray;

        /**
         * CandidateLoginResponseProto assessment_data.
         * @member {candidate_http.CandidateAssessmentDataProto.$Properties|null|undefined} assessment_data
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.assessment_data = null;

        /**
         * CandidateLoginResponseProto sections_questions.
         * @member {Array.<candidate_http.CandidateSectionQuestionsProto.$Properties>} sections_questions
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.sections_questions = $util.emptyArray;

        /**
         * CandidateLoginResponseProto events_session_id.
         * @member {Uint8Array} events_session_id
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.events_session_id = $util.newBuffer([]);

        /**
         * CandidateLoginResponseProto last_sequence.
         * @member {number|Long} last_sequence
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.last_sequence = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * CandidateLoginResponseProto resume_elapsed_ms.
         * @member {number|Long} resume_elapsed_ms
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         */
        CandidateLoginResponseProto.prototype.resume_elapsed_ms = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new CandidateLoginResponseProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {candidate_http.CandidateLoginResponseProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateLoginResponseProto} CandidateLoginResponseProto instance
         * @type {{
         *   (properties: candidate_http.CandidateLoginResponseProto.$Shape): candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape;
         *   (properties?: candidate_http.CandidateLoginResponseProto.$Properties): candidate_http.CandidateLoginResponseProto;
         * }}
         */
        CandidateLoginResponseProto.create = function(properties) {
            return new CandidateLoginResponseProto(properties);
        };

        /**
         * Encodes the specified CandidateLoginResponseProto message. Does not implicitly {@link candidate_http.CandidateLoginResponseProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {candidate_http.CandidateLoginResponseProto.$Properties} message CandidateLoginResponseProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateLoginResponseProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.candidate_data != null && $Object.hasOwnProperty.call(message, "candidate_data"))
                $root.candidate_http.CandidateDataProto.encode(message.candidate_data, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.sections_overview != null && message.sections_overview.length)
                for (let i = 0; i < message.sections_overview.length; ++i)
                    $root.candidate_http.CandidateSectionsOverviewProto.encode(message.sections_overview[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.assessment_data != null && $Object.hasOwnProperty.call(message, "assessment_data"))
                $root.candidate_http.CandidateAssessmentDataProto.encode(message.assessment_data, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.sections_questions != null && message.sections_questions.length)
                for (let i = 0; i < message.sections_questions.length; ++i)
                    $root.candidate_http.CandidateSectionQuestionsProto.encode(message.sections_questions[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id") && message.events_session_id.length)
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.events_session_id);
            if (message.last_sequence != null && $Object.hasOwnProperty.call(message, "last_sequence") && (typeof message.last_sequence === "object" ? message.last_sequence.low || message.last_sequence.high : message.last_sequence !== 0))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.last_sequence);
            if (message.resume_elapsed_ms != null && $Object.hasOwnProperty.call(message, "resume_elapsed_ms") && (typeof message.resume_elapsed_ms === "object" ? message.resume_elapsed_ms.low || message.resume_elapsed_ms.high : message.resume_elapsed_ms !== 0))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.resume_elapsed_ms);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateLoginResponseProto message, length delimited. Does not implicitly {@link candidate_http.CandidateLoginResponseProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {candidate_http.CandidateLoginResponseProto.$Properties} message CandidateLoginResponseProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateLoginResponseProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateLoginResponseProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape} CandidateLoginResponseProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateLoginResponseProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateLoginResponseProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.candidate_data = $root.candidate_http.CandidateDataProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.candidate_data);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.sections_overview && message.sections_overview.length))
                            message.sections_overview = [];
                        message.sections_overview.push($root.candidate_http.CandidateSectionsOverviewProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.assessment_data = $root.candidate_http.CandidateAssessmentDataProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.assessment_data);
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if (!(message.sections_questions && message.sections_questions.length))
                            message.sections_questions = [];
                        message.sections_questions.push($root.candidate_http.CandidateSectionQuestionsProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.events_session_id = value;
                        else
                            delete message.events_session_id;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.last_sequence = value;
                        else
                            delete message.last_sequence;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.resume_elapsed_ms = value;
                        else
                            delete message.resume_elapsed_ms;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateLoginResponseProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape} CandidateLoginResponseProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateLoginResponseProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateLoginResponseProto message.
         * @function verify
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateLoginResponseProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.candidate_data != null && $Object.hasOwnProperty.call(message, "candidate_data")) {
                let error = $root.candidate_http.CandidateDataProto.verify(message.candidate_data, _depth + 1);
                if (error)
                    return "candidate_data." + error;
            }
            if (message.sections_overview != null && $Object.hasOwnProperty.call(message, "sections_overview")) {
                if (!$Array.isArray(message.sections_overview))
                    return "sections_overview: array expected";
                for (let i = 0; i < message.sections_overview.length; ++i) {
                    let error = $root.candidate_http.CandidateSectionsOverviewProto.verify(message.sections_overview[i], _depth + 1);
                    if (error)
                        return "sections_overview." + error;
                }
            }
            if (message.assessment_data != null && $Object.hasOwnProperty.call(message, "assessment_data")) {
                let error = $root.candidate_http.CandidateAssessmentDataProto.verify(message.assessment_data, _depth + 1);
                if (error)
                    return "assessment_data." + error;
            }
            if (message.sections_questions != null && $Object.hasOwnProperty.call(message, "sections_questions")) {
                if (!$Array.isArray(message.sections_questions))
                    return "sections_questions: array expected";
                for (let i = 0; i < message.sections_questions.length; ++i) {
                    let error = $root.candidate_http.CandidateSectionQuestionsProto.verify(message.sections_questions[i], _depth + 1);
                    if (error)
                        return "sections_questions." + error;
                }
            }
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id"))
                if (!(message.events_session_id && typeof message.events_session_id.length === "number" || $util.isString(message.events_session_id)))
                    return "events_session_id: buffer expected";
            if (message.last_sequence != null && $Object.hasOwnProperty.call(message, "last_sequence"))
                if (!$util.isInteger(message.last_sequence) && !(message.last_sequence && $util.isInteger(message.last_sequence.low) && $util.isInteger(message.last_sequence.high)))
                    return "last_sequence: integer|Long expected";
            if (message.resume_elapsed_ms != null && $Object.hasOwnProperty.call(message, "resume_elapsed_ms"))
                if (!$util.isInteger(message.resume_elapsed_ms) && !(message.resume_elapsed_ms && $util.isInteger(message.resume_elapsed_ms.low) && $util.isInteger(message.resume_elapsed_ms.high)))
                    return "resume_elapsed_ms: integer|Long expected";
            return null;
        };

        /**
         * Creates a CandidateLoginResponseProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateLoginResponseProto} CandidateLoginResponseProto
         */
        CandidateLoginResponseProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateLoginResponseProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateLoginResponseProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateLoginResponseProto();
            if (object.candidate_data != null) {
                if (!$util.isObject(object.candidate_data))
                    throw $TypeError(".candidate_http.CandidateLoginResponseProto.candidate_data: object expected");
                message.candidate_data = $root.candidate_http.CandidateDataProto.fromObject(object.candidate_data, _depth + 1);
            }
            if (object.sections_overview) {
                if (!$Array.isArray(object.sections_overview))
                    throw $TypeError(".candidate_http.CandidateLoginResponseProto.sections_overview: array expected");
                message.sections_overview = $Array(object.sections_overview.length);
                for (let i = 0; i < object.sections_overview.length; ++i) {
                    if (!$util.isObject(object.sections_overview[i]))
                        throw $TypeError(".candidate_http.CandidateLoginResponseProto.sections_overview: object expected");
                    message.sections_overview[i] = $root.candidate_http.CandidateSectionsOverviewProto.fromObject(object.sections_overview[i], _depth + 1);
                }
            }
            if (object.assessment_data != null) {
                if (!$util.isObject(object.assessment_data))
                    throw $TypeError(".candidate_http.CandidateLoginResponseProto.assessment_data: object expected");
                message.assessment_data = $root.candidate_http.CandidateAssessmentDataProto.fromObject(object.assessment_data, _depth + 1);
            }
            if (object.sections_questions) {
                if (!$Array.isArray(object.sections_questions))
                    throw $TypeError(".candidate_http.CandidateLoginResponseProto.sections_questions: array expected");
                message.sections_questions = $Array(object.sections_questions.length);
                for (let i = 0; i < object.sections_questions.length; ++i) {
                    if (!$util.isObject(object.sections_questions[i]))
                        throw $TypeError(".candidate_http.CandidateLoginResponseProto.sections_questions: object expected");
                    message.sections_questions[i] = $root.candidate_http.CandidateSectionQuestionsProto.fromObject(object.sections_questions[i], _depth + 1);
                }
            }
            if (object.events_session_id != null)
                if (object.events_session_id.length)
                    if (typeof object.events_session_id === "string")
                        $util.base64.decode(object.events_session_id, message.events_session_id = $util.newBuffer($util.base64.length(object.events_session_id)), 0);
                    else if (object.events_session_id.length >= 0)
                        message.events_session_id = object.events_session_id;
            if (object.last_sequence != null)
                if (typeof object.last_sequence === "object" ? object.last_sequence.low || object.last_sequence.high : $Number(object.last_sequence) !== 0)
                    if ($util.Long)
                        message.last_sequence = $util.Long.fromValue(object.last_sequence, true);
                    else if (typeof object.last_sequence === "string")
                        message.last_sequence = $parseInt(object.last_sequence, 10);
                    else if (typeof object.last_sequence === "number")
                        message.last_sequence = object.last_sequence;
                    else if (typeof object.last_sequence === "object")
                        message.last_sequence = new $util.LongBits(object.last_sequence.low >>> 0, object.last_sequence.high >>> 0).toNumber(true);
            if (object.resume_elapsed_ms != null)
                if (typeof object.resume_elapsed_ms === "object" ? object.resume_elapsed_ms.low || object.resume_elapsed_ms.high : $Number(object.resume_elapsed_ms) !== 0)
                    if ($util.Long)
                        message.resume_elapsed_ms = $util.Long.fromValue(object.resume_elapsed_ms, true);
                    else if (typeof object.resume_elapsed_ms === "string")
                        message.resume_elapsed_ms = $parseInt(object.resume_elapsed_ms, 10);
                    else if (typeof object.resume_elapsed_ms === "number")
                        message.resume_elapsed_ms = object.resume_elapsed_ms;
                    else if (typeof object.resume_elapsed_ms === "object")
                        message.resume_elapsed_ms = new $util.LongBits(object.resume_elapsed_ms.low >>> 0, object.resume_elapsed_ms.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a CandidateLoginResponseProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {candidate_http.CandidateLoginResponseProto} message CandidateLoginResponseProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateLoginResponseProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.sections_overview = [];
                object.sections_questions = [];
            }
            if (options.defaults) {
                object.candidate_data = null;
                object.assessment_data = null;
                if (options.bytes === $String)
                    object.events_session_id = "";
                else {
                    object.events_session_id = [];
                    if (options.bytes !== $Array)
                        object.events_session_id = $util.newBuffer(object.events_session_id);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.last_sequence = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.last_sequence = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.resume_elapsed_ms = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.resume_elapsed_ms = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            }
            if (message.candidate_data != null && $Object.hasOwnProperty.call(message, "candidate_data"))
                object.candidate_data = $root.candidate_http.CandidateDataProto.toObject(message.candidate_data, options, _depth + 1);
            if (message.sections_overview && message.sections_overview.length) {
                object.sections_overview = $Array(message.sections_overview.length);
                for (let j = 0; j < message.sections_overview.length; ++j)
                    object.sections_overview[j] = $root.candidate_http.CandidateSectionsOverviewProto.toObject(message.sections_overview[j], options, _depth + 1);
            }
            if (message.assessment_data != null && $Object.hasOwnProperty.call(message, "assessment_data"))
                object.assessment_data = $root.candidate_http.CandidateAssessmentDataProto.toObject(message.assessment_data, options, _depth + 1);
            if (message.sections_questions && message.sections_questions.length) {
                object.sections_questions = $Array(message.sections_questions.length);
                for (let j = 0; j < message.sections_questions.length; ++j)
                    object.sections_questions[j] = $root.candidate_http.CandidateSectionQuestionsProto.toObject(message.sections_questions[j], options, _depth + 1);
            }
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id"))
                object.events_session_id = options.bytes === $String ? $util.base64.encode(message.events_session_id, 0, message.events_session_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.events_session_id) : message.events_session_id;
            if (message.last_sequence != null && $Object.hasOwnProperty.call(message, "last_sequence"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.last_sequence = typeof message.last_sequence === "number" ? $BigInt(message.last_sequence) : $util.Long.fromBits(message.last_sequence.low >>> 0, message.last_sequence.high >>> 0, true).toBigInt();
                else if (typeof message.last_sequence === "number")
                    object.last_sequence = options.longs === $String ? $String(message.last_sequence) : message.last_sequence;
                else
                    object.last_sequence = options.longs === $String ? $util.Long.prototype.toString.call(message.last_sequence) : options.longs === $Number ? new $util.LongBits(message.last_sequence.low >>> 0, message.last_sequence.high >>> 0).toNumber(true) : message.last_sequence;
            if (message.resume_elapsed_ms != null && $Object.hasOwnProperty.call(message, "resume_elapsed_ms"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.resume_elapsed_ms = typeof message.resume_elapsed_ms === "number" ? $BigInt(message.resume_elapsed_ms) : $util.Long.fromBits(message.resume_elapsed_ms.low >>> 0, message.resume_elapsed_ms.high >>> 0, true).toBigInt();
                else if (typeof message.resume_elapsed_ms === "number")
                    object.resume_elapsed_ms = options.longs === $String ? $String(message.resume_elapsed_ms) : message.resume_elapsed_ms;
                else
                    object.resume_elapsed_ms = options.longs === $String ? $util.Long.prototype.toString.call(message.resume_elapsed_ms) : options.longs === $Number ? new $util.LongBits(message.resume_elapsed_ms.low >>> 0, message.resume_elapsed_ms.high >>> 0).toNumber(true) : message.resume_elapsed_ms;
            return object;
        };

        /**
         * Converts this CandidateLoginResponseProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateLoginResponseProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateLoginResponseProto.prototype.toJSON = function() {
            return CandidateLoginResponseProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateLoginResponseProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateLoginResponseProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateLoginResponseProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateLoginResponseProto";
        };

        return CandidateLoginResponseProto;
    })();

    candidate_http.CandidateDataProto = (function() {

        /**
         * Properties of a CandidateDataProto.
         * @typedef {Object} candidate_http.CandidateDataProto.$Properties
         * @property {string|null} [name] CandidateDataProto name
         * @property {number|null} [id] CandidateDataProto id
         * @property {number|null} [minutes_left] CandidateDataProto minutes_left
         * @property {number|null} [seconds_left] CandidateDataProto seconds_left
         * @property {string|null} [login_field_value] CandidateDataProto login_field_value
         * @property {Array.<Uint8Array>|null} [section_ids] CandidateDataProto section_ids
         * @property {Array.<google.protobuf.Timestamp.$Properties>|null} [login_times] CandidateDataProto login_times
         * @property {Uint8Array|null} [participant_id] CandidateDataProto participant_id
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateDataProto.
         * @memberof candidate_http
         * @interface ICandidateDataProto
         * @augments candidate_http.CandidateDataProto.$Properties
         * @deprecated Use candidate_http.CandidateDataProto.$Properties instead.
         */

        /**
         * Shape of a CandidateDataProto.
         * @typedef {candidate_http.CandidateDataProto.$Properties} candidate_http.CandidateDataProto.$Shape
         */

        /**
         * Constructs a new CandidateDataProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateDataProto.
         * @constructor
         * @param {candidate_http.CandidateDataProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateDataProto = function (properties) {
            this.section_ids = [];
            this.login_times = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateDataProto name.
         * @member {string} name
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.name = "";

        /**
         * CandidateDataProto id.
         * @member {number} id
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.id = 0;

        /**
         * CandidateDataProto minutes_left.
         * @member {number} minutes_left
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.minutes_left = 0;

        /**
         * CandidateDataProto seconds_left.
         * @member {number} seconds_left
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.seconds_left = 0;

        /**
         * CandidateDataProto login_field_value.
         * @member {string} login_field_value
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.login_field_value = "";

        /**
         * CandidateDataProto section_ids.
         * @member {Array.<Uint8Array>} section_ids
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.section_ids = $util.emptyArray;

        /**
         * CandidateDataProto login_times.
         * @member {Array.<google.protobuf.Timestamp.$Properties>} login_times
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.login_times = $util.emptyArray;

        /**
         * CandidateDataProto participant_id.
         * @member {Uint8Array|null|undefined} participant_id
         * @memberof candidate_http.CandidateDataProto
         * @instance
         */
        CandidateDataProto.prototype.participant_id = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateDataProto.prototype, "_participant_id", {
            get: $util.oneOfGetter($oneOfFields = ["participant_id"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateDataProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {candidate_http.CandidateDataProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateDataProto} CandidateDataProto instance
         * @type {{
         *   (properties: candidate_http.CandidateDataProto.$Shape): candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape;
         *   (properties?: candidate_http.CandidateDataProto.$Properties): candidate_http.CandidateDataProto;
         * }}
         */
        CandidateDataProto.create = function(properties) {
            return new CandidateDataProto(properties);
        };

        /**
         * Encodes the specified CandidateDataProto message. Does not implicitly {@link candidate_http.CandidateDataProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {candidate_http.CandidateDataProto.$Properties} message CandidateDataProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateDataProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left") && message.minutes_left !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minutes_left);
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left") && message.seconds_left !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.seconds_left);
            if (message.login_field_value != null && $Object.hasOwnProperty.call(message, "login_field_value") && message.login_field_value !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.login_field_value);
            if (message.section_ids != null && message.section_ids.length)
                for (let i = 0; i < message.section_ids.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.section_ids[i]);
            if (message.login_times != null && message.login_times.length)
                for (let i = 0; i < message.login_times.length; ++i)
                    $root.google.protobuf.Timestamp.encode(message.login_times[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
            if (message.participant_id != null && $Object.hasOwnProperty.call(message, "participant_id"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.participant_id);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateDataProto message, length delimited. Does not implicitly {@link candidate_http.CandidateDataProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {candidate_http.CandidateDataProto.$Properties} message CandidateDataProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateDataProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateDataProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape} CandidateDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateDataProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateDataProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.minutes_left = value;
                        else
                            delete message.minutes_left;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.seconds_left = value;
                        else
                            delete message.seconds_left;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.login_field_value = value;
                        else
                            delete message.login_field_value;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if (!(message.section_ids && message.section_ids.length))
                            message.section_ids = [];
                        message.section_ids.push(reader.bytes());
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if (!(message.login_times && message.login_times.length))
                            message.login_times = [];
                        message.login_times.push($root.google.protobuf.Timestamp.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.participant_id = reader.bytes();
                        message._participant_id = "participant_id";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateDataProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape} CandidateDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateDataProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateDataProto message.
         * @function verify
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateDataProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left"))
                if (!$util.isInteger(message.minutes_left))
                    return "minutes_left: integer expected";
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left"))
                if (!$util.isInteger(message.seconds_left))
                    return "seconds_left: integer expected";
            if (message.login_field_value != null && $Object.hasOwnProperty.call(message, "login_field_value"))
                if (!$util.isString(message.login_field_value))
                    return "login_field_value: string expected";
            if (message.section_ids != null && $Object.hasOwnProperty.call(message, "section_ids")) {
                if (!$Array.isArray(message.section_ids))
                    return "section_ids: array expected";
                for (let i = 0; i < message.section_ids.length; ++i)
                    if (!(message.section_ids[i] && typeof message.section_ids[i].length === "number" || $util.isString(message.section_ids[i])))
                        return "section_ids: buffer[] expected";
            }
            if (message.login_times != null && $Object.hasOwnProperty.call(message, "login_times")) {
                if (!$Array.isArray(message.login_times))
                    return "login_times: array expected";
                for (let i = 0; i < message.login_times.length; ++i) {
                    let error = $root.google.protobuf.Timestamp.verify(message.login_times[i], _depth + 1);
                    if (error)
                        return "login_times." + error;
                }
            }
            if (message.participant_id != null && $Object.hasOwnProperty.call(message, "participant_id")) {
                properties._participant_id = 1;
                if (!(message.participant_id && typeof message.participant_id.length === "number" || $util.isString(message.participant_id)))
                    return "participant_id: buffer expected";
            }
            return null;
        };

        /**
         * Creates a CandidateDataProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateDataProto} CandidateDataProto
         */
        CandidateDataProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateDataProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateDataProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateDataProto();
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.id != null)
                if ($Number(object.id) !== 0)
                    message.id = object.id | 0;
            if (object.minutes_left != null)
                if ($Number(object.minutes_left) !== 0)
                    message.minutes_left = object.minutes_left | 0;
            if (object.seconds_left != null)
                if ($Number(object.seconds_left) !== 0)
                    message.seconds_left = object.seconds_left | 0;
            if (object.login_field_value != null)
                if (typeof object.login_field_value !== "string" || object.login_field_value.length)
                    message.login_field_value = $String(object.login_field_value);
            if (object.section_ids) {
                if (!$Array.isArray(object.section_ids))
                    throw $TypeError(".candidate_http.CandidateDataProto.section_ids: array expected");
                message.section_ids = $Array(object.section_ids.length);
                for (let i = 0; i < object.section_ids.length; ++i)
                    if (typeof object.section_ids[i] === "string")
                        $util.base64.decode(object.section_ids[i], message.section_ids[i] = $util.newBuffer($util.base64.length(object.section_ids[i])), 0);
                    else if (object.section_ids[i].length >= 0)
                        message.section_ids[i] = object.section_ids[i];
            }
            if (object.login_times) {
                if (!$Array.isArray(object.login_times))
                    throw $TypeError(".candidate_http.CandidateDataProto.login_times: array expected");
                message.login_times = $Array(object.login_times.length);
                for (let i = 0; i < object.login_times.length; ++i) {
                    if (!$util.isObject(object.login_times[i]))
                        throw $TypeError(".candidate_http.CandidateDataProto.login_times: object expected");
                    message.login_times[i] = $root.google.protobuf.Timestamp.fromObject(object.login_times[i], _depth + 1);
                }
            }
            if (object.participant_id != null)
                if (typeof object.participant_id === "string")
                    $util.base64.decode(object.participant_id, message.participant_id = $util.newBuffer($util.base64.length(object.participant_id)), 0);
                else if (object.participant_id.length >= 0)
                    message.participant_id = object.participant_id;
            return message;
        };

        /**
         * Creates a plain object from a CandidateDataProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {candidate_http.CandidateDataProto} message CandidateDataProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateDataProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.section_ids = [];
                object.login_times = [];
            }
            if (options.defaults) {
                object.name = "";
                object.id = 0;
                object.minutes_left = 0;
                object.seconds_left = 0;
                object.login_field_value = "";
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left"))
                object.minutes_left = message.minutes_left;
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left"))
                object.seconds_left = message.seconds_left;
            if (message.login_field_value != null && $Object.hasOwnProperty.call(message, "login_field_value"))
                object.login_field_value = message.login_field_value;
            if (message.section_ids && message.section_ids.length) {
                object.section_ids = $Array(message.section_ids.length);
                for (let j = 0; j < message.section_ids.length; ++j)
                    object.section_ids[j] = options.bytes === $String ? $util.base64.encode(message.section_ids[j], 0, message.section_ids[j].length) : options.bytes === $Array ? $Array.prototype.slice.call(message.section_ids[j]) : message.section_ids[j];
            }
            if (message.login_times && message.login_times.length) {
                object.login_times = $Array(message.login_times.length);
                for (let j = 0; j < message.login_times.length; ++j)
                    object.login_times[j] = $root.google.protobuf.Timestamp.toObject(message.login_times[j], options, _depth + 1);
            }
            if (message.participant_id != null && $Object.hasOwnProperty.call(message, "participant_id"))
                object.participant_id = options.bytes === $String ? $util.base64.encode(message.participant_id, 0, message.participant_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.participant_id) : message.participant_id;
            return object;
        };

        /**
         * Converts this CandidateDataProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateDataProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateDataProto.prototype.toJSON = function() {
            return CandidateDataProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateDataProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateDataProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateDataProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateDataProto";
        };

        return CandidateDataProto;
    })();

    candidate_http.CandidateSectionsOverviewProto = (function() {

        /**
         * Properties of a CandidateSectionsOverviewProto.
         * @typedef {Object} candidate_http.CandidateSectionsOverviewProto.$Properties
         * @property {string|null} [name] CandidateSectionsOverviewProto name
         * @property {number|null} [total_questions] CandidateSectionsOverviewProto total_questions
         * @property {number|null} [duration] CandidateSectionsOverviewProto duration
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateSectionsOverviewProto.
         * @memberof candidate_http
         * @interface ICandidateSectionsOverviewProto
         * @augments candidate_http.CandidateSectionsOverviewProto.$Properties
         * @deprecated Use candidate_http.CandidateSectionsOverviewProto.$Properties instead.
         */

        /**
         * Shape of a CandidateSectionsOverviewProto.
         * @typedef {candidate_http.CandidateSectionsOverviewProto.$Properties} candidate_http.CandidateSectionsOverviewProto.$Shape
         */

        /**
         * Constructs a new CandidateSectionsOverviewProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateSectionsOverviewProto.
         * @constructor
         * @param {candidate_http.CandidateSectionsOverviewProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateSectionsOverviewProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateSectionsOverviewProto name.
         * @member {string} name
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @instance
         */
        CandidateSectionsOverviewProto.prototype.name = "";

        /**
         * CandidateSectionsOverviewProto total_questions.
         * @member {number} total_questions
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @instance
         */
        CandidateSectionsOverviewProto.prototype.total_questions = 0;

        /**
         * CandidateSectionsOverviewProto duration.
         * @member {number} duration
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @instance
         */
        CandidateSectionsOverviewProto.prototype.duration = 0;

        /**
         * Creates a new CandidateSectionsOverviewProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {candidate_http.CandidateSectionsOverviewProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateSectionsOverviewProto} CandidateSectionsOverviewProto instance
         * @type {{
         *   (properties: candidate_http.CandidateSectionsOverviewProto.$Shape): candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape;
         *   (properties?: candidate_http.CandidateSectionsOverviewProto.$Properties): candidate_http.CandidateSectionsOverviewProto;
         * }}
         */
        CandidateSectionsOverviewProto.create = function(properties) {
            return new CandidateSectionsOverviewProto(properties);
        };

        /**
         * Encodes the specified CandidateSectionsOverviewProto message. Does not implicitly {@link candidate_http.CandidateSectionsOverviewProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {candidate_http.CandidateSectionsOverviewProto.$Properties} message CandidateSectionsOverviewProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionsOverviewProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions") && message.total_questions !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.total_questions);
            if (message.duration != null && $Object.hasOwnProperty.call(message, "duration") && message.duration !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.duration);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateSectionsOverviewProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionsOverviewProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {candidate_http.CandidateSectionsOverviewProto.$Properties} message CandidateSectionsOverviewProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionsOverviewProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateSectionsOverviewProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape} CandidateSectionsOverviewProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionsOverviewProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateSectionsOverviewProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.total_questions = value;
                        else
                            delete message.total_questions;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.duration = value;
                        else
                            delete message.duration;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateSectionsOverviewProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape} CandidateSectionsOverviewProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionsOverviewProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateSectionsOverviewProto message.
         * @function verify
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateSectionsOverviewProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions"))
                if (!$util.isInteger(message.total_questions))
                    return "total_questions: integer expected";
            if (message.duration != null && $Object.hasOwnProperty.call(message, "duration"))
                if (!$util.isInteger(message.duration))
                    return "duration: integer expected";
            return null;
        };

        /**
         * Creates a CandidateSectionsOverviewProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateSectionsOverviewProto} CandidateSectionsOverviewProto
         */
        CandidateSectionsOverviewProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateSectionsOverviewProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateSectionsOverviewProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateSectionsOverviewProto();
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.total_questions != null)
                if ($Number(object.total_questions) !== 0)
                    message.total_questions = object.total_questions | 0;
            if (object.duration != null)
                if ($Number(object.duration) !== 0)
                    message.duration = object.duration | 0;
            return message;
        };

        /**
         * Creates a plain object from a CandidateSectionsOverviewProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {candidate_http.CandidateSectionsOverviewProto} message CandidateSectionsOverviewProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateSectionsOverviewProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.total_questions = 0;
                object.duration = 0;
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions"))
                object.total_questions = message.total_questions;
            if (message.duration != null && $Object.hasOwnProperty.call(message, "duration"))
                object.duration = message.duration;
            return object;
        };

        /**
         * Converts this CandidateSectionsOverviewProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateSectionsOverviewProto.prototype.toJSON = function() {
            return CandidateSectionsOverviewProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateSectionsOverviewProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateSectionsOverviewProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateSectionsOverviewProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateSectionsOverviewProto";
        };

        return CandidateSectionsOverviewProto;
    })();

    candidate_http.CandidateAssessmentDataProto = (function() {

        /**
         * Properties of a CandidateAssessmentDataProto.
         * @typedef {Object} candidate_http.CandidateAssessmentDataProto.$Properties
         * @property {string|null} [name] CandidateAssessmentDataProto name
         * @property {string|null} [start_exam_instruction] CandidateAssessmentDataProto start_exam_instruction
         * @property {string|null} [end_exam_instruction] CandidateAssessmentDataProto end_exam_instruction
         * @property {number|null} [duration_minutes] CandidateAssessmentDataProto duration_minutes
         * @property {boolean|null} [display_all_sections_at_once] CandidateAssessmentDataProto display_all_sections_at_once
         * @property {number|null} [instruction_read_time_sec] CandidateAssessmentDataProto instruction_read_time_sec
         * @property {number|null} [warn_end_of_reading_time_sec] CandidateAssessmentDataProto warn_end_of_reading_time_sec
         * @property {number|null} [auto_save_sec] CandidateAssessmentDataProto auto_save_sec
         * @property {number|null} [inactivity_warning_sec] CandidateAssessmentDataProto inactivity_warning_sec
         * @property {boolean|null} [warn_unattempted_questions] CandidateAssessmentDataProto warn_unattempted_questions
         * @property {boolean|null} [end_exam_confirmation] CandidateAssessmentDataProto end_exam_confirmation
         * @property {number|null} [allow_end_exam_after_x_questions] CandidateAssessmentDataProto allow_end_exam_after_x_questions
         * @property {boolean|null} [preserve_section_order] CandidateAssessmentDataProto preserve_section_order
         * @property {candidate_http.AssessmentFont|null} [font_size] CandidateAssessmentDataProto font_size
         * @property {number|null} [compensatory_time_value] CandidateAssessmentDataProto compensatory_time_value
         * @property {boolean|null} [allow_block_navigation] CandidateAssessmentDataProto allow_block_navigation
         * @property {boolean|null} [use_biometrics] CandidateAssessmentDataProto use_biometrics
         * @property {number|null} [candidate_grace_period_minutes] CandidateAssessmentDataProto candidate_grace_period_minutes
         * @property {google.protobuf.Timestamp.$Properties|null} [start_date] CandidateAssessmentDataProto start_date
         * @property {google.protobuf.Timestamp.$Properties|null} [exam_start_time] CandidateAssessmentDataProto exam_start_time
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateAssessmentDataProto.
         * @memberof candidate_http
         * @interface ICandidateAssessmentDataProto
         * @augments candidate_http.CandidateAssessmentDataProto.$Properties
         * @deprecated Use candidate_http.CandidateAssessmentDataProto.$Properties instead.
         */

        /**
         * Shape of a CandidateAssessmentDataProto.
         * @typedef {candidate_http.CandidateAssessmentDataProto.$Properties} candidate_http.CandidateAssessmentDataProto.$Shape
         */

        /**
         * Constructs a new CandidateAssessmentDataProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateAssessmentDataProto.
         * @constructor
         * @param {candidate_http.CandidateAssessmentDataProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateAssessmentDataProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateAssessmentDataProto name.
         * @member {string} name
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.name = "";

        /**
         * CandidateAssessmentDataProto start_exam_instruction.
         * @member {string|null|undefined} start_exam_instruction
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.start_exam_instruction = null;

        /**
         * CandidateAssessmentDataProto end_exam_instruction.
         * @member {string|null|undefined} end_exam_instruction
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.end_exam_instruction = null;

        /**
         * CandidateAssessmentDataProto duration_minutes.
         * @member {number} duration_minutes
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.duration_minutes = 0;

        /**
         * CandidateAssessmentDataProto display_all_sections_at_once.
         * @member {boolean} display_all_sections_at_once
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.display_all_sections_at_once = false;

        /**
         * CandidateAssessmentDataProto instruction_read_time_sec.
         * @member {number} instruction_read_time_sec
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.instruction_read_time_sec = 0;

        /**
         * CandidateAssessmentDataProto warn_end_of_reading_time_sec.
         * @member {number} warn_end_of_reading_time_sec
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.warn_end_of_reading_time_sec = 0;

        /**
         * CandidateAssessmentDataProto auto_save_sec.
         * @member {number} auto_save_sec
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.auto_save_sec = 0;

        /**
         * CandidateAssessmentDataProto inactivity_warning_sec.
         * @member {number} inactivity_warning_sec
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.inactivity_warning_sec = 0;

        /**
         * CandidateAssessmentDataProto warn_unattempted_questions.
         * @member {boolean} warn_unattempted_questions
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.warn_unattempted_questions = false;

        /**
         * CandidateAssessmentDataProto end_exam_confirmation.
         * @member {boolean} end_exam_confirmation
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.end_exam_confirmation = false;

        /**
         * CandidateAssessmentDataProto allow_end_exam_after_x_questions.
         * @member {number} allow_end_exam_after_x_questions
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.allow_end_exam_after_x_questions = 0;

        /**
         * CandidateAssessmentDataProto preserve_section_order.
         * @member {boolean} preserve_section_order
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.preserve_section_order = false;

        /**
         * CandidateAssessmentDataProto font_size.
         * @member {candidate_http.AssessmentFont} font_size
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.font_size = 0;

        /**
         * CandidateAssessmentDataProto compensatory_time_value.
         * @member {number} compensatory_time_value
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.compensatory_time_value = 0;

        /**
         * CandidateAssessmentDataProto allow_block_navigation.
         * @member {boolean} allow_block_navigation
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.allow_block_navigation = false;

        /**
         * CandidateAssessmentDataProto use_biometrics.
         * @member {boolean} use_biometrics
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.use_biometrics = false;

        /**
         * CandidateAssessmentDataProto candidate_grace_period_minutes.
         * @member {number} candidate_grace_period_minutes
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.candidate_grace_period_minutes = 0;

        /**
         * CandidateAssessmentDataProto start_date.
         * @member {google.protobuf.Timestamp.$Properties|null|undefined} start_date
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.start_date = null;

        /**
         * CandidateAssessmentDataProto exam_start_time.
         * @member {google.protobuf.Timestamp.$Properties|null|undefined} exam_start_time
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         */
        CandidateAssessmentDataProto.prototype.exam_start_time = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateAssessmentDataProto.prototype, "_start_exam_instruction", {
            get: $util.oneOfGetter($oneOfFields = ["start_exam_instruction"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateAssessmentDataProto.prototype, "_end_exam_instruction", {
            get: $util.oneOfGetter($oneOfFields = ["end_exam_instruction"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateAssessmentDataProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {candidate_http.CandidateAssessmentDataProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateAssessmentDataProto} CandidateAssessmentDataProto instance
         * @type {{
         *   (properties: candidate_http.CandidateAssessmentDataProto.$Shape): candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape;
         *   (properties?: candidate_http.CandidateAssessmentDataProto.$Properties): candidate_http.CandidateAssessmentDataProto;
         * }}
         */
        CandidateAssessmentDataProto.create = function(properties) {
            return new CandidateAssessmentDataProto(properties);
        };

        /**
         * Encodes the specified CandidateAssessmentDataProto message. Does not implicitly {@link candidate_http.CandidateAssessmentDataProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {candidate_http.CandidateAssessmentDataProto.$Properties} message CandidateAssessmentDataProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAssessmentDataProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.start_exam_instruction != null && $Object.hasOwnProperty.call(message, "start_exam_instruction"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.start_exam_instruction);
            if (message.end_exam_instruction != null && $Object.hasOwnProperty.call(message, "end_exam_instruction"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.end_exam_instruction);
            if (message.duration_minutes != null && $Object.hasOwnProperty.call(message, "duration_minutes") && message.duration_minutes !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.duration_minutes);
            if (message.display_all_sections_at_once != null && $Object.hasOwnProperty.call(message, "display_all_sections_at_once") && message.display_all_sections_at_once !== false)
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.display_all_sections_at_once);
            if (message.instruction_read_time_sec != null && $Object.hasOwnProperty.call(message, "instruction_read_time_sec") && message.instruction_read_time_sec !== 0)
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.instruction_read_time_sec);
            if (message.warn_end_of_reading_time_sec != null && $Object.hasOwnProperty.call(message, "warn_end_of_reading_time_sec") && message.warn_end_of_reading_time_sec !== 0)
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.warn_end_of_reading_time_sec);
            if (message.auto_save_sec != null && $Object.hasOwnProperty.call(message, "auto_save_sec") && message.auto_save_sec !== 0)
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.auto_save_sec);
            if (message.inactivity_warning_sec != null && $Object.hasOwnProperty.call(message, "inactivity_warning_sec") && message.inactivity_warning_sec !== 0)
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.inactivity_warning_sec);
            if (message.warn_unattempted_questions != null && $Object.hasOwnProperty.call(message, "warn_unattempted_questions") && message.warn_unattempted_questions !== false)
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.warn_unattempted_questions);
            if (message.end_exam_confirmation != null && $Object.hasOwnProperty.call(message, "end_exam_confirmation") && message.end_exam_confirmation !== false)
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.end_exam_confirmation);
            if (message.allow_end_exam_after_x_questions != null && $Object.hasOwnProperty.call(message, "allow_end_exam_after_x_questions") && message.allow_end_exam_after_x_questions !== 0)
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.allow_end_exam_after_x_questions);
            if (message.preserve_section_order != null && $Object.hasOwnProperty.call(message, "preserve_section_order") && message.preserve_section_order !== false)
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.preserve_section_order);
            if (message.font_size != null && $Object.hasOwnProperty.call(message, "font_size") && message.font_size !== 0)
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.font_size);
            if (message.compensatory_time_value != null && $Object.hasOwnProperty.call(message, "compensatory_time_value") && message.compensatory_time_value !== 0)
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.compensatory_time_value);
            if (message.allow_block_navigation != null && $Object.hasOwnProperty.call(message, "allow_block_navigation") && message.allow_block_navigation !== false)
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.allow_block_navigation);
            if (message.use_biometrics != null && $Object.hasOwnProperty.call(message, "use_biometrics") && message.use_biometrics !== false)
                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.use_biometrics);
            if (message.candidate_grace_period_minutes != null && $Object.hasOwnProperty.call(message, "candidate_grace_period_minutes") && message.candidate_grace_period_minutes !== 0)
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.candidate_grace_period_minutes);
            if (message.start_date != null && $Object.hasOwnProperty.call(message, "start_date"))
                $root.google.protobuf.Timestamp.encode(message.start_date, writer.uint32(/* id 19, wireType 2 =*/154).fork(), _depth + 1).ldelim();
            if (message.exam_start_time != null && $Object.hasOwnProperty.call(message, "exam_start_time"))
                $root.google.protobuf.Timestamp.encode(message.exam_start_time, writer.uint32(/* id 20, wireType 2 =*/162).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateAssessmentDataProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAssessmentDataProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {candidate_http.CandidateAssessmentDataProto.$Properties} message CandidateAssessmentDataProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAssessmentDataProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateAssessmentDataProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape} CandidateAssessmentDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAssessmentDataProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateAssessmentDataProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.start_exam_instruction = reader.stringVerify();
                        message._start_exam_instruction = "start_exam_instruction";
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.end_exam_instruction = reader.stringVerify();
                        message._end_exam_instruction = "end_exam_instruction";
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.duration_minutes = value;
                        else
                            delete message.duration_minutes;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.display_all_sections_at_once = value;
                        else
                            delete message.display_all_sections_at_once;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.instruction_read_time_sec = value;
                        else
                            delete message.instruction_read_time_sec;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.warn_end_of_reading_time_sec = value;
                        else
                            delete message.warn_end_of_reading_time_sec;
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.auto_save_sec = value;
                        else
                            delete message.auto_save_sec;
                        continue;
                    }
                case 9: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.inactivity_warning_sec = value;
                        else
                            delete message.inactivity_warning_sec;
                        continue;
                    }
                case 10: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.warn_unattempted_questions = value;
                        else
                            delete message.warn_unattempted_questions;
                        continue;
                    }
                case 11: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.end_exam_confirmation = value;
                        else
                            delete message.end_exam_confirmation;
                        continue;
                    }
                case 12: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.allow_end_exam_after_x_questions = value;
                        else
                            delete message.allow_end_exam_after_x_questions;
                        continue;
                    }
                case 13: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.preserve_section_order = value;
                        else
                            delete message.preserve_section_order;
                        continue;
                    }
                case 14: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.font_size = value;
                        else
                            delete message.font_size;
                        continue;
                    }
                case 15: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.compensatory_time_value = value;
                        else
                            delete message.compensatory_time_value;
                        continue;
                    }
                case 16: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_block_navigation = value;
                        else
                            delete message.allow_block_navigation;
                        continue;
                    }
                case 17: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.use_biometrics = value;
                        else
                            delete message.use_biometrics;
                        continue;
                    }
                case 18: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.candidate_grace_period_minutes = value;
                        else
                            delete message.candidate_grace_period_minutes;
                        continue;
                    }
                case 19: {
                        if (wireType !== 2)
                            break;
                        message.start_date = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), $undefined, _depth + 1, message.start_date);
                        continue;
                    }
                case 20: {
                        if (wireType !== 2)
                            break;
                        message.exam_start_time = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), $undefined, _depth + 1, message.exam_start_time);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateAssessmentDataProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape} CandidateAssessmentDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAssessmentDataProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateAssessmentDataProto message.
         * @function verify
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateAssessmentDataProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.start_exam_instruction != null && $Object.hasOwnProperty.call(message, "start_exam_instruction")) {
                properties._start_exam_instruction = 1;
                if (!$util.isString(message.start_exam_instruction))
                    return "start_exam_instruction: string expected";
            }
            if (message.end_exam_instruction != null && $Object.hasOwnProperty.call(message, "end_exam_instruction")) {
                properties._end_exam_instruction = 1;
                if (!$util.isString(message.end_exam_instruction))
                    return "end_exam_instruction: string expected";
            }
            if (message.duration_minutes != null && $Object.hasOwnProperty.call(message, "duration_minutes"))
                if (!$util.isInteger(message.duration_minutes))
                    return "duration_minutes: integer expected";
            if (message.display_all_sections_at_once != null && $Object.hasOwnProperty.call(message, "display_all_sections_at_once"))
                if (typeof message.display_all_sections_at_once !== "boolean")
                    return "display_all_sections_at_once: boolean expected";
            if (message.instruction_read_time_sec != null && $Object.hasOwnProperty.call(message, "instruction_read_time_sec"))
                if (!$util.isInteger(message.instruction_read_time_sec))
                    return "instruction_read_time_sec: integer expected";
            if (message.warn_end_of_reading_time_sec != null && $Object.hasOwnProperty.call(message, "warn_end_of_reading_time_sec"))
                if (!$util.isInteger(message.warn_end_of_reading_time_sec))
                    return "warn_end_of_reading_time_sec: integer expected";
            if (message.auto_save_sec != null && $Object.hasOwnProperty.call(message, "auto_save_sec"))
                if (!$util.isInteger(message.auto_save_sec))
                    return "auto_save_sec: integer expected";
            if (message.inactivity_warning_sec != null && $Object.hasOwnProperty.call(message, "inactivity_warning_sec"))
                if (!$util.isInteger(message.inactivity_warning_sec))
                    return "inactivity_warning_sec: integer expected";
            if (message.warn_unattempted_questions != null && $Object.hasOwnProperty.call(message, "warn_unattempted_questions"))
                if (typeof message.warn_unattempted_questions !== "boolean")
                    return "warn_unattempted_questions: boolean expected";
            if (message.end_exam_confirmation != null && $Object.hasOwnProperty.call(message, "end_exam_confirmation"))
                if (typeof message.end_exam_confirmation !== "boolean")
                    return "end_exam_confirmation: boolean expected";
            if (message.allow_end_exam_after_x_questions != null && $Object.hasOwnProperty.call(message, "allow_end_exam_after_x_questions"))
                if (!$util.isInteger(message.allow_end_exam_after_x_questions))
                    return "allow_end_exam_after_x_questions: integer expected";
            if (message.preserve_section_order != null && $Object.hasOwnProperty.call(message, "preserve_section_order"))
                if (typeof message.preserve_section_order !== "boolean")
                    return "preserve_section_order: boolean expected";
            if (message.font_size != null && $Object.hasOwnProperty.call(message, "font_size"))
                if (typeof message.font_size !== "number" || (message.font_size | 0) !== message.font_size)
                    return "font_size: enum value expected";
            if (message.compensatory_time_value != null && $Object.hasOwnProperty.call(message, "compensatory_time_value"))
                if (!$util.isInteger(message.compensatory_time_value))
                    return "compensatory_time_value: integer expected";
            if (message.allow_block_navigation != null && $Object.hasOwnProperty.call(message, "allow_block_navigation"))
                if (typeof message.allow_block_navigation !== "boolean")
                    return "allow_block_navigation: boolean expected";
            if (message.use_biometrics != null && $Object.hasOwnProperty.call(message, "use_biometrics"))
                if (typeof message.use_biometrics !== "boolean")
                    return "use_biometrics: boolean expected";
            if (message.candidate_grace_period_minutes != null && $Object.hasOwnProperty.call(message, "candidate_grace_period_minutes"))
                if (!$util.isInteger(message.candidate_grace_period_minutes))
                    return "candidate_grace_period_minutes: integer expected";
            if (message.start_date != null && $Object.hasOwnProperty.call(message, "start_date")) {
                let error = $root.google.protobuf.Timestamp.verify(message.start_date, _depth + 1);
                if (error)
                    return "start_date." + error;
            }
            if (message.exam_start_time != null && $Object.hasOwnProperty.call(message, "exam_start_time")) {
                let error = $root.google.protobuf.Timestamp.verify(message.exam_start_time, _depth + 1);
                if (error)
                    return "exam_start_time." + error;
            }
            return null;
        };

        /**
         * Creates a CandidateAssessmentDataProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateAssessmentDataProto} CandidateAssessmentDataProto
         */
        CandidateAssessmentDataProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateAssessmentDataProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateAssessmentDataProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateAssessmentDataProto();
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.start_exam_instruction != null)
                message.start_exam_instruction = $String(object.start_exam_instruction);
            if (object.end_exam_instruction != null)
                message.end_exam_instruction = $String(object.end_exam_instruction);
            if (object.duration_minutes != null)
                if ($Number(object.duration_minutes) !== 0)
                    message.duration_minutes = object.duration_minutes | 0;
            if (object.display_all_sections_at_once != null)
                if (object.display_all_sections_at_once)
                    message.display_all_sections_at_once = $Boolean(object.display_all_sections_at_once);
            if (object.instruction_read_time_sec != null)
                if ($Number(object.instruction_read_time_sec) !== 0)
                    message.instruction_read_time_sec = object.instruction_read_time_sec | 0;
            if (object.warn_end_of_reading_time_sec != null)
                if ($Number(object.warn_end_of_reading_time_sec) !== 0)
                    message.warn_end_of_reading_time_sec = object.warn_end_of_reading_time_sec | 0;
            if (object.auto_save_sec != null)
                if ($Number(object.auto_save_sec) !== 0)
                    message.auto_save_sec = object.auto_save_sec | 0;
            if (object.inactivity_warning_sec != null)
                if ($Number(object.inactivity_warning_sec) !== 0)
                    message.inactivity_warning_sec = object.inactivity_warning_sec | 0;
            if (object.warn_unattempted_questions != null)
                if (object.warn_unattempted_questions)
                    message.warn_unattempted_questions = $Boolean(object.warn_unattempted_questions);
            if (object.end_exam_confirmation != null)
                if (object.end_exam_confirmation)
                    message.end_exam_confirmation = $Boolean(object.end_exam_confirmation);
            if (object.allow_end_exam_after_x_questions != null)
                if ($Number(object.allow_end_exam_after_x_questions) !== 0)
                    message.allow_end_exam_after_x_questions = object.allow_end_exam_after_x_questions | 0;
            if (object.preserve_section_order != null)
                if (object.preserve_section_order)
                    message.preserve_section_order = $Boolean(object.preserve_section_order);
            if (object.font_size !== 0 && (typeof object.font_size !== "string" || $root.candidate_http.AssessmentFont[object.font_size] !== 0))
                switch (object.font_size) {
                case "SMALL":
                case 0:
                    message.font_size = 0;
                    break;
                case "NORMAL":
                case 1:
                    message.font_size = 1;
                    break;
                case "LARGE":
                case 2:
                    message.font_size = 2;
                    break;
                default:
                    if (typeof object.font_size === "number" && (object.font_size | 0) === object.font_size)
                        message.font_size = object.font_size;
                }
            if (object.compensatory_time_value != null)
                if ($Number(object.compensatory_time_value) !== 0)
                    message.compensatory_time_value = object.compensatory_time_value | 0;
            if (object.allow_block_navigation != null)
                if (object.allow_block_navigation)
                    message.allow_block_navigation = $Boolean(object.allow_block_navigation);
            if (object.use_biometrics != null)
                if (object.use_biometrics)
                    message.use_biometrics = $Boolean(object.use_biometrics);
            if (object.candidate_grace_period_minutes != null)
                if ($Number(object.candidate_grace_period_minutes) !== 0)
                    message.candidate_grace_period_minutes = object.candidate_grace_period_minutes | 0;
            if (object.start_date != null) {
                if (!$util.isObject(object.start_date))
                    throw $TypeError(".candidate_http.CandidateAssessmentDataProto.start_date: object expected");
                message.start_date = $root.google.protobuf.Timestamp.fromObject(object.start_date, _depth + 1);
            }
            if (object.exam_start_time != null) {
                if (!$util.isObject(object.exam_start_time))
                    throw $TypeError(".candidate_http.CandidateAssessmentDataProto.exam_start_time: object expected");
                message.exam_start_time = $root.google.protobuf.Timestamp.fromObject(object.exam_start_time, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a CandidateAssessmentDataProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {candidate_http.CandidateAssessmentDataProto} message CandidateAssessmentDataProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateAssessmentDataProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.duration_minutes = 0;
                object.display_all_sections_at_once = false;
                object.instruction_read_time_sec = 0;
                object.warn_end_of_reading_time_sec = 0;
                object.auto_save_sec = 0;
                object.inactivity_warning_sec = 0;
                object.warn_unattempted_questions = false;
                object.end_exam_confirmation = false;
                object.allow_end_exam_after_x_questions = 0;
                object.preserve_section_order = false;
                object.font_size = options.enums === $String ? "SMALL" : 0;
                object.compensatory_time_value = 0;
                object.allow_block_navigation = false;
                object.use_biometrics = false;
                object.candidate_grace_period_minutes = 0;
                object.start_date = null;
                object.exam_start_time = null;
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.start_exam_instruction != null && $Object.hasOwnProperty.call(message, "start_exam_instruction"))
                object.start_exam_instruction = message.start_exam_instruction;
            if (message.end_exam_instruction != null && $Object.hasOwnProperty.call(message, "end_exam_instruction"))
                object.end_exam_instruction = message.end_exam_instruction;
            if (message.duration_minutes != null && $Object.hasOwnProperty.call(message, "duration_minutes"))
                object.duration_minutes = message.duration_minutes;
            if (message.display_all_sections_at_once != null && $Object.hasOwnProperty.call(message, "display_all_sections_at_once"))
                object.display_all_sections_at_once = message.display_all_sections_at_once;
            if (message.instruction_read_time_sec != null && $Object.hasOwnProperty.call(message, "instruction_read_time_sec"))
                object.instruction_read_time_sec = message.instruction_read_time_sec;
            if (message.warn_end_of_reading_time_sec != null && $Object.hasOwnProperty.call(message, "warn_end_of_reading_time_sec"))
                object.warn_end_of_reading_time_sec = message.warn_end_of_reading_time_sec;
            if (message.auto_save_sec != null && $Object.hasOwnProperty.call(message, "auto_save_sec"))
                object.auto_save_sec = message.auto_save_sec;
            if (message.inactivity_warning_sec != null && $Object.hasOwnProperty.call(message, "inactivity_warning_sec"))
                object.inactivity_warning_sec = message.inactivity_warning_sec;
            if (message.warn_unattempted_questions != null && $Object.hasOwnProperty.call(message, "warn_unattempted_questions"))
                object.warn_unattempted_questions = message.warn_unattempted_questions;
            if (message.end_exam_confirmation != null && $Object.hasOwnProperty.call(message, "end_exam_confirmation"))
                object.end_exam_confirmation = message.end_exam_confirmation;
            if (message.allow_end_exam_after_x_questions != null && $Object.hasOwnProperty.call(message, "allow_end_exam_after_x_questions"))
                object.allow_end_exam_after_x_questions = message.allow_end_exam_after_x_questions;
            if (message.preserve_section_order != null && $Object.hasOwnProperty.call(message, "preserve_section_order"))
                object.preserve_section_order = message.preserve_section_order;
            if (message.font_size != null && $Object.hasOwnProperty.call(message, "font_size"))
                object.font_size = options.enums === $String ? $root.candidate_http.AssessmentFont[message.font_size] === $undefined ? message.font_size : $root.candidate_http.AssessmentFont[message.font_size] : message.font_size;
            if (message.compensatory_time_value != null && $Object.hasOwnProperty.call(message, "compensatory_time_value"))
                object.compensatory_time_value = message.compensatory_time_value;
            if (message.allow_block_navigation != null && $Object.hasOwnProperty.call(message, "allow_block_navigation"))
                object.allow_block_navigation = message.allow_block_navigation;
            if (message.use_biometrics != null && $Object.hasOwnProperty.call(message, "use_biometrics"))
                object.use_biometrics = message.use_biometrics;
            if (message.candidate_grace_period_minutes != null && $Object.hasOwnProperty.call(message, "candidate_grace_period_minutes"))
                object.candidate_grace_period_minutes = message.candidate_grace_period_minutes;
            if (message.start_date != null && $Object.hasOwnProperty.call(message, "start_date"))
                object.start_date = $root.google.protobuf.Timestamp.toObject(message.start_date, options, _depth + 1);
            if (message.exam_start_time != null && $Object.hasOwnProperty.call(message, "exam_start_time"))
                object.exam_start_time = $root.google.protobuf.Timestamp.toObject(message.exam_start_time, options, _depth + 1);
            return object;
        };

        /**
         * Converts this CandidateAssessmentDataProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateAssessmentDataProto.prototype.toJSON = function() {
            return CandidateAssessmentDataProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateAssessmentDataProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateAssessmentDataProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateAssessmentDataProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateAssessmentDataProto";
        };

        return CandidateAssessmentDataProto;
    })();

    candidate_http.CandidateSectionQuestionsProto = (function() {

        /**
         * Properties of a CandidateSectionQuestionsProto.
         * @typedef {Object} candidate_http.CandidateSectionQuestionsProto.$Properties
         * @property {string|null} [name] CandidateSectionQuestionsProto name
         * @property {Uint8Array|null} [id] CandidateSectionQuestionsProto id
         * @property {candidate_http.CandidateSectionSettingsProto.$Properties|null} [section_settings] CandidateSectionQuestionsProto section_settings
         * @property {Array.<candidate_http.CandidateSectionBlocksProto.$Properties>|null} [question_blocks] CandidateSectionQuestionsProto question_blocks
         * @property {candidate_http.SectionType|null} [section_type] CandidateSectionQuestionsProto section_type
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateSectionQuestionsProto.
         * @memberof candidate_http
         * @interface ICandidateSectionQuestionsProto
         * @augments candidate_http.CandidateSectionQuestionsProto.$Properties
         * @deprecated Use candidate_http.CandidateSectionQuestionsProto.$Properties instead.
         */

        /**
         * Shape of a CandidateSectionQuestionsProto.
         * @typedef {candidate_http.CandidateSectionQuestionsProto.$Properties} candidate_http.CandidateSectionQuestionsProto.$Shape
         */

        /**
         * Constructs a new CandidateSectionQuestionsProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateSectionQuestionsProto.
         * @constructor
         * @param {candidate_http.CandidateSectionQuestionsProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateSectionQuestionsProto = function (properties) {
            this.question_blocks = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateSectionQuestionsProto name.
         * @member {string} name
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         */
        CandidateSectionQuestionsProto.prototype.name = "";

        /**
         * CandidateSectionQuestionsProto id.
         * @member {Uint8Array} id
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         */
        CandidateSectionQuestionsProto.prototype.id = $util.newBuffer([]);

        /**
         * CandidateSectionQuestionsProto section_settings.
         * @member {candidate_http.CandidateSectionSettingsProto.$Properties|null|undefined} section_settings
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         */
        CandidateSectionQuestionsProto.prototype.section_settings = null;

        /**
         * CandidateSectionQuestionsProto question_blocks.
         * @member {Array.<candidate_http.CandidateSectionBlocksProto.$Properties>} question_blocks
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         */
        CandidateSectionQuestionsProto.prototype.question_blocks = $util.emptyArray;

        /**
         * CandidateSectionQuestionsProto section_type.
         * @member {candidate_http.SectionType} section_type
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         */
        CandidateSectionQuestionsProto.prototype.section_type = 0;

        /**
         * Creates a new CandidateSectionQuestionsProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {candidate_http.CandidateSectionQuestionsProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateSectionQuestionsProto} CandidateSectionQuestionsProto instance
         * @type {{
         *   (properties: candidate_http.CandidateSectionQuestionsProto.$Shape): candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape;
         *   (properties?: candidate_http.CandidateSectionQuestionsProto.$Properties): candidate_http.CandidateSectionQuestionsProto;
         * }}
         */
        CandidateSectionQuestionsProto.create = function(properties) {
            return new CandidateSectionQuestionsProto(properties);
        };

        /**
         * Encodes the specified CandidateSectionQuestionsProto message. Does not implicitly {@link candidate_http.CandidateSectionQuestionsProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {candidate_http.CandidateSectionQuestionsProto.$Properties} message CandidateSectionQuestionsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionQuestionsProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id.length)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.id);
            if (message.section_settings != null && $Object.hasOwnProperty.call(message, "section_settings"))
                $root.candidate_http.CandidateSectionSettingsProto.encode(message.section_settings, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.question_blocks != null && message.question_blocks.length)
                for (let i = 0; i < message.question_blocks.length; ++i)
                    $root.candidate_http.CandidateSectionBlocksProto.encode(message.question_blocks[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
            if (message.section_type != null && $Object.hasOwnProperty.call(message, "section_type") && message.section_type !== 0)
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.section_type);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateSectionQuestionsProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionQuestionsProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {candidate_http.CandidateSectionQuestionsProto.$Properties} message CandidateSectionQuestionsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionQuestionsProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateSectionQuestionsProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape} CandidateSectionQuestionsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionQuestionsProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateSectionQuestionsProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.section_settings = $root.candidate_http.CandidateSectionSettingsProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.section_settings);
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if (!(message.question_blocks && message.question_blocks.length))
                            message.question_blocks = [];
                        message.question_blocks.push($root.candidate_http.CandidateSectionBlocksProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.section_type = value;
                        else
                            delete message.section_type;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateSectionQuestionsProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape} CandidateSectionQuestionsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionQuestionsProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateSectionQuestionsProto message.
         * @function verify
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateSectionQuestionsProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                    return "id: buffer expected";
            if (message.section_settings != null && $Object.hasOwnProperty.call(message, "section_settings")) {
                let error = $root.candidate_http.CandidateSectionSettingsProto.verify(message.section_settings, _depth + 1);
                if (error)
                    return "section_settings." + error;
            }
            if (message.question_blocks != null && $Object.hasOwnProperty.call(message, "question_blocks")) {
                if (!$Array.isArray(message.question_blocks))
                    return "question_blocks: array expected";
                for (let i = 0; i < message.question_blocks.length; ++i) {
                    let error = $root.candidate_http.CandidateSectionBlocksProto.verify(message.question_blocks[i], _depth + 1);
                    if (error)
                        return "question_blocks." + error;
                }
            }
            if (message.section_type != null && $Object.hasOwnProperty.call(message, "section_type"))
                if (typeof message.section_type !== "number" || (message.section_type | 0) !== message.section_type)
                    return "section_type: enum value expected";
            return null;
        };

        /**
         * Creates a CandidateSectionQuestionsProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateSectionQuestionsProto} CandidateSectionQuestionsProto
         */
        CandidateSectionQuestionsProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateSectionQuestionsProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateSectionQuestionsProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateSectionQuestionsProto();
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.id != null)
                if (object.id.length)
                    if (typeof object.id === "string")
                        $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                    else if (object.id.length >= 0)
                        message.id = object.id;
            if (object.section_settings != null) {
                if (!$util.isObject(object.section_settings))
                    throw $TypeError(".candidate_http.CandidateSectionQuestionsProto.section_settings: object expected");
                message.section_settings = $root.candidate_http.CandidateSectionSettingsProto.fromObject(object.section_settings, _depth + 1);
            }
            if (object.question_blocks) {
                if (!$Array.isArray(object.question_blocks))
                    throw $TypeError(".candidate_http.CandidateSectionQuestionsProto.question_blocks: array expected");
                message.question_blocks = $Array(object.question_blocks.length);
                for (let i = 0; i < object.question_blocks.length; ++i) {
                    if (!$util.isObject(object.question_blocks[i]))
                        throw $TypeError(".candidate_http.CandidateSectionQuestionsProto.question_blocks: object expected");
                    message.question_blocks[i] = $root.candidate_http.CandidateSectionBlocksProto.fromObject(object.question_blocks[i], _depth + 1);
                }
            }
            if (object.section_type !== 0 && (typeof object.section_type !== "string" || $root.candidate_http.SectionType[object.section_type] !== 0))
                switch (object.section_type) {
                case "OBJECTIVE":
                case 0:
                    message.section_type = 0;
                    break;
                case "THEORY":
                case 1:
                    message.section_type = 1;
                    break;
                default:
                    if (typeof object.section_type === "number" && (object.section_type | 0) === object.section_type)
                        message.section_type = object.section_type;
                }
            return message;
        };

        /**
         * Creates a plain object from a CandidateSectionQuestionsProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {candidate_http.CandidateSectionQuestionsProto} message CandidateSectionQuestionsProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateSectionQuestionsProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.question_blocks = [];
            if (options.defaults) {
                object.name = "";
                if (options.bytes === $String)
                    object.id = "";
                else {
                    object.id = [];
                    if (options.bytes !== $Array)
                        object.id = $util.newBuffer(object.id);
                }
                object.section_settings = null;
                object.section_type = options.enums === $String ? "OBJECTIVE" : 0;
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = options.bytes === $String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.id) : message.id;
            if (message.section_settings != null && $Object.hasOwnProperty.call(message, "section_settings"))
                object.section_settings = $root.candidate_http.CandidateSectionSettingsProto.toObject(message.section_settings, options, _depth + 1);
            if (message.question_blocks && message.question_blocks.length) {
                object.question_blocks = $Array(message.question_blocks.length);
                for (let j = 0; j < message.question_blocks.length; ++j)
                    object.question_blocks[j] = $root.candidate_http.CandidateSectionBlocksProto.toObject(message.question_blocks[j], options, _depth + 1);
            }
            if (message.section_type != null && $Object.hasOwnProperty.call(message, "section_type"))
                object.section_type = options.enums === $String ? $root.candidate_http.SectionType[message.section_type] === $undefined ? message.section_type : $root.candidate_http.SectionType[message.section_type] : message.section_type;
            return object;
        };

        /**
         * Converts this CandidateSectionQuestionsProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateSectionQuestionsProto.prototype.toJSON = function() {
            return CandidateSectionQuestionsProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateSectionQuestionsProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateSectionQuestionsProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateSectionQuestionsProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateSectionQuestionsProto";
        };

        return CandidateSectionQuestionsProto;
    })();

    candidate_http.CandidateSectionSettingsProto = (function() {

        /**
         * Properties of a CandidateSectionSettingsProto.
         * @typedef {Object} candidate_http.CandidateSectionSettingsProto.$Properties
         * @property {number|null} [minutes_left] CandidateSectionSettingsProto minutes_left
         * @property {number|null} [seconds_left] CandidateSectionSettingsProto seconds_left
         * @property {number|null} [duration_in_minutes] CandidateSectionSettingsProto duration_in_minutes
         * @property {boolean|null} [shuffle_items] CandidateSectionSettingsProto shuffle_items
         * @property {boolean|null} [shuffle_options] CandidateSectionSettingsProto shuffle_options
         * @property {boolean|null} [allow_calculator] CandidateSectionSettingsProto allow_calculator
         * @property {boolean|null} [shuffle_blocks] CandidateSectionSettingsProto shuffle_blocks
         * @property {boolean|null} [prevent_navigation_to_attempted_items] CandidateSectionSettingsProto prevent_navigation_to_attempted_items
         * @property {string|null} [section_instruction] CandidateSectionSettingsProto section_instruction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateSectionSettingsProto.
         * @memberof candidate_http
         * @interface ICandidateSectionSettingsProto
         * @augments candidate_http.CandidateSectionSettingsProto.$Properties
         * @deprecated Use candidate_http.CandidateSectionSettingsProto.$Properties instead.
         */

        /**
         * Shape of a CandidateSectionSettingsProto.
         * @typedef {candidate_http.CandidateSectionSettingsProto.$Properties} candidate_http.CandidateSectionSettingsProto.$Shape
         */

        /**
         * Constructs a new CandidateSectionSettingsProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateSectionSettingsProto.
         * @constructor
         * @param {candidate_http.CandidateSectionSettingsProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateSectionSettingsProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateSectionSettingsProto minutes_left.
         * @member {number} minutes_left
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.minutes_left = 0;

        /**
         * CandidateSectionSettingsProto seconds_left.
         * @member {number} seconds_left
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.seconds_left = 0;

        /**
         * CandidateSectionSettingsProto duration_in_minutes.
         * @member {number} duration_in_minutes
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.duration_in_minutes = 0;

        /**
         * CandidateSectionSettingsProto shuffle_items.
         * @member {boolean} shuffle_items
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.shuffle_items = false;

        /**
         * CandidateSectionSettingsProto shuffle_options.
         * @member {boolean} shuffle_options
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.shuffle_options = false;

        /**
         * CandidateSectionSettingsProto allow_calculator.
         * @member {boolean} allow_calculator
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.allow_calculator = false;

        /**
         * CandidateSectionSettingsProto shuffle_blocks.
         * @member {boolean} shuffle_blocks
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.shuffle_blocks = false;

        /**
         * CandidateSectionSettingsProto prevent_navigation_to_attempted_items.
         * @member {boolean} prevent_navigation_to_attempted_items
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.prevent_navigation_to_attempted_items = false;

        /**
         * CandidateSectionSettingsProto section_instruction.
         * @member {string|null|undefined} section_instruction
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         */
        CandidateSectionSettingsProto.prototype.section_instruction = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateSectionSettingsProto.prototype, "_section_instruction", {
            get: $util.oneOfGetter($oneOfFields = ["section_instruction"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateSectionSettingsProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {candidate_http.CandidateSectionSettingsProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateSectionSettingsProto} CandidateSectionSettingsProto instance
         * @type {{
         *   (properties: candidate_http.CandidateSectionSettingsProto.$Shape): candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape;
         *   (properties?: candidate_http.CandidateSectionSettingsProto.$Properties): candidate_http.CandidateSectionSettingsProto;
         * }}
         */
        CandidateSectionSettingsProto.create = function(properties) {
            return new CandidateSectionSettingsProto(properties);
        };

        /**
         * Encodes the specified CandidateSectionSettingsProto message. Does not implicitly {@link candidate_http.CandidateSectionSettingsProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {candidate_http.CandidateSectionSettingsProto.$Properties} message CandidateSectionSettingsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionSettingsProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left") && message.minutes_left !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.minutes_left);
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left") && message.seconds_left !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seconds_left);
            if (message.duration_in_minutes != null && $Object.hasOwnProperty.call(message, "duration_in_minutes") && message.duration_in_minutes !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.duration_in_minutes);
            if (message.shuffle_items != null && $Object.hasOwnProperty.call(message, "shuffle_items") && message.shuffle_items !== false)
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.shuffle_items);
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options") && message.shuffle_options !== false)
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.shuffle_options);
            if (message.allow_calculator != null && $Object.hasOwnProperty.call(message, "allow_calculator") && message.allow_calculator !== false)
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.allow_calculator);
            if (message.shuffle_blocks != null && $Object.hasOwnProperty.call(message, "shuffle_blocks") && message.shuffle_blocks !== false)
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.shuffle_blocks);
            if (message.prevent_navigation_to_attempted_items != null && $Object.hasOwnProperty.call(message, "prevent_navigation_to_attempted_items") && message.prevent_navigation_to_attempted_items !== false)
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.prevent_navigation_to_attempted_items);
            if (message.section_instruction != null && $Object.hasOwnProperty.call(message, "section_instruction"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.section_instruction);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateSectionSettingsProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionSettingsProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {candidate_http.CandidateSectionSettingsProto.$Properties} message CandidateSectionSettingsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionSettingsProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateSectionSettingsProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape} CandidateSectionSettingsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionSettingsProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateSectionSettingsProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.minutes_left = value;
                        else
                            delete message.minutes_left;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.seconds_left = value;
                        else
                            delete message.seconds_left;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.duration_in_minutes = value;
                        else
                            delete message.duration_in_minutes;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.shuffle_items = value;
                        else
                            delete message.shuffle_items;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.shuffle_options = value;
                        else
                            delete message.shuffle_options;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_calculator = value;
                        else
                            delete message.allow_calculator;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.shuffle_blocks = value;
                        else
                            delete message.shuffle_blocks;
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.prevent_navigation_to_attempted_items = value;
                        else
                            delete message.prevent_navigation_to_attempted_items;
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.section_instruction = reader.stringVerify();
                        message._section_instruction = "section_instruction";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateSectionSettingsProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape} CandidateSectionSettingsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionSettingsProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateSectionSettingsProto message.
         * @function verify
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateSectionSettingsProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left"))
                if (!$util.isInteger(message.minutes_left))
                    return "minutes_left: integer expected";
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left"))
                if (!$util.isInteger(message.seconds_left))
                    return "seconds_left: integer expected";
            if (message.duration_in_minutes != null && $Object.hasOwnProperty.call(message, "duration_in_minutes"))
                if (!$util.isInteger(message.duration_in_minutes))
                    return "duration_in_minutes: integer expected";
            if (message.shuffle_items != null && $Object.hasOwnProperty.call(message, "shuffle_items"))
                if (typeof message.shuffle_items !== "boolean")
                    return "shuffle_items: boolean expected";
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options"))
                if (typeof message.shuffle_options !== "boolean")
                    return "shuffle_options: boolean expected";
            if (message.allow_calculator != null && $Object.hasOwnProperty.call(message, "allow_calculator"))
                if (typeof message.allow_calculator !== "boolean")
                    return "allow_calculator: boolean expected";
            if (message.shuffle_blocks != null && $Object.hasOwnProperty.call(message, "shuffle_blocks"))
                if (typeof message.shuffle_blocks !== "boolean")
                    return "shuffle_blocks: boolean expected";
            if (message.prevent_navigation_to_attempted_items != null && $Object.hasOwnProperty.call(message, "prevent_navigation_to_attempted_items"))
                if (typeof message.prevent_navigation_to_attempted_items !== "boolean")
                    return "prevent_navigation_to_attempted_items: boolean expected";
            if (message.section_instruction != null && $Object.hasOwnProperty.call(message, "section_instruction")) {
                properties._section_instruction = 1;
                if (!$util.isString(message.section_instruction))
                    return "section_instruction: string expected";
            }
            return null;
        };

        /**
         * Creates a CandidateSectionSettingsProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateSectionSettingsProto} CandidateSectionSettingsProto
         */
        CandidateSectionSettingsProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateSectionSettingsProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateSectionSettingsProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateSectionSettingsProto();
            if (object.minutes_left != null)
                if ($Number(object.minutes_left) !== 0)
                    message.minutes_left = object.minutes_left | 0;
            if (object.seconds_left != null)
                if ($Number(object.seconds_left) !== 0)
                    message.seconds_left = object.seconds_left | 0;
            if (object.duration_in_minutes != null)
                if ($Number(object.duration_in_minutes) !== 0)
                    message.duration_in_minutes = object.duration_in_minutes | 0;
            if (object.shuffle_items != null)
                if (object.shuffle_items)
                    message.shuffle_items = $Boolean(object.shuffle_items);
            if (object.shuffle_options != null)
                if (object.shuffle_options)
                    message.shuffle_options = $Boolean(object.shuffle_options);
            if (object.allow_calculator != null)
                if (object.allow_calculator)
                    message.allow_calculator = $Boolean(object.allow_calculator);
            if (object.shuffle_blocks != null)
                if (object.shuffle_blocks)
                    message.shuffle_blocks = $Boolean(object.shuffle_blocks);
            if (object.prevent_navigation_to_attempted_items != null)
                if (object.prevent_navigation_to_attempted_items)
                    message.prevent_navigation_to_attempted_items = $Boolean(object.prevent_navigation_to_attempted_items);
            if (object.section_instruction != null)
                message.section_instruction = $String(object.section_instruction);
            return message;
        };

        /**
         * Creates a plain object from a CandidateSectionSettingsProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {candidate_http.CandidateSectionSettingsProto} message CandidateSectionSettingsProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateSectionSettingsProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.minutes_left = 0;
                object.seconds_left = 0;
                object.duration_in_minutes = 0;
                object.shuffle_items = false;
                object.shuffle_options = false;
                object.allow_calculator = false;
                object.shuffle_blocks = false;
                object.prevent_navigation_to_attempted_items = false;
            }
            if (message.minutes_left != null && $Object.hasOwnProperty.call(message, "minutes_left"))
                object.minutes_left = message.minutes_left;
            if (message.seconds_left != null && $Object.hasOwnProperty.call(message, "seconds_left"))
                object.seconds_left = message.seconds_left;
            if (message.duration_in_minutes != null && $Object.hasOwnProperty.call(message, "duration_in_minutes"))
                object.duration_in_minutes = message.duration_in_minutes;
            if (message.shuffle_items != null && $Object.hasOwnProperty.call(message, "shuffle_items"))
                object.shuffle_items = message.shuffle_items;
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options"))
                object.shuffle_options = message.shuffle_options;
            if (message.allow_calculator != null && $Object.hasOwnProperty.call(message, "allow_calculator"))
                object.allow_calculator = message.allow_calculator;
            if (message.shuffle_blocks != null && $Object.hasOwnProperty.call(message, "shuffle_blocks"))
                object.shuffle_blocks = message.shuffle_blocks;
            if (message.prevent_navigation_to_attempted_items != null && $Object.hasOwnProperty.call(message, "prevent_navigation_to_attempted_items"))
                object.prevent_navigation_to_attempted_items = message.prevent_navigation_to_attempted_items;
            if (message.section_instruction != null && $Object.hasOwnProperty.call(message, "section_instruction"))
                object.section_instruction = message.section_instruction;
            return object;
        };

        /**
         * Converts this CandidateSectionSettingsProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateSectionSettingsProto.prototype.toJSON = function() {
            return CandidateSectionSettingsProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateSectionSettingsProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateSectionSettingsProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateSectionSettingsProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateSectionSettingsProto";
        };

        return CandidateSectionSettingsProto;
    })();

    candidate_http.CandidateSectionBlocksProto = (function() {

        /**
         * Properties of a CandidateSectionBlocksProto.
         * @typedef {Object} candidate_http.CandidateSectionBlocksProto.$Properties
         * @property {number|Long|null} [id] CandidateSectionBlocksProto id
         * @property {number|null} [total_questions] CandidateSectionBlocksProto total_questions
         * @property {number|null} [index] CandidateSectionBlocksProto index
         * @property {candidate_http.BlockType|null} [block_type] CandidateSectionBlocksProto block_type
         * @property {Array.<candidate_http.CandidateItemProto.$Properties>|null} [items] CandidateSectionBlocksProto items
         * @property {Array.<candidate_http.CandidatePassageItemProto.$Properties>|null} [passages] CandidateSectionBlocksProto passages
         * @property {string|null} [name] CandidateSectionBlocksProto name
         * @property {candidate_http.AttemptRule|null} [attempt_rule] CandidateSectionBlocksProto attempt_rule
         * @property {number|null} [items_to_attempt] CandidateSectionBlocksProto items_to_attempt
         * @property {string|null} [instruction] CandidateSectionBlocksProto instruction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateSectionBlocksProto.
         * @memberof candidate_http
         * @interface ICandidateSectionBlocksProto
         * @augments candidate_http.CandidateSectionBlocksProto.$Properties
         * @deprecated Use candidate_http.CandidateSectionBlocksProto.$Properties instead.
         */

        /**
         * Shape of a CandidateSectionBlocksProto.
         * @typedef {candidate_http.CandidateSectionBlocksProto.$Properties} candidate_http.CandidateSectionBlocksProto.$Shape
         */

        /**
         * Constructs a new CandidateSectionBlocksProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateSectionBlocksProto.
         * @constructor
         * @param {candidate_http.CandidateSectionBlocksProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateSectionBlocksProto = function (properties) {
            this.items = [];
            this.passages = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateSectionBlocksProto id.
         * @member {number|Long} id
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CandidateSectionBlocksProto total_questions.
         * @member {number} total_questions
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.total_questions = 0;

        /**
         * CandidateSectionBlocksProto index.
         * @member {number} index
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.index = 0;

        /**
         * CandidateSectionBlocksProto block_type.
         * @member {candidate_http.BlockType} block_type
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.block_type = 0;

        /**
         * CandidateSectionBlocksProto items.
         * @member {Array.<candidate_http.CandidateItemProto.$Properties>} items
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.items = $util.emptyArray;

        /**
         * CandidateSectionBlocksProto passages.
         * @member {Array.<candidate_http.CandidatePassageItemProto.$Properties>} passages
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.passages = $util.emptyArray;

        /**
         * CandidateSectionBlocksProto name.
         * @member {string} name
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.name = "";

        /**
         * CandidateSectionBlocksProto attempt_rule.
         * @member {candidate_http.AttemptRule} attempt_rule
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.attempt_rule = 0;

        /**
         * CandidateSectionBlocksProto items_to_attempt.
         * @member {number} items_to_attempt
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.items_to_attempt = 0;

        /**
         * CandidateSectionBlocksProto instruction.
         * @member {string|null|undefined} instruction
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         */
        CandidateSectionBlocksProto.prototype.instruction = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateSectionBlocksProto.prototype, "_instruction", {
            get: $util.oneOfGetter($oneOfFields = ["instruction"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateSectionBlocksProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {candidate_http.CandidateSectionBlocksProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateSectionBlocksProto} CandidateSectionBlocksProto instance
         * @type {{
         *   (properties: candidate_http.CandidateSectionBlocksProto.$Shape): candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape;
         *   (properties?: candidate_http.CandidateSectionBlocksProto.$Properties): candidate_http.CandidateSectionBlocksProto;
         * }}
         */
        CandidateSectionBlocksProto.create = function(properties) {
            return new CandidateSectionBlocksProto(properties);
        };

        /**
         * Encodes the specified CandidateSectionBlocksProto message. Does not implicitly {@link candidate_http.CandidateSectionBlocksProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {candidate_http.CandidateSectionBlocksProto.$Properties} message CandidateSectionBlocksProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionBlocksProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && (typeof message.id === "object" ? message.id.low || message.id.high : message.id !== 0))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions") && message.total_questions !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.total_questions);
            if (message.index != null && $Object.hasOwnProperty.call(message, "index") && message.index !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.index);
            if (message.block_type != null && $Object.hasOwnProperty.call(message, "block_type") && message.block_type !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.block_type);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.candidate_http.CandidateItemProto.encode(message.items[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
            if (message.passages != null && message.passages.length)
                for (let i = 0; i < message.passages.length; ++i)
                    $root.candidate_http.CandidatePassageItemProto.encode(message.passages[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.name);
            if (message.attempt_rule != null && $Object.hasOwnProperty.call(message, "attempt_rule") && message.attempt_rule !== 0)
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.attempt_rule);
            if (message.items_to_attempt != null && $Object.hasOwnProperty.call(message, "items_to_attempt") && message.items_to_attempt !== 0)
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.items_to_attempt);
            if (message.instruction != null && $Object.hasOwnProperty.call(message, "instruction"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.instruction);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateSectionBlocksProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionBlocksProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {candidate_http.CandidateSectionBlocksProto.$Properties} message CandidateSectionBlocksProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateSectionBlocksProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateSectionBlocksProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape} CandidateSectionBlocksProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionBlocksProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateSectionBlocksProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.total_questions = value;
                        else
                            delete message.total_questions;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.index = value;
                        else
                            delete message.index;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.block_type = value;
                        else
                            delete message.block_type;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.candidate_http.CandidateItemProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if (!(message.passages && message.passages.length))
                            message.passages = [];
                        message.passages.push($root.candidate_http.CandidatePassageItemProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.attempt_rule = value;
                        else
                            delete message.attempt_rule;
                        continue;
                    }
                case 9: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.items_to_attempt = value;
                        else
                            delete message.items_to_attempt;
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.instruction = reader.stringVerify();
                        message._instruction = "instruction";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateSectionBlocksProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape} CandidateSectionBlocksProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateSectionBlocksProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateSectionBlocksProto message.
         * @function verify
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateSectionBlocksProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions"))
                if (!$util.isInteger(message.total_questions))
                    return "total_questions: integer expected";
            if (message.index != null && $Object.hasOwnProperty.call(message, "index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            if (message.block_type != null && $Object.hasOwnProperty.call(message, "block_type"))
                if (typeof message.block_type !== "number" || (message.block_type | 0) !== message.block_type)
                    return "block_type: enum value expected";
            if (message.items != null && $Object.hasOwnProperty.call(message, "items")) {
                if (!$Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.candidate_http.CandidateItemProto.verify(message.items[i], _depth + 1);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.passages != null && $Object.hasOwnProperty.call(message, "passages")) {
                if (!$Array.isArray(message.passages))
                    return "passages: array expected";
                for (let i = 0; i < message.passages.length; ++i) {
                    let error = $root.candidate_http.CandidatePassageItemProto.verify(message.passages[i], _depth + 1);
                    if (error)
                        return "passages." + error;
                }
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.attempt_rule != null && $Object.hasOwnProperty.call(message, "attempt_rule"))
                if (typeof message.attempt_rule !== "number" || (message.attempt_rule | 0) !== message.attempt_rule)
                    return "attempt_rule: enum value expected";
            if (message.items_to_attempt != null && $Object.hasOwnProperty.call(message, "items_to_attempt"))
                if (!$util.isInteger(message.items_to_attempt))
                    return "items_to_attempt: integer expected";
            if (message.instruction != null && $Object.hasOwnProperty.call(message, "instruction")) {
                properties._instruction = 1;
                if (!$util.isString(message.instruction))
                    return "instruction: string expected";
            }
            return null;
        };

        /**
         * Creates a CandidateSectionBlocksProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateSectionBlocksProto} CandidateSectionBlocksProto
         */
        CandidateSectionBlocksProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateSectionBlocksProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateSectionBlocksProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateSectionBlocksProto();
            if (object.id != null)
                if (typeof object.id === "object" ? object.id.low || object.id.high : $Number(object.id) !== 0)
                    if ($util.Long)
                        message.id = $util.Long.fromValue(object.id, false);
                    else if (typeof object.id === "string")
                        message.id = $parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.total_questions != null)
                if ($Number(object.total_questions) !== 0)
                    message.total_questions = object.total_questions | 0;
            if (object.index != null)
                if ($Number(object.index) !== 0)
                    message.index = object.index | 0;
            if (object.block_type !== 0 && (typeof object.block_type !== "string" || $root.candidate_http.BlockType[object.block_type] !== 0))
                switch (object.block_type) {
                case "SINGLE_QUESTIONS":
                case 0:
                    message.block_type = 0;
                    break;
                case "PASSAGES":
                case 1:
                    message.block_type = 1;
                    break;
                default:
                    if (typeof object.block_type === "number" && (object.block_type | 0) === object.block_type)
                        message.block_type = object.block_type;
                }
            if (object.items) {
                if (!$Array.isArray(object.items))
                    throw $TypeError(".candidate_http.CandidateSectionBlocksProto.items: array expected");
                message.items = $Array(object.items.length);
                for (let i = 0; i < object.items.length; ++i) {
                    if (!$util.isObject(object.items[i]))
                        throw $TypeError(".candidate_http.CandidateSectionBlocksProto.items: object expected");
                    message.items[i] = $root.candidate_http.CandidateItemProto.fromObject(object.items[i], _depth + 1);
                }
            }
            if (object.passages) {
                if (!$Array.isArray(object.passages))
                    throw $TypeError(".candidate_http.CandidateSectionBlocksProto.passages: array expected");
                message.passages = $Array(object.passages.length);
                for (let i = 0; i < object.passages.length; ++i) {
                    if (!$util.isObject(object.passages[i]))
                        throw $TypeError(".candidate_http.CandidateSectionBlocksProto.passages: object expected");
                    message.passages[i] = $root.candidate_http.CandidatePassageItemProto.fromObject(object.passages[i], _depth + 1);
                }
            }
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.attempt_rule !== 0 && (typeof object.attempt_rule !== "string" || $root.candidate_http.AttemptRule[object.attempt_rule] !== 0))
                switch (object.attempt_rule) {
                case "ATTEMPT_ALL":
                case 0:
                    message.attempt_rule = 0;
                    break;
                case "ATTEMPT_ANY":
                case 1:
                    message.attempt_rule = 1;
                    break;
                default:
                    if (typeof object.attempt_rule === "number" && (object.attempt_rule | 0) === object.attempt_rule)
                        message.attempt_rule = object.attempt_rule;
                }
            if (object.items_to_attempt != null)
                if ($Number(object.items_to_attempt) !== 0)
                    message.items_to_attempt = object.items_to_attempt | 0;
            if (object.instruction != null)
                message.instruction = $String(object.instruction);
            return message;
        };

        /**
         * Creates a plain object from a CandidateSectionBlocksProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {candidate_http.CandidateSectionBlocksProto} message CandidateSectionBlocksProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateSectionBlocksProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.items = [];
                object.passages = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.id = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.total_questions = 0;
                object.index = 0;
                object.block_type = options.enums === $String ? "SINGLE_QUESTIONS" : 0;
                object.name = "";
                object.attempt_rule = options.enums === $String ? "ATTEMPT_ALL" : 0;
                object.items_to_attempt = 0;
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.id = typeof message.id === "number" ? $BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, false).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === $String ? $String(message.id) : message.id;
                else
                    object.id = options.longs === $String ? $util.Long.prototype.toString.call(message.id) : options.longs === $Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.total_questions != null && $Object.hasOwnProperty.call(message, "total_questions"))
                object.total_questions = message.total_questions;
            if (message.index != null && $Object.hasOwnProperty.call(message, "index"))
                object.index = message.index;
            if (message.block_type != null && $Object.hasOwnProperty.call(message, "block_type"))
                object.block_type = options.enums === $String ? $root.candidate_http.BlockType[message.block_type] === $undefined ? message.block_type : $root.candidate_http.BlockType[message.block_type] : message.block_type;
            if (message.items && message.items.length) {
                object.items = $Array(message.items.length);
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.candidate_http.CandidateItemProto.toObject(message.items[j], options, _depth + 1);
            }
            if (message.passages && message.passages.length) {
                object.passages = $Array(message.passages.length);
                for (let j = 0; j < message.passages.length; ++j)
                    object.passages[j] = $root.candidate_http.CandidatePassageItemProto.toObject(message.passages[j], options, _depth + 1);
            }
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.attempt_rule != null && $Object.hasOwnProperty.call(message, "attempt_rule"))
                object.attempt_rule = options.enums === $String ? $root.candidate_http.AttemptRule[message.attempt_rule] === $undefined ? message.attempt_rule : $root.candidate_http.AttemptRule[message.attempt_rule] : message.attempt_rule;
            if (message.items_to_attempt != null && $Object.hasOwnProperty.call(message, "items_to_attempt"))
                object.items_to_attempt = message.items_to_attempt;
            if (message.instruction != null && $Object.hasOwnProperty.call(message, "instruction"))
                object.instruction = message.instruction;
            return object;
        };

        /**
         * Converts this CandidateSectionBlocksProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateSectionBlocksProto.prototype.toJSON = function() {
            return CandidateSectionBlocksProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateSectionBlocksProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateSectionBlocksProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateSectionBlocksProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateSectionBlocksProto";
        };

        return CandidateSectionBlocksProto;
    })();

    candidate_http.CandidateItemProto = (function() {

        /**
         * Properties of a CandidateItemProto.
         * @typedef {Object} candidate_http.CandidateItemProto.$Properties
         * @property {Uint8Array|null} [id] CandidateItemProto id
         * @property {string|null} [passage_stimulus] CandidateItemProto passage_stimulus
         * @property {string|null} [reference] CandidateItemProto reference
         * @property {string|null} [stimulus] CandidateItemProto stimulus
         * @property {Array.<candidate_http.OptionDto.$Properties>|null} [options] CandidateItemProto options
         * @property {Array.<string>|null} [stems] CandidateItemProto stems
         * @property {Array.<candidate_http.PossibleResponseCandidate.$Properties>|null} [possible_responses] CandidateItemProto possible_responses
         * @property {Array.<candidate_http.ResponsePosition.$Properties>|null} [response_positions] CandidateItemProto response_positions
         * @property {Array.<candidate_http.OptionDto.$Properties>|null} [distractors] CandidateItemProto distractors
         * @property {candidate_http.ItemType|null} [item_type] CandidateItemProto item_type
         * @property {boolean|null} [numerical] CandidateItemProto numerical
         * @property {boolean|null} [case_sensitive] CandidateItemProto case_sensitive
         * @property {boolean|null} [shuffle_options] CandidateItemProto shuffle_options
         * @property {boolean|null} [multiple_response] CandidateItemProto multiple_response
         * @property {number|null} [max_words] CandidateItemProto max_words
         * @property {number|null} [max_length] CandidateItemProto max_length
         * @property {boolean|null} [allow_paste] CandidateItemProto allow_paste
         * @property {boolean|null} [allow_copy] CandidateItemProto allow_copy
         * @property {boolean|null} [allow_cut] CandidateItemProto allow_cut
         * @property {boolean|null} [plain_text] CandidateItemProto plain_text
         * @property {Array.<string>|null} [responses] CandidateItemProto responses
         * @property {boolean|null} [revisit] CandidateItemProto revisit
         * @property {number|null} [max_responses] CandidateItemProto max_responses
         * @property {candidate_http.ImageData.$Properties|null} [image_data] CandidateItemProto image_data
         * @property {boolean|null} [allow_stop] CandidateItemProto allow_stop
         * @property {boolean|null} [allow_pause] CandidateItemProto allow_pause
         * @property {boolean|null} [beep_when_recording_starts] CandidateItemProto beep_when_recording_starts
         * @property {boolean|null} [warn_overwrite] CandidateItemProto warn_overwrite
         * @property {boolean|null} [paper_response] CandidateItemProto paper_response
         * @property {number|null} [max_duration] CandidateItemProto max_duration
         * @property {candidate_http.BackgroundType|null} [background_type] CandidateItemProto background_type
         * @property {candidate_http.DrawingWritingSplitType|null} [drawing_writing_split_type] CandidateItemProto drawing_writing_split_type
         * @property {Array.<candidate_http.SubQuestion.$Properties>|null} [sub_questions] CandidateItemProto sub_questions
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateItemProto.
         * @memberof candidate_http
         * @interface ICandidateItemProto
         * @augments candidate_http.CandidateItemProto.$Properties
         * @deprecated Use candidate_http.CandidateItemProto.$Properties instead.
         */

        /**
         * Shape of a CandidateItemProto.
         * @typedef {candidate_http.CandidateItemProto.$Properties} candidate_http.CandidateItemProto.$Shape
         */

        /**
         * Constructs a new CandidateItemProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateItemProto.
         * @constructor
         * @param {candidate_http.CandidateItemProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateItemProto = function (properties) {
            this.options = [];
            this.stems = [];
            this.possible_responses = [];
            this.response_positions = [];
            this.distractors = [];
            this.responses = [];
            this.sub_questions = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateItemProto id.
         * @member {Uint8Array} id
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.id = $util.newBuffer([]);

        /**
         * CandidateItemProto passage_stimulus.
         * @member {string|null|undefined} passage_stimulus
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.passage_stimulus = null;

        /**
         * CandidateItemProto reference.
         * @member {string} reference
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.reference = "";

        /**
         * CandidateItemProto stimulus.
         * @member {string} stimulus
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.stimulus = "";

        /**
         * CandidateItemProto options.
         * @member {Array.<candidate_http.OptionDto.$Properties>} options
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.options = $util.emptyArray;

        /**
         * CandidateItemProto stems.
         * @member {Array.<string>} stems
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.stems = $util.emptyArray;

        /**
         * CandidateItemProto possible_responses.
         * @member {Array.<candidate_http.PossibleResponseCandidate.$Properties>} possible_responses
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.possible_responses = $util.emptyArray;

        /**
         * CandidateItemProto response_positions.
         * @member {Array.<candidate_http.ResponsePosition.$Properties>} response_positions
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.response_positions = $util.emptyArray;

        /**
         * CandidateItemProto distractors.
         * @member {Array.<candidate_http.OptionDto.$Properties>} distractors
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.distractors = $util.emptyArray;

        /**
         * CandidateItemProto item_type.
         * @member {candidate_http.ItemType} item_type
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.item_type = 0;

        /**
         * CandidateItemProto numerical.
         * @member {boolean} numerical
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.numerical = false;

        /**
         * CandidateItemProto case_sensitive.
         * @member {boolean} case_sensitive
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.case_sensitive = false;

        /**
         * CandidateItemProto shuffle_options.
         * @member {boolean} shuffle_options
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.shuffle_options = false;

        /**
         * CandidateItemProto multiple_response.
         * @member {boolean} multiple_response
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.multiple_response = false;

        /**
         * CandidateItemProto max_words.
         * @member {number} max_words
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.max_words = 0;

        /**
         * CandidateItemProto max_length.
         * @member {number} max_length
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.max_length = 0;

        /**
         * CandidateItemProto allow_paste.
         * @member {boolean} allow_paste
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.allow_paste = false;

        /**
         * CandidateItemProto allow_copy.
         * @member {boolean} allow_copy
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.allow_copy = false;

        /**
         * CandidateItemProto allow_cut.
         * @member {boolean} allow_cut
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.allow_cut = false;

        /**
         * CandidateItemProto plain_text.
         * @member {boolean} plain_text
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.plain_text = false;

        /**
         * CandidateItemProto responses.
         * @member {Array.<string>} responses
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.responses = $util.emptyArray;

        /**
         * CandidateItemProto revisit.
         * @member {boolean} revisit
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.revisit = false;

        /**
         * CandidateItemProto max_responses.
         * @member {number} max_responses
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.max_responses = 0;

        /**
         * CandidateItemProto image_data.
         * @member {candidate_http.ImageData.$Properties|null|undefined} image_data
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.image_data = null;

        /**
         * CandidateItemProto allow_stop.
         * @member {boolean} allow_stop
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.allow_stop = false;

        /**
         * CandidateItemProto allow_pause.
         * @member {boolean} allow_pause
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.allow_pause = false;

        /**
         * CandidateItemProto beep_when_recording_starts.
         * @member {boolean} beep_when_recording_starts
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.beep_when_recording_starts = false;

        /**
         * CandidateItemProto warn_overwrite.
         * @member {boolean} warn_overwrite
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.warn_overwrite = false;

        /**
         * CandidateItemProto paper_response.
         * @member {boolean} paper_response
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.paper_response = false;

        /**
         * CandidateItemProto max_duration.
         * @member {number} max_duration
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.max_duration = 0;

        /**
         * CandidateItemProto background_type.
         * @member {candidate_http.BackgroundType|null|undefined} background_type
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.background_type = null;

        /**
         * CandidateItemProto drawing_writing_split_type.
         * @member {candidate_http.DrawingWritingSplitType|null|undefined} drawing_writing_split_type
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.drawing_writing_split_type = null;

        /**
         * CandidateItemProto sub_questions.
         * @member {Array.<candidate_http.SubQuestion.$Properties>} sub_questions
         * @memberof candidate_http.CandidateItemProto
         * @instance
         */
        CandidateItemProto.prototype.sub_questions = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateItemProto.prototype, "_passage_stimulus", {
            get: $util.oneOfGetter($oneOfFields = ["passage_stimulus"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateItemProto.prototype, "_image_data", {
            get: $util.oneOfGetter($oneOfFields = ["image_data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateItemProto.prototype, "_background_type", {
            get: $util.oneOfGetter($oneOfFields = ["background_type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateItemProto.prototype, "_drawing_writing_split_type", {
            get: $util.oneOfGetter($oneOfFields = ["drawing_writing_split_type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateItemProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {candidate_http.CandidateItemProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateItemProto} CandidateItemProto instance
         * @type {{
         *   (properties: candidate_http.CandidateItemProto.$Shape): candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape;
         *   (properties?: candidate_http.CandidateItemProto.$Properties): candidate_http.CandidateItemProto;
         * }}
         */
        CandidateItemProto.create = function(properties) {
            return new CandidateItemProto(properties);
        };

        /**
         * Encodes the specified CandidateItemProto message. Does not implicitly {@link candidate_http.CandidateItemProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {candidate_http.CandidateItemProto.$Properties} message CandidateItemProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateItemProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
            if (message.passage_stimulus != null && $Object.hasOwnProperty.call(message, "passage_stimulus"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.passage_stimulus);
            if (message.reference != null && $Object.hasOwnProperty.call(message, "reference") && message.reference !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.reference);
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus") && message.stimulus !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.stimulus);
            if (message.options != null && message.options.length)
                for (let i = 0; i < message.options.length; ++i)
                    $root.candidate_http.OptionDto.encode(message.options[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
            if (message.stems != null && message.stems.length)
                for (let i = 0; i < message.stems.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.stems[i]);
            if (message.possible_responses != null && message.possible_responses.length)
                for (let i = 0; i < message.possible_responses.length; ++i)
                    $root.candidate_http.PossibleResponseCandidate.encode(message.possible_responses[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
            if (message.response_positions != null && message.response_positions.length)
                for (let i = 0; i < message.response_positions.length; ++i)
                    $root.candidate_http.ResponsePosition.encode(message.response_positions[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
            if (message.distractors != null && message.distractors.length)
                for (let i = 0; i < message.distractors.length; ++i)
                    $root.candidate_http.OptionDto.encode(message.distractors[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type") && message.item_type !== 0)
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.item_type);
            if (message.numerical != null && $Object.hasOwnProperty.call(message, "numerical") && message.numerical !== false)
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.numerical);
            if (message.case_sensitive != null && $Object.hasOwnProperty.call(message, "case_sensitive") && message.case_sensitive !== false)
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.case_sensitive);
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options") && message.shuffle_options !== false)
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.shuffle_options);
            if (message.multiple_response != null && $Object.hasOwnProperty.call(message, "multiple_response") && message.multiple_response !== false)
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.multiple_response);
            if (message.max_words != null && $Object.hasOwnProperty.call(message, "max_words") && message.max_words !== 0)
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.max_words);
            if (message.max_length != null && $Object.hasOwnProperty.call(message, "max_length") && message.max_length !== 0)
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.max_length);
            if (message.allow_paste != null && $Object.hasOwnProperty.call(message, "allow_paste") && message.allow_paste !== false)
                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.allow_paste);
            if (message.allow_copy != null && $Object.hasOwnProperty.call(message, "allow_copy") && message.allow_copy !== false)
                writer.uint32(/* id 18, wireType 0 =*/144).bool(message.allow_copy);
            if (message.allow_cut != null && $Object.hasOwnProperty.call(message, "allow_cut") && message.allow_cut !== false)
                writer.uint32(/* id 19, wireType 0 =*/152).bool(message.allow_cut);
            if (message.plain_text != null && $Object.hasOwnProperty.call(message, "plain_text") && message.plain_text !== false)
                writer.uint32(/* id 20, wireType 0 =*/160).bool(message.plain_text);
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    writer.uint32(/* id 21, wireType 2 =*/170).string(message.responses[i]);
            if (message.revisit != null && $Object.hasOwnProperty.call(message, "revisit") && message.revisit !== false)
                writer.uint32(/* id 22, wireType 0 =*/176).bool(message.revisit);
            if (message.max_responses != null && $Object.hasOwnProperty.call(message, "max_responses") && message.max_responses !== 0)
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.max_responses);
            if (message.image_data != null && $Object.hasOwnProperty.call(message, "image_data"))
                $root.candidate_http.ImageData.encode(message.image_data, writer.uint32(/* id 24, wireType 2 =*/194).fork(), _depth + 1).ldelim();
            if (message.allow_stop != null && $Object.hasOwnProperty.call(message, "allow_stop") && message.allow_stop !== false)
                writer.uint32(/* id 25, wireType 0 =*/200).bool(message.allow_stop);
            if (message.allow_pause != null && $Object.hasOwnProperty.call(message, "allow_pause") && message.allow_pause !== false)
                writer.uint32(/* id 26, wireType 0 =*/208).bool(message.allow_pause);
            if (message.beep_when_recording_starts != null && $Object.hasOwnProperty.call(message, "beep_when_recording_starts") && message.beep_when_recording_starts !== false)
                writer.uint32(/* id 27, wireType 0 =*/216).bool(message.beep_when_recording_starts);
            if (message.warn_overwrite != null && $Object.hasOwnProperty.call(message, "warn_overwrite") && message.warn_overwrite !== false)
                writer.uint32(/* id 28, wireType 0 =*/224).bool(message.warn_overwrite);
            if (message.paper_response != null && $Object.hasOwnProperty.call(message, "paper_response") && message.paper_response !== false)
                writer.uint32(/* id 29, wireType 0 =*/232).bool(message.paper_response);
            if (message.max_duration != null && $Object.hasOwnProperty.call(message, "max_duration") && message.max_duration !== 0)
                writer.uint32(/* id 30, wireType 0 =*/240).int32(message.max_duration);
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type"))
                writer.uint32(/* id 31, wireType 0 =*/248).int32(message.background_type);
            if (message.drawing_writing_split_type != null && $Object.hasOwnProperty.call(message, "drawing_writing_split_type"))
                writer.uint32(/* id 32, wireType 0 =*/256).int32(message.drawing_writing_split_type);
            if (message.sub_questions != null && message.sub_questions.length)
                for (let i = 0; i < message.sub_questions.length; ++i)
                    $root.candidate_http.SubQuestion.encode(message.sub_questions[i], writer.uint32(/* id 33, wireType 2 =*/266).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateItemProto message, length delimited. Does not implicitly {@link candidate_http.CandidateItemProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {candidate_http.CandidateItemProto.$Properties} message CandidateItemProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateItemProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateItemProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape} CandidateItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateItemProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateItemProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.passage_stimulus = reader.stringVerify();
                        message._passage_stimulus = "passage_stimulus";
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.reference = value;
                        else
                            delete message.reference;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.stimulus = value;
                        else
                            delete message.stimulus;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if (!(message.options && message.options.length))
                            message.options = [];
                        message.options.push($root.candidate_http.OptionDto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if (!(message.stems && message.stems.length))
                            message.stems = [];
                        message.stems.push(reader.stringVerify());
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if (!(message.possible_responses && message.possible_responses.length))
                            message.possible_responses = [];
                        message.possible_responses.push($root.candidate_http.PossibleResponseCandidate.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        if (!(message.response_positions && message.response_positions.length))
                            message.response_positions = [];
                        message.response_positions.push($root.candidate_http.ResponsePosition.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        if (!(message.distractors && message.distractors.length))
                            message.distractors = [];
                        message.distractors.push($root.candidate_http.OptionDto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 10: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.item_type = value;
                        else
                            delete message.item_type;
                        continue;
                    }
                case 11: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.numerical = value;
                        else
                            delete message.numerical;
                        continue;
                    }
                case 12: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.case_sensitive = value;
                        else
                            delete message.case_sensitive;
                        continue;
                    }
                case 13: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.shuffle_options = value;
                        else
                            delete message.shuffle_options;
                        continue;
                    }
                case 14: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.multiple_response = value;
                        else
                            delete message.multiple_response;
                        continue;
                    }
                case 15: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.max_words = value;
                        else
                            delete message.max_words;
                        continue;
                    }
                case 16: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.max_length = value;
                        else
                            delete message.max_length;
                        continue;
                    }
                case 17: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_paste = value;
                        else
                            delete message.allow_paste;
                        continue;
                    }
                case 18: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_copy = value;
                        else
                            delete message.allow_copy;
                        continue;
                    }
                case 19: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_cut = value;
                        else
                            delete message.allow_cut;
                        continue;
                    }
                case 20: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.plain_text = value;
                        else
                            delete message.plain_text;
                        continue;
                    }
                case 21: {
                        if (wireType !== 2)
                            break;
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push(reader.stringVerify());
                        continue;
                    }
                case 22: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.revisit = value;
                        else
                            delete message.revisit;
                        continue;
                    }
                case 23: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.max_responses = value;
                        else
                            delete message.max_responses;
                        continue;
                    }
                case 24: {
                        if (wireType !== 2)
                            break;
                        message.image_data = $root.candidate_http.ImageData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.image_data);
                        message._image_data = "image_data";
                        continue;
                    }
                case 25: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_stop = value;
                        else
                            delete message.allow_stop;
                        continue;
                    }
                case 26: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.allow_pause = value;
                        else
                            delete message.allow_pause;
                        continue;
                    }
                case 27: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.beep_when_recording_starts = value;
                        else
                            delete message.beep_when_recording_starts;
                        continue;
                    }
                case 28: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.warn_overwrite = value;
                        else
                            delete message.warn_overwrite;
                        continue;
                    }
                case 29: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.paper_response = value;
                        else
                            delete message.paper_response;
                        continue;
                    }
                case 30: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.max_duration = value;
                        else
                            delete message.max_duration;
                        continue;
                    }
                case 31: {
                        if (wireType !== 0)
                            break;
                        message.background_type = reader.int32();
                        message._background_type = "background_type";
                        continue;
                    }
                case 32: {
                        if (wireType !== 0)
                            break;
                        message.drawing_writing_split_type = reader.int32();
                        message._drawing_writing_split_type = "drawing_writing_split_type";
                        continue;
                    }
                case 33: {
                        if (wireType !== 2)
                            break;
                        if (!(message.sub_questions && message.sub_questions.length))
                            message.sub_questions = [];
                        message.sub_questions.push($root.candidate_http.SubQuestion.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateItemProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape} CandidateItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateItemProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateItemProto message.
         * @function verify
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateItemProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                    return "id: buffer expected";
            if (message.passage_stimulus != null && $Object.hasOwnProperty.call(message, "passage_stimulus")) {
                properties._passage_stimulus = 1;
                if (!$util.isString(message.passage_stimulus))
                    return "passage_stimulus: string expected";
            }
            if (message.reference != null && $Object.hasOwnProperty.call(message, "reference"))
                if (!$util.isString(message.reference))
                    return "reference: string expected";
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                if (!$util.isString(message.stimulus))
                    return "stimulus: string expected";
            if (message.options != null && $Object.hasOwnProperty.call(message, "options")) {
                if (!$Array.isArray(message.options))
                    return "options: array expected";
                for (let i = 0; i < message.options.length; ++i) {
                    let error = $root.candidate_http.OptionDto.verify(message.options[i], _depth + 1);
                    if (error)
                        return "options." + error;
                }
            }
            if (message.stems != null && $Object.hasOwnProperty.call(message, "stems")) {
                if (!$Array.isArray(message.stems))
                    return "stems: array expected";
                for (let i = 0; i < message.stems.length; ++i)
                    if (!$util.isString(message.stems[i]))
                        return "stems: string[] expected";
            }
            if (message.possible_responses != null && $Object.hasOwnProperty.call(message, "possible_responses")) {
                if (!$Array.isArray(message.possible_responses))
                    return "possible_responses: array expected";
                for (let i = 0; i < message.possible_responses.length; ++i) {
                    let error = $root.candidate_http.PossibleResponseCandidate.verify(message.possible_responses[i], _depth + 1);
                    if (error)
                        return "possible_responses." + error;
                }
            }
            if (message.response_positions != null && $Object.hasOwnProperty.call(message, "response_positions")) {
                if (!$Array.isArray(message.response_positions))
                    return "response_positions: array expected";
                for (let i = 0; i < message.response_positions.length; ++i) {
                    let error = $root.candidate_http.ResponsePosition.verify(message.response_positions[i], _depth + 1);
                    if (error)
                        return "response_positions." + error;
                }
            }
            if (message.distractors != null && $Object.hasOwnProperty.call(message, "distractors")) {
                if (!$Array.isArray(message.distractors))
                    return "distractors: array expected";
                for (let i = 0; i < message.distractors.length; ++i) {
                    let error = $root.candidate_http.OptionDto.verify(message.distractors[i], _depth + 1);
                    if (error)
                        return "distractors." + error;
                }
            }
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type"))
                if (typeof message.item_type !== "number" || (message.item_type | 0) !== message.item_type)
                    return "item_type: enum value expected";
            if (message.numerical != null && $Object.hasOwnProperty.call(message, "numerical"))
                if (typeof message.numerical !== "boolean")
                    return "numerical: boolean expected";
            if (message.case_sensitive != null && $Object.hasOwnProperty.call(message, "case_sensitive"))
                if (typeof message.case_sensitive !== "boolean")
                    return "case_sensitive: boolean expected";
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options"))
                if (typeof message.shuffle_options !== "boolean")
                    return "shuffle_options: boolean expected";
            if (message.multiple_response != null && $Object.hasOwnProperty.call(message, "multiple_response"))
                if (typeof message.multiple_response !== "boolean")
                    return "multiple_response: boolean expected";
            if (message.max_words != null && $Object.hasOwnProperty.call(message, "max_words"))
                if (!$util.isInteger(message.max_words))
                    return "max_words: integer expected";
            if (message.max_length != null && $Object.hasOwnProperty.call(message, "max_length"))
                if (!$util.isInteger(message.max_length))
                    return "max_length: integer expected";
            if (message.allow_paste != null && $Object.hasOwnProperty.call(message, "allow_paste"))
                if (typeof message.allow_paste !== "boolean")
                    return "allow_paste: boolean expected";
            if (message.allow_copy != null && $Object.hasOwnProperty.call(message, "allow_copy"))
                if (typeof message.allow_copy !== "boolean")
                    return "allow_copy: boolean expected";
            if (message.allow_cut != null && $Object.hasOwnProperty.call(message, "allow_cut"))
                if (typeof message.allow_cut !== "boolean")
                    return "allow_cut: boolean expected";
            if (message.plain_text != null && $Object.hasOwnProperty.call(message, "plain_text"))
                if (typeof message.plain_text !== "boolean")
                    return "plain_text: boolean expected";
            if (message.responses != null && $Object.hasOwnProperty.call(message, "responses")) {
                if (!$Array.isArray(message.responses))
                    return "responses: array expected";
                for (let i = 0; i < message.responses.length; ++i)
                    if (!$util.isString(message.responses[i]))
                        return "responses: string[] expected";
            }
            if (message.revisit != null && $Object.hasOwnProperty.call(message, "revisit"))
                if (typeof message.revisit !== "boolean")
                    return "revisit: boolean expected";
            if (message.max_responses != null && $Object.hasOwnProperty.call(message, "max_responses"))
                if (!$util.isInteger(message.max_responses))
                    return "max_responses: integer expected";
            if (message.image_data != null && $Object.hasOwnProperty.call(message, "image_data")) {
                properties._image_data = 1;
                {
                    let error = $root.candidate_http.ImageData.verify(message.image_data, _depth + 1);
                    if (error)
                        return "image_data." + error;
                }
            }
            if (message.allow_stop != null && $Object.hasOwnProperty.call(message, "allow_stop"))
                if (typeof message.allow_stop !== "boolean")
                    return "allow_stop: boolean expected";
            if (message.allow_pause != null && $Object.hasOwnProperty.call(message, "allow_pause"))
                if (typeof message.allow_pause !== "boolean")
                    return "allow_pause: boolean expected";
            if (message.beep_when_recording_starts != null && $Object.hasOwnProperty.call(message, "beep_when_recording_starts"))
                if (typeof message.beep_when_recording_starts !== "boolean")
                    return "beep_when_recording_starts: boolean expected";
            if (message.warn_overwrite != null && $Object.hasOwnProperty.call(message, "warn_overwrite"))
                if (typeof message.warn_overwrite !== "boolean")
                    return "warn_overwrite: boolean expected";
            if (message.paper_response != null && $Object.hasOwnProperty.call(message, "paper_response"))
                if (typeof message.paper_response !== "boolean")
                    return "paper_response: boolean expected";
            if (message.max_duration != null && $Object.hasOwnProperty.call(message, "max_duration"))
                if (!$util.isInteger(message.max_duration))
                    return "max_duration: integer expected";
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type")) {
                properties._background_type = 1;
                if (typeof message.background_type !== "number" || (message.background_type | 0) !== message.background_type)
                    return "background_type: enum value expected";
            }
            if (message.drawing_writing_split_type != null && $Object.hasOwnProperty.call(message, "drawing_writing_split_type")) {
                properties._drawing_writing_split_type = 1;
                if (typeof message.drawing_writing_split_type !== "number" || (message.drawing_writing_split_type | 0) !== message.drawing_writing_split_type)
                    return "drawing_writing_split_type: enum value expected";
            }
            if (message.sub_questions != null && $Object.hasOwnProperty.call(message, "sub_questions")) {
                if (!$Array.isArray(message.sub_questions))
                    return "sub_questions: array expected";
                for (let i = 0; i < message.sub_questions.length; ++i) {
                    let error = $root.candidate_http.SubQuestion.verify(message.sub_questions[i], _depth + 1);
                    if (error)
                        return "sub_questions." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CandidateItemProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateItemProto} CandidateItemProto
         */
        CandidateItemProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateItemProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateItemProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateItemProto();
            if (object.id != null)
                if (object.id.length)
                    if (typeof object.id === "string")
                        $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                    else if (object.id.length >= 0)
                        message.id = object.id;
            if (object.passage_stimulus != null)
                message.passage_stimulus = $String(object.passage_stimulus);
            if (object.reference != null)
                if (typeof object.reference !== "string" || object.reference.length)
                    message.reference = $String(object.reference);
            if (object.stimulus != null)
                if (typeof object.stimulus !== "string" || object.stimulus.length)
                    message.stimulus = $String(object.stimulus);
            if (object.options) {
                if (!$Array.isArray(object.options))
                    throw $TypeError(".candidate_http.CandidateItemProto.options: array expected");
                message.options = $Array(object.options.length);
                for (let i = 0; i < object.options.length; ++i) {
                    if (!$util.isObject(object.options[i]))
                        throw $TypeError(".candidate_http.CandidateItemProto.options: object expected");
                    message.options[i] = $root.candidate_http.OptionDto.fromObject(object.options[i], _depth + 1);
                }
            }
            if (object.stems) {
                if (!$Array.isArray(object.stems))
                    throw $TypeError(".candidate_http.CandidateItemProto.stems: array expected");
                message.stems = $Array(object.stems.length);
                for (let i = 0; i < object.stems.length; ++i)
                    message.stems[i] = $String(object.stems[i]);
            }
            if (object.possible_responses) {
                if (!$Array.isArray(object.possible_responses))
                    throw $TypeError(".candidate_http.CandidateItemProto.possible_responses: array expected");
                message.possible_responses = $Array(object.possible_responses.length);
                for (let i = 0; i < object.possible_responses.length; ++i) {
                    if (!$util.isObject(object.possible_responses[i]))
                        throw $TypeError(".candidate_http.CandidateItemProto.possible_responses: object expected");
                    message.possible_responses[i] = $root.candidate_http.PossibleResponseCandidate.fromObject(object.possible_responses[i], _depth + 1);
                }
            }
            if (object.response_positions) {
                if (!$Array.isArray(object.response_positions))
                    throw $TypeError(".candidate_http.CandidateItemProto.response_positions: array expected");
                message.response_positions = $Array(object.response_positions.length);
                for (let i = 0; i < object.response_positions.length; ++i) {
                    if (!$util.isObject(object.response_positions[i]))
                        throw $TypeError(".candidate_http.CandidateItemProto.response_positions: object expected");
                    message.response_positions[i] = $root.candidate_http.ResponsePosition.fromObject(object.response_positions[i], _depth + 1);
                }
            }
            if (object.distractors) {
                if (!$Array.isArray(object.distractors))
                    throw $TypeError(".candidate_http.CandidateItemProto.distractors: array expected");
                message.distractors = $Array(object.distractors.length);
                for (let i = 0; i < object.distractors.length; ++i) {
                    if (!$util.isObject(object.distractors[i]))
                        throw $TypeError(".candidate_http.CandidateItemProto.distractors: object expected");
                    message.distractors[i] = $root.candidate_http.OptionDto.fromObject(object.distractors[i], _depth + 1);
                }
            }
            if (object.item_type !== 0 && (typeof object.item_type !== "string" || $root.candidate_http.ItemType[object.item_type] !== 0))
                switch (object.item_type) {
                case "MCQ":
                case 0:
                    message.item_type = 0;
                    break;
                case "MRQ":
                case 1:
                    message.item_type = 1;
                    break;
                case "ESSAY_PLAIN_TEXT":
                case 2:
                    message.item_type = 2;
                    break;
                case "ESSAY_RICH_TEXT":
                case 3:
                    message.item_type = 3;
                    break;
                case "CLOZE_TEXT":
                case 4:
                    message.item_type = 4;
                    break;
                case "CLOZE_DROPDOWN":
                case 5:
                    message.item_type = 5;
                    break;
                case "SHORT_TEXT":
                case 6:
                    message.item_type = 6;
                    break;
                case "TRUE_FALSE":
                case 7:
                    message.item_type = 7;
                    break;
                case "YES_NO":
                case 8:
                    message.item_type = 8;
                    break;
                case "ASSOCIATION":
                case 9:
                    message.item_type = 9;
                    break;
                case "CHOICE_MATRIX":
                case 10:
                    message.item_type = 10;
                    break;
                case "ORDER_LIST":
                case 11:
                    message.item_type = 11;
                    break;
                case "CLOZE_TEXT_IMAGE":
                case 12:
                    message.item_type = 12;
                    break;
                case "CLOZE_DROPDOWN_IMAGE":
                case 13:
                    message.item_type = 13;
                    break;
                case "IMAGE_DRAG_AND_DROP":
                case 14:
                    message.item_type = 14;
                    break;
                case "DRAWING_AND_WRITING":
                case 15:
                    message.item_type = 15;
                    break;
                case "CLOZERADIO":
                case 16:
                    message.item_type = 16;
                    break;
                default:
                    if (typeof object.item_type === "number" && (object.item_type | 0) === object.item_type)
                        message.item_type = object.item_type;
                }
            if (object.numerical != null)
                if (object.numerical)
                    message.numerical = $Boolean(object.numerical);
            if (object.case_sensitive != null)
                if (object.case_sensitive)
                    message.case_sensitive = $Boolean(object.case_sensitive);
            if (object.shuffle_options != null)
                if (object.shuffle_options)
                    message.shuffle_options = $Boolean(object.shuffle_options);
            if (object.multiple_response != null)
                if (object.multiple_response)
                    message.multiple_response = $Boolean(object.multiple_response);
            if (object.max_words != null)
                if ($Number(object.max_words) !== 0)
                    message.max_words = object.max_words | 0;
            if (object.max_length != null)
                if ($Number(object.max_length) !== 0)
                    message.max_length = object.max_length | 0;
            if (object.allow_paste != null)
                if (object.allow_paste)
                    message.allow_paste = $Boolean(object.allow_paste);
            if (object.allow_copy != null)
                if (object.allow_copy)
                    message.allow_copy = $Boolean(object.allow_copy);
            if (object.allow_cut != null)
                if (object.allow_cut)
                    message.allow_cut = $Boolean(object.allow_cut);
            if (object.plain_text != null)
                if (object.plain_text)
                    message.plain_text = $Boolean(object.plain_text);
            if (object.responses) {
                if (!$Array.isArray(object.responses))
                    throw $TypeError(".candidate_http.CandidateItemProto.responses: array expected");
                message.responses = $Array(object.responses.length);
                for (let i = 0; i < object.responses.length; ++i)
                    message.responses[i] = $String(object.responses[i]);
            }
            if (object.revisit != null)
                if (object.revisit)
                    message.revisit = $Boolean(object.revisit);
            if (object.max_responses != null)
                if ($Number(object.max_responses) !== 0)
                    message.max_responses = object.max_responses | 0;
            if (object.image_data != null) {
                if (!$util.isObject(object.image_data))
                    throw $TypeError(".candidate_http.CandidateItemProto.image_data: object expected");
                message.image_data = $root.candidate_http.ImageData.fromObject(object.image_data, _depth + 1);
            }
            if (object.allow_stop != null)
                if (object.allow_stop)
                    message.allow_stop = $Boolean(object.allow_stop);
            if (object.allow_pause != null)
                if (object.allow_pause)
                    message.allow_pause = $Boolean(object.allow_pause);
            if (object.beep_when_recording_starts != null)
                if (object.beep_when_recording_starts)
                    message.beep_when_recording_starts = $Boolean(object.beep_when_recording_starts);
            if (object.warn_overwrite != null)
                if (object.warn_overwrite)
                    message.warn_overwrite = $Boolean(object.warn_overwrite);
            if (object.paper_response != null)
                if (object.paper_response)
                    message.paper_response = $Boolean(object.paper_response);
            if (object.max_duration != null)
                if ($Number(object.max_duration) !== 0)
                    message.max_duration = object.max_duration | 0;
            switch (object.background_type) {
            case "BG_NONE":
            case 0:
                message.background_type = 0;
                break;
            case "BG_GRID":
            case 1:
                message.background_type = 1;
                break;
            case "BG_LINE":
            case 2:
                message.background_type = 2;
                break;
            case "BG_GRAPH":
            case 3:
                message.background_type = 3;
                break;
            default:
                if (typeof object.background_type === "number" && (object.background_type | 0) === object.background_type)
                    message.background_type = object.background_type;
            }
            switch (object.drawing_writing_split_type) {
            case "FULL":
            case 0:
                message.drawing_writing_split_type = 0;
                break;
            case "SPLIT":
            case 1:
                message.drawing_writing_split_type = 1;
                break;
            default:
                if (typeof object.drawing_writing_split_type === "number" && (object.drawing_writing_split_type | 0) === object.drawing_writing_split_type)
                    message.drawing_writing_split_type = object.drawing_writing_split_type;
            }
            if (object.sub_questions) {
                if (!$Array.isArray(object.sub_questions))
                    throw $TypeError(".candidate_http.CandidateItemProto.sub_questions: array expected");
                message.sub_questions = $Array(object.sub_questions.length);
                for (let i = 0; i < object.sub_questions.length; ++i) {
                    if (!$util.isObject(object.sub_questions[i]))
                        throw $TypeError(".candidate_http.CandidateItemProto.sub_questions: object expected");
                    message.sub_questions[i] = $root.candidate_http.SubQuestion.fromObject(object.sub_questions[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CandidateItemProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {candidate_http.CandidateItemProto} message CandidateItemProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateItemProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.options = [];
                object.stems = [];
                object.possible_responses = [];
                object.response_positions = [];
                object.distractors = [];
                object.responses = [];
                object.sub_questions = [];
            }
            if (options.defaults) {
                if (options.bytes === $String)
                    object.id = "";
                else {
                    object.id = [];
                    if (options.bytes !== $Array)
                        object.id = $util.newBuffer(object.id);
                }
                object.reference = "";
                object.stimulus = "";
                object.item_type = options.enums === $String ? "MCQ" : 0;
                object.numerical = false;
                object.case_sensitive = false;
                object.shuffle_options = false;
                object.multiple_response = false;
                object.max_words = 0;
                object.max_length = 0;
                object.allow_paste = false;
                object.allow_copy = false;
                object.allow_cut = false;
                object.plain_text = false;
                object.revisit = false;
                object.max_responses = 0;
                object.allow_stop = false;
                object.allow_pause = false;
                object.beep_when_recording_starts = false;
                object.warn_overwrite = false;
                object.paper_response = false;
                object.max_duration = 0;
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = options.bytes === $String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.id) : message.id;
            if (message.passage_stimulus != null && $Object.hasOwnProperty.call(message, "passage_stimulus"))
                object.passage_stimulus = message.passage_stimulus;
            if (message.reference != null && $Object.hasOwnProperty.call(message, "reference"))
                object.reference = message.reference;
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                object.stimulus = message.stimulus;
            if (message.options && message.options.length) {
                object.options = $Array(message.options.length);
                for (let j = 0; j < message.options.length; ++j)
                    object.options[j] = $root.candidate_http.OptionDto.toObject(message.options[j], options, _depth + 1);
            }
            if (message.stems && message.stems.length) {
                object.stems = $Array(message.stems.length);
                for (let j = 0; j < message.stems.length; ++j)
                    object.stems[j] = message.stems[j];
            }
            if (message.possible_responses && message.possible_responses.length) {
                object.possible_responses = $Array(message.possible_responses.length);
                for (let j = 0; j < message.possible_responses.length; ++j)
                    object.possible_responses[j] = $root.candidate_http.PossibleResponseCandidate.toObject(message.possible_responses[j], options, _depth + 1);
            }
            if (message.response_positions && message.response_positions.length) {
                object.response_positions = $Array(message.response_positions.length);
                for (let j = 0; j < message.response_positions.length; ++j)
                    object.response_positions[j] = $root.candidate_http.ResponsePosition.toObject(message.response_positions[j], options, _depth + 1);
            }
            if (message.distractors && message.distractors.length) {
                object.distractors = $Array(message.distractors.length);
                for (let j = 0; j < message.distractors.length; ++j)
                    object.distractors[j] = $root.candidate_http.OptionDto.toObject(message.distractors[j], options, _depth + 1);
            }
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type"))
                object.item_type = options.enums === $String ? $root.candidate_http.ItemType[message.item_type] === $undefined ? message.item_type : $root.candidate_http.ItemType[message.item_type] : message.item_type;
            if (message.numerical != null && $Object.hasOwnProperty.call(message, "numerical"))
                object.numerical = message.numerical;
            if (message.case_sensitive != null && $Object.hasOwnProperty.call(message, "case_sensitive"))
                object.case_sensitive = message.case_sensitive;
            if (message.shuffle_options != null && $Object.hasOwnProperty.call(message, "shuffle_options"))
                object.shuffle_options = message.shuffle_options;
            if (message.multiple_response != null && $Object.hasOwnProperty.call(message, "multiple_response"))
                object.multiple_response = message.multiple_response;
            if (message.max_words != null && $Object.hasOwnProperty.call(message, "max_words"))
                object.max_words = message.max_words;
            if (message.max_length != null && $Object.hasOwnProperty.call(message, "max_length"))
                object.max_length = message.max_length;
            if (message.allow_paste != null && $Object.hasOwnProperty.call(message, "allow_paste"))
                object.allow_paste = message.allow_paste;
            if (message.allow_copy != null && $Object.hasOwnProperty.call(message, "allow_copy"))
                object.allow_copy = message.allow_copy;
            if (message.allow_cut != null && $Object.hasOwnProperty.call(message, "allow_cut"))
                object.allow_cut = message.allow_cut;
            if (message.plain_text != null && $Object.hasOwnProperty.call(message, "plain_text"))
                object.plain_text = message.plain_text;
            if (message.responses && message.responses.length) {
                object.responses = $Array(message.responses.length);
                for (let j = 0; j < message.responses.length; ++j)
                    object.responses[j] = message.responses[j];
            }
            if (message.revisit != null && $Object.hasOwnProperty.call(message, "revisit"))
                object.revisit = message.revisit;
            if (message.max_responses != null && $Object.hasOwnProperty.call(message, "max_responses"))
                object.max_responses = message.max_responses;
            if (message.image_data != null && $Object.hasOwnProperty.call(message, "image_data"))
                object.image_data = $root.candidate_http.ImageData.toObject(message.image_data, options, _depth + 1);
            if (message.allow_stop != null && $Object.hasOwnProperty.call(message, "allow_stop"))
                object.allow_stop = message.allow_stop;
            if (message.allow_pause != null && $Object.hasOwnProperty.call(message, "allow_pause"))
                object.allow_pause = message.allow_pause;
            if (message.beep_when_recording_starts != null && $Object.hasOwnProperty.call(message, "beep_when_recording_starts"))
                object.beep_when_recording_starts = message.beep_when_recording_starts;
            if (message.warn_overwrite != null && $Object.hasOwnProperty.call(message, "warn_overwrite"))
                object.warn_overwrite = message.warn_overwrite;
            if (message.paper_response != null && $Object.hasOwnProperty.call(message, "paper_response"))
                object.paper_response = message.paper_response;
            if (message.max_duration != null && $Object.hasOwnProperty.call(message, "max_duration"))
                object.max_duration = message.max_duration;
            if (message.background_type != null && $Object.hasOwnProperty.call(message, "background_type"))
                object.background_type = options.enums === $String ? $root.candidate_http.BackgroundType[message.background_type] === $undefined ? message.background_type : $root.candidate_http.BackgroundType[message.background_type] : message.background_type;
            if (message.drawing_writing_split_type != null && $Object.hasOwnProperty.call(message, "drawing_writing_split_type"))
                object.drawing_writing_split_type = options.enums === $String ? $root.candidate_http.DrawingWritingSplitType[message.drawing_writing_split_type] === $undefined ? message.drawing_writing_split_type : $root.candidate_http.DrawingWritingSplitType[message.drawing_writing_split_type] : message.drawing_writing_split_type;
            if (message.sub_questions && message.sub_questions.length) {
                object.sub_questions = $Array(message.sub_questions.length);
                for (let j = 0; j < message.sub_questions.length; ++j)
                    object.sub_questions[j] = $root.candidate_http.SubQuestion.toObject(message.sub_questions[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this CandidateItemProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateItemProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateItemProto.prototype.toJSON = function() {
            return CandidateItemProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateItemProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateItemProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateItemProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateItemProto";
        };

        return CandidateItemProto;
    })();

    candidate_http.CandidatePassageItemProto = (function() {

        /**
         * Properties of a CandidatePassageItemProto.
         * @typedef {Object} candidate_http.CandidatePassageItemProto.$Properties
         * @property {Uint8Array|null} [id] CandidatePassageItemProto id
         * @property {string|null} [stimulus] CandidatePassageItemProto stimulus
         * @property {Array.<candidate_http.CandidateItemProto.$Properties>|null} [items] CandidatePassageItemProto items
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidatePassageItemProto.
         * @memberof candidate_http
         * @interface ICandidatePassageItemProto
         * @augments candidate_http.CandidatePassageItemProto.$Properties
         * @deprecated Use candidate_http.CandidatePassageItemProto.$Properties instead.
         */

        /**
         * Shape of a CandidatePassageItemProto.
         * @typedef {candidate_http.CandidatePassageItemProto.$Properties} candidate_http.CandidatePassageItemProto.$Shape
         */

        /**
         * Constructs a new CandidatePassageItemProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidatePassageItemProto.
         * @constructor
         * @param {candidate_http.CandidatePassageItemProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidatePassageItemProto = function (properties) {
            this.items = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidatePassageItemProto id.
         * @member {Uint8Array} id
         * @memberof candidate_http.CandidatePassageItemProto
         * @instance
         */
        CandidatePassageItemProto.prototype.id = $util.newBuffer([]);

        /**
         * CandidatePassageItemProto stimulus.
         * @member {string} stimulus
         * @memberof candidate_http.CandidatePassageItemProto
         * @instance
         */
        CandidatePassageItemProto.prototype.stimulus = "";

        /**
         * CandidatePassageItemProto items.
         * @member {Array.<candidate_http.CandidateItemProto.$Properties>} items
         * @memberof candidate_http.CandidatePassageItemProto
         * @instance
         */
        CandidatePassageItemProto.prototype.items = $util.emptyArray;

        /**
         * Creates a new CandidatePassageItemProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {candidate_http.CandidatePassageItemProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidatePassageItemProto} CandidatePassageItemProto instance
         * @type {{
         *   (properties: candidate_http.CandidatePassageItemProto.$Shape): candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape;
         *   (properties?: candidate_http.CandidatePassageItemProto.$Properties): candidate_http.CandidatePassageItemProto;
         * }}
         */
        CandidatePassageItemProto.create = function(properties) {
            return new CandidatePassageItemProto(properties);
        };

        /**
         * Encodes the specified CandidatePassageItemProto message. Does not implicitly {@link candidate_http.CandidatePassageItemProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {candidate_http.CandidatePassageItemProto.$Properties} message CandidatePassageItemProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidatePassageItemProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus") && message.stimulus !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.stimulus);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.candidate_http.CandidateItemProto.encode(message.items[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidatePassageItemProto message, length delimited. Does not implicitly {@link candidate_http.CandidatePassageItemProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {candidate_http.CandidatePassageItemProto.$Properties} message CandidatePassageItemProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidatePassageItemProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidatePassageItemProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape} CandidatePassageItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidatePassageItemProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidatePassageItemProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.stimulus = value;
                        else
                            delete message.stimulus;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.candidate_http.CandidateItemProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidatePassageItemProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape} CandidatePassageItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidatePassageItemProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidatePassageItemProto message.
         * @function verify
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidatePassageItemProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                    return "id: buffer expected";
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                if (!$util.isString(message.stimulus))
                    return "stimulus: string expected";
            if (message.items != null && $Object.hasOwnProperty.call(message, "items")) {
                if (!$Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.candidate_http.CandidateItemProto.verify(message.items[i], _depth + 1);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CandidatePassageItemProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidatePassageItemProto} CandidatePassageItemProto
         */
        CandidatePassageItemProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidatePassageItemProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidatePassageItemProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidatePassageItemProto();
            if (object.id != null)
                if (object.id.length)
                    if (typeof object.id === "string")
                        $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                    else if (object.id.length >= 0)
                        message.id = object.id;
            if (object.stimulus != null)
                if (typeof object.stimulus !== "string" || object.stimulus.length)
                    message.stimulus = $String(object.stimulus);
            if (object.items) {
                if (!$Array.isArray(object.items))
                    throw $TypeError(".candidate_http.CandidatePassageItemProto.items: array expected");
                message.items = $Array(object.items.length);
                for (let i = 0; i < object.items.length; ++i) {
                    if (!$util.isObject(object.items[i]))
                        throw $TypeError(".candidate_http.CandidatePassageItemProto.items: object expected");
                    message.items[i] = $root.candidate_http.CandidateItemProto.fromObject(object.items[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CandidatePassageItemProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {candidate_http.CandidatePassageItemProto} message CandidatePassageItemProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidatePassageItemProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults) {
                if (options.bytes === $String)
                    object.id = "";
                else {
                    object.id = [];
                    if (options.bytes !== $Array)
                        object.id = $util.newBuffer(object.id);
                }
                object.stimulus = "";
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = options.bytes === $String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.id) : message.id;
            if (message.stimulus != null && $Object.hasOwnProperty.call(message, "stimulus"))
                object.stimulus = message.stimulus;
            if (message.items && message.items.length) {
                object.items = $Array(message.items.length);
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.candidate_http.CandidateItemProto.toObject(message.items[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this CandidatePassageItemProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidatePassageItemProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidatePassageItemProto.prototype.toJSON = function() {
            return CandidatePassageItemProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidatePassageItemProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidatePassageItemProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidatePassageItemProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidatePassageItemProto";
        };

        return CandidatePassageItemProto;
    })();

    candidate_http.CandidateAutoSaveHttpProto = (function() {

        /**
         * Properties of a CandidateAutoSaveHttpProto.
         * @typedef {Object} candidate_http.CandidateAutoSaveHttpProto.$Properties
         * @property {Object.<string,candidate_http.SectionItemsProto.$Properties>|null} [sections_map] CandidateAutoSaveHttpProto sections_map
         * @property {Object.<string,candidate_http.SectionTimesHttpProto.$Properties>|null} [section_times] CandidateAutoSaveHttpProto section_times
         * @property {number|null} [minutes] CandidateAutoSaveHttpProto minutes
         * @property {number|null} [seconds] CandidateAutoSaveHttpProto seconds
         * @property {number|Long|null} [cand_id] CandidateAutoSaveHttpProto cand_id
         * @property {candidate_http.BatteryStatusProto.$Properties|null} [battery_status] CandidateAutoSaveHttpProto battery_status
         * @property {Array.<candidate_http.CandidateClientEventProto.$Properties>|null} [pending_events] CandidateAutoSaveHttpProto pending_events
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateAutoSaveHttpProto.
         * @memberof candidate_http
         * @interface ICandidateAutoSaveHttpProto
         * @augments candidate_http.CandidateAutoSaveHttpProto.$Properties
         * @deprecated Use candidate_http.CandidateAutoSaveHttpProto.$Properties instead.
         */

        /**
         * Shape of a CandidateAutoSaveHttpProto.
         * @typedef {{
         *   sections_map?: Object.<string,candidate_http.SectionItemsProto.$Shape>|null;
         *   section_times?: Object.<string,candidate_http.SectionTimesHttpProto.$Shape>|null;
         *   minutes?: number|null;
         *   seconds?: number|null;
         *   cand_id?: number|Long|null;
         *   battery_status?: candidate_http.BatteryStatusProto.$Shape|null;
         *   pending_events?: Array.<candidate_http.CandidateClientEventProto.$Shape>|null;
         *   $unknowns?: Array.<Uint8Array>;
         * }} candidate_http.CandidateAutoSaveHttpProto.$Shape
         */

        /**
         * Constructs a new CandidateAutoSaveHttpProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateAutoSaveHttpProto.
         * @constructor
         * @param {candidate_http.CandidateAutoSaveHttpProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateAutoSaveHttpProto = function (properties) {
            this.sections_map = {};
            this.section_times = {};
            this.pending_events = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateAutoSaveHttpProto sections_map.
         * @member {Object.<string,candidate_http.SectionItemsProto.$Properties>} sections_map
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.sections_map = $util.emptyObject;

        /**
         * CandidateAutoSaveHttpProto section_times.
         * @member {Object.<string,candidate_http.SectionTimesHttpProto.$Properties>} section_times
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.section_times = $util.emptyObject;

        /**
         * CandidateAutoSaveHttpProto minutes.
         * @member {number} minutes
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.minutes = 0;

        /**
         * CandidateAutoSaveHttpProto seconds.
         * @member {number} seconds
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.seconds = 0;

        /**
         * CandidateAutoSaveHttpProto cand_id.
         * @member {number|Long} cand_id
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.cand_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CandidateAutoSaveHttpProto battery_status.
         * @member {candidate_http.BatteryStatusProto.$Properties|null|undefined} battery_status
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.battery_status = null;

        /**
         * CandidateAutoSaveHttpProto pending_events.
         * @member {Array.<candidate_http.CandidateClientEventProto.$Properties>} pending_events
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         */
        CandidateAutoSaveHttpProto.prototype.pending_events = $util.emptyArray;

        /**
         * Creates a new CandidateAutoSaveHttpProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveHttpProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateAutoSaveHttpProto} CandidateAutoSaveHttpProto instance
         * @type {{
         *   (properties: candidate_http.CandidateAutoSaveHttpProto.$Shape): candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape;
         *   (properties?: candidate_http.CandidateAutoSaveHttpProto.$Properties): candidate_http.CandidateAutoSaveHttpProto;
         * }}
         */
        CandidateAutoSaveHttpProto.create = function(properties) {
            return new CandidateAutoSaveHttpProto(properties);
        };

        /**
         * Encodes the specified CandidateAutoSaveHttpProto message. Does not implicitly {@link candidate_http.CandidateAutoSaveHttpProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveHttpProto.$Properties} message CandidateAutoSaveHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAutoSaveHttpProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sections_map != null && $Object.hasOwnProperty.call(message, "sections_map"))
                for (let keys = $Object.keys(message.sections_map), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.candidate_http.SectionItemsProto.encode(message.sections_map[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim().ldelim();
                }
            if (message.section_times != null && $Object.hasOwnProperty.call(message, "section_times"))
                for (let keys = $Object.keys(message.section_times), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.candidate_http.SectionTimesHttpProto.encode(message.section_times[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim().ldelim();
                }
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes") && message.minutes !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minutes);
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds") && message.seconds !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.seconds);
            if (message.cand_id != null && $Object.hasOwnProperty.call(message, "cand_id") && (typeof message.cand_id === "object" ? message.cand_id.low || message.cand_id.high : message.cand_id !== 0))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.cand_id);
            if (message.battery_status != null && $Object.hasOwnProperty.call(message, "battery_status"))
                $root.candidate_http.BatteryStatusProto.encode(message.battery_status, writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
            if (message.pending_events != null && message.pending_events.length)
                for (let i = 0; i < message.pending_events.length; ++i)
                    $root.candidate_http.CandidateClientEventProto.encode(message.pending_events[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateAutoSaveHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAutoSaveHttpProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveHttpProto.$Properties} message CandidateAutoSaveHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAutoSaveHttpProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateAutoSaveHttpProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape} CandidateAutoSaveHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAutoSaveHttpProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateAutoSaveHttpProto(), key, value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (message.sections_map === $util.emptyObject)
                            message.sections_map = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 2)
                                    break;
                                key = reader.stringVerify();
                                continue;
                            case 2:
                                if (wireType !== 2)
                                    break;
                                value = $root.candidate_http.SectionItemsProto.decode(reader, reader.uint32(), $undefined, _depth + 1);
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.sections_map, key);
                        message.sections_map[key] = value || new $root.candidate_http.SectionItemsProto();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (message.section_times === $util.emptyObject)
                            message.section_times = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 2)
                                    break;
                                key = reader.stringVerify();
                                continue;
                            case 2:
                                if (wireType !== 2)
                                    break;
                                value = $root.candidate_http.SectionTimesHttpProto.decode(reader, reader.uint32(), $undefined, _depth + 1);
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.section_times, key);
                        message.section_times[key] = value || new $root.candidate_http.SectionTimesHttpProto();
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.minutes = value;
                        else
                            delete message.minutes;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.seconds = value;
                        else
                            delete message.seconds;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.cand_id = value;
                        else
                            delete message.cand_id;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        message.battery_status = $root.candidate_http.BatteryStatusProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.battery_status);
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if (!(message.pending_events && message.pending_events.length))
                            message.pending_events = [];
                        message.pending_events.push($root.candidate_http.CandidateClientEventProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateAutoSaveHttpProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape} CandidateAutoSaveHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAutoSaveHttpProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateAutoSaveHttpProto message.
         * @function verify
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateAutoSaveHttpProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sections_map != null && $Object.hasOwnProperty.call(message, "sections_map")) {
                if (!$util.isObject(message.sections_map))
                    return "sections_map: object expected";
                let key = $Object.keys(message.sections_map);
                for (let i = 0; i < key.length; ++i) {
                    let error = $root.candidate_http.SectionItemsProto.verify(message.sections_map[key[i]], _depth + 1);
                    if (error)
                        return "sections_map." + error;
                }
            }
            if (message.section_times != null && $Object.hasOwnProperty.call(message, "section_times")) {
                if (!$util.isObject(message.section_times))
                    return "section_times: object expected";
                let key = $Object.keys(message.section_times);
                for (let i = 0; i < key.length; ++i) {
                    let error = $root.candidate_http.SectionTimesHttpProto.verify(message.section_times[key[i]], _depth + 1);
                    if (error)
                        return "section_times." + error;
                }
            }
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes"))
                if (!$util.isInteger(message.minutes))
                    return "minutes: integer expected";
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                if (!$util.isInteger(message.seconds))
                    return "seconds: integer expected";
            if (message.cand_id != null && $Object.hasOwnProperty.call(message, "cand_id"))
                if (!$util.isInteger(message.cand_id) && !(message.cand_id && $util.isInteger(message.cand_id.low) && $util.isInteger(message.cand_id.high)))
                    return "cand_id: integer|Long expected";
            if (message.battery_status != null && $Object.hasOwnProperty.call(message, "battery_status")) {
                let error = $root.candidate_http.BatteryStatusProto.verify(message.battery_status, _depth + 1);
                if (error)
                    return "battery_status." + error;
            }
            if (message.pending_events != null && $Object.hasOwnProperty.call(message, "pending_events")) {
                if (!$Array.isArray(message.pending_events))
                    return "pending_events: array expected";
                for (let i = 0; i < message.pending_events.length; ++i) {
                    let error = $root.candidate_http.CandidateClientEventProto.verify(message.pending_events[i], _depth + 1);
                    if (error)
                        return "pending_events." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CandidateAutoSaveHttpProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateAutoSaveHttpProto} CandidateAutoSaveHttpProto
         */
        CandidateAutoSaveHttpProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateAutoSaveHttpProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateAutoSaveHttpProto();
            if (object.sections_map) {
                if (!$util.isObject(object.sections_map))
                    throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.sections_map: object expected");
                message.sections_map = {};
                for (let keys = $Object.keys(object.sections_map), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.sections_map, keys[i]);
                    if (!$util.isObject(object.sections_map[keys[i]]))
                        throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.sections_map: object expected");
                    message.sections_map[keys[i]] = $root.candidate_http.SectionItemsProto.fromObject(object.sections_map[keys[i]], _depth + 1);
                }
            }
            if (object.section_times) {
                if (!$util.isObject(object.section_times))
                    throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.section_times: object expected");
                message.section_times = {};
                for (let keys = $Object.keys(object.section_times), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.section_times, keys[i]);
                    if (!$util.isObject(object.section_times[keys[i]]))
                        throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.section_times: object expected");
                    message.section_times[keys[i]] = $root.candidate_http.SectionTimesHttpProto.fromObject(object.section_times[keys[i]], _depth + 1);
                }
            }
            if (object.minutes != null)
                if ($Number(object.minutes) !== 0)
                    message.minutes = object.minutes | 0;
            if (object.seconds != null)
                if ($Number(object.seconds) !== 0)
                    message.seconds = object.seconds | 0;
            if (object.cand_id != null)
                if (typeof object.cand_id === "object" ? object.cand_id.low || object.cand_id.high : $Number(object.cand_id) !== 0)
                    if ($util.Long)
                        message.cand_id = $util.Long.fromValue(object.cand_id, false);
                    else if (typeof object.cand_id === "string")
                        message.cand_id = $parseInt(object.cand_id, 10);
                    else if (typeof object.cand_id === "number")
                        message.cand_id = object.cand_id;
                    else if (typeof object.cand_id === "object")
                        message.cand_id = new $util.LongBits(object.cand_id.low >>> 0, object.cand_id.high >>> 0).toNumber();
            if (object.battery_status != null) {
                if (!$util.isObject(object.battery_status))
                    throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.battery_status: object expected");
                message.battery_status = $root.candidate_http.BatteryStatusProto.fromObject(object.battery_status, _depth + 1);
            }
            if (object.pending_events) {
                if (!$Array.isArray(object.pending_events))
                    throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.pending_events: array expected");
                message.pending_events = $Array(object.pending_events.length);
                for (let i = 0; i < object.pending_events.length; ++i) {
                    if (!$util.isObject(object.pending_events[i]))
                        throw $TypeError(".candidate_http.CandidateAutoSaveHttpProto.pending_events: object expected");
                    message.pending_events[i] = $root.candidate_http.CandidateClientEventProto.fromObject(object.pending_events[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CandidateAutoSaveHttpProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveHttpProto} message CandidateAutoSaveHttpProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateAutoSaveHttpProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.pending_events = [];
            if (options.objects || options.defaults) {
                object.sections_map = {};
                object.section_times = {};
            }
            if (options.defaults) {
                object.minutes = 0;
                object.seconds = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.cand_id = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.cand_id = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.battery_status = null;
            }
            let keys2;
            if (message.sections_map && (keys2 = $Object.keys(message.sections_map)).length) {
                object.sections_map = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.sections_map, keys2[j]);
                    object.sections_map[keys2[j]] = $root.candidate_http.SectionItemsProto.toObject(message.sections_map[keys2[j]], options, _depth + 1);
                }
            }
            if (message.section_times && (keys2 = $Object.keys(message.section_times)).length) {
                object.section_times = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.section_times, keys2[j]);
                    object.section_times[keys2[j]] = $root.candidate_http.SectionTimesHttpProto.toObject(message.section_times[keys2[j]], options, _depth + 1);
                }
            }
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes"))
                object.minutes = message.minutes;
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                object.seconds = message.seconds;
            if (message.cand_id != null && $Object.hasOwnProperty.call(message, "cand_id"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.cand_id = typeof message.cand_id === "number" ? $BigInt(message.cand_id) : $util.Long.fromBits(message.cand_id.low >>> 0, message.cand_id.high >>> 0, false).toBigInt();
                else if (typeof message.cand_id === "number")
                    object.cand_id = options.longs === $String ? $String(message.cand_id) : message.cand_id;
                else
                    object.cand_id = options.longs === $String ? $util.Long.prototype.toString.call(message.cand_id) : options.longs === $Number ? new $util.LongBits(message.cand_id.low >>> 0, message.cand_id.high >>> 0).toNumber() : message.cand_id;
            if (message.battery_status != null && $Object.hasOwnProperty.call(message, "battery_status"))
                object.battery_status = $root.candidate_http.BatteryStatusProto.toObject(message.battery_status, options, _depth + 1);
            if (message.pending_events && message.pending_events.length) {
                object.pending_events = $Array(message.pending_events.length);
                for (let j = 0; j < message.pending_events.length; ++j)
                    object.pending_events[j] = $root.candidate_http.CandidateClientEventProto.toObject(message.pending_events[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this CandidateAutoSaveHttpProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateAutoSaveHttpProto.prototype.toJSON = function() {
            return CandidateAutoSaveHttpProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateAutoSaveHttpProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateAutoSaveHttpProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateAutoSaveHttpProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateAutoSaveHttpProto";
        };

        return CandidateAutoSaveHttpProto;
    })();

    candidate_http.SectionItemsProto = (function() {

        /**
         * Properties of a SectionItemsProto.
         * @typedef {Object} candidate_http.SectionItemsProto.$Properties
         * @property {Array.<candidate_http.CandidateAutoSaveItemHttpProto.$Properties>|null} [items] SectionItemsProto items
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SectionItemsProto.
         * @memberof candidate_http
         * @interface ISectionItemsProto
         * @augments candidate_http.SectionItemsProto.$Properties
         * @deprecated Use candidate_http.SectionItemsProto.$Properties instead.
         */

        /**
         * Shape of a SectionItemsProto.
         * @typedef {candidate_http.SectionItemsProto.$Properties} candidate_http.SectionItemsProto.$Shape
         */

        /**
         * Constructs a new SectionItemsProto.
         * @memberof candidate_http
         * @classdesc Represents a SectionItemsProto.
         * @constructor
         * @param {candidate_http.SectionItemsProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SectionItemsProto = function (properties) {
            this.items = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * SectionItemsProto items.
         * @member {Array.<candidate_http.CandidateAutoSaveItemHttpProto.$Properties>} items
         * @memberof candidate_http.SectionItemsProto
         * @instance
         */
        SectionItemsProto.prototype.items = $util.emptyArray;

        /**
         * Creates a new SectionItemsProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {candidate_http.SectionItemsProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.SectionItemsProto} SectionItemsProto instance
         * @type {{
         *   (properties: candidate_http.SectionItemsProto.$Shape): candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape;
         *   (properties?: candidate_http.SectionItemsProto.$Properties): candidate_http.SectionItemsProto;
         * }}
         */
        SectionItemsProto.create = function(properties) {
            return new SectionItemsProto(properties);
        };

        /**
         * Encodes the specified SectionItemsProto message. Does not implicitly {@link candidate_http.SectionItemsProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {candidate_http.SectionItemsProto.$Properties} message SectionItemsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SectionItemsProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.candidate_http.CandidateAutoSaveItemHttpProto.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SectionItemsProto message, length delimited. Does not implicitly {@link candidate_http.SectionItemsProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {candidate_http.SectionItemsProto.$Properties} message SectionItemsProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SectionItemsProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SectionItemsProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape} SectionItemsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SectionItemsProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.SectionItemsProto();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.candidate_http.CandidateAutoSaveItemHttpProto.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SectionItemsProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape} SectionItemsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SectionItemsProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SectionItemsProto message.
         * @function verify
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SectionItemsProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.items != null && $Object.hasOwnProperty.call(message, "items")) {
                if (!$Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.candidate_http.CandidateAutoSaveItemHttpProto.verify(message.items[i], _depth + 1);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SectionItemsProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.SectionItemsProto} SectionItemsProto
         */
        SectionItemsProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.SectionItemsProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.SectionItemsProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.SectionItemsProto();
            if (object.items) {
                if (!$Array.isArray(object.items))
                    throw $TypeError(".candidate_http.SectionItemsProto.items: array expected");
                message.items = $Array(object.items.length);
                for (let i = 0; i < object.items.length; ++i) {
                    if (!$util.isObject(object.items[i]))
                        throw $TypeError(".candidate_http.SectionItemsProto.items: object expected");
                    message.items[i] = $root.candidate_http.CandidateAutoSaveItemHttpProto.fromObject(object.items[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SectionItemsProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {candidate_http.SectionItemsProto} message SectionItemsProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SectionItemsProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = $Array(message.items.length);
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.candidate_http.CandidateAutoSaveItemHttpProto.toObject(message.items[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this SectionItemsProto to JSON.
         * @function toJSON
         * @memberof candidate_http.SectionItemsProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SectionItemsProto.prototype.toJSON = function() {
            return SectionItemsProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SectionItemsProto
         * @function getTypeUrl
         * @memberof candidate_http.SectionItemsProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SectionItemsProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.SectionItemsProto";
        };

        return SectionItemsProto;
    })();

    candidate_http.SectionTimesHttpProto = (function() {

        /**
         * Properties of a SectionTimesHttpProto.
         * @typedef {Object} candidate_http.SectionTimesHttpProto.$Properties
         * @property {number|null} [minutes] SectionTimesHttpProto minutes
         * @property {number|null} [seconds] SectionTimesHttpProto seconds
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SectionTimesHttpProto.
         * @memberof candidate_http
         * @interface ISectionTimesHttpProto
         * @augments candidate_http.SectionTimesHttpProto.$Properties
         * @deprecated Use candidate_http.SectionTimesHttpProto.$Properties instead.
         */

        /**
         * Shape of a SectionTimesHttpProto.
         * @typedef {candidate_http.SectionTimesHttpProto.$Properties} candidate_http.SectionTimesHttpProto.$Shape
         */

        /**
         * Constructs a new SectionTimesHttpProto.
         * @memberof candidate_http
         * @classdesc Represents a SectionTimesHttpProto.
         * @constructor
         * @param {candidate_http.SectionTimesHttpProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SectionTimesHttpProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * SectionTimesHttpProto minutes.
         * @member {number} minutes
         * @memberof candidate_http.SectionTimesHttpProto
         * @instance
         */
        SectionTimesHttpProto.prototype.minutes = 0;

        /**
         * SectionTimesHttpProto seconds.
         * @member {number} seconds
         * @memberof candidate_http.SectionTimesHttpProto
         * @instance
         */
        SectionTimesHttpProto.prototype.seconds = 0;

        /**
         * Creates a new SectionTimesHttpProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {candidate_http.SectionTimesHttpProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.SectionTimesHttpProto} SectionTimesHttpProto instance
         * @type {{
         *   (properties: candidate_http.SectionTimesHttpProto.$Shape): candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape;
         *   (properties?: candidate_http.SectionTimesHttpProto.$Properties): candidate_http.SectionTimesHttpProto;
         * }}
         */
        SectionTimesHttpProto.create = function(properties) {
            return new SectionTimesHttpProto(properties);
        };

        /**
         * Encodes the specified SectionTimesHttpProto message. Does not implicitly {@link candidate_http.SectionTimesHttpProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {candidate_http.SectionTimesHttpProto.$Properties} message SectionTimesHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SectionTimesHttpProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes") && message.minutes !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.minutes);
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds") && message.seconds !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seconds);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SectionTimesHttpProto message, length delimited. Does not implicitly {@link candidate_http.SectionTimesHttpProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {candidate_http.SectionTimesHttpProto.$Properties} message SectionTimesHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SectionTimesHttpProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SectionTimesHttpProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape} SectionTimesHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SectionTimesHttpProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.SectionTimesHttpProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.minutes = value;
                        else
                            delete message.minutes;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.seconds = value;
                        else
                            delete message.seconds;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SectionTimesHttpProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape} SectionTimesHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SectionTimesHttpProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SectionTimesHttpProto message.
         * @function verify
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SectionTimesHttpProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes"))
                if (!$util.isInteger(message.minutes))
                    return "minutes: integer expected";
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                if (!$util.isInteger(message.seconds))
                    return "seconds: integer expected";
            return null;
        };

        /**
         * Creates a SectionTimesHttpProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.SectionTimesHttpProto} SectionTimesHttpProto
         */
        SectionTimesHttpProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.SectionTimesHttpProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.SectionTimesHttpProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.SectionTimesHttpProto();
            if (object.minutes != null)
                if ($Number(object.minutes) !== 0)
                    message.minutes = object.minutes | 0;
            if (object.seconds != null)
                if ($Number(object.seconds) !== 0)
                    message.seconds = object.seconds | 0;
            return message;
        };

        /**
         * Creates a plain object from a SectionTimesHttpProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {candidate_http.SectionTimesHttpProto} message SectionTimesHttpProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SectionTimesHttpProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.minutes = 0;
                object.seconds = 0;
            }
            if (message.minutes != null && $Object.hasOwnProperty.call(message, "minutes"))
                object.minutes = message.minutes;
            if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                object.seconds = message.seconds;
            return object;
        };

        /**
         * Converts this SectionTimesHttpProto to JSON.
         * @function toJSON
         * @memberof candidate_http.SectionTimesHttpProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SectionTimesHttpProto.prototype.toJSON = function() {
            return SectionTimesHttpProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SectionTimesHttpProto
         * @function getTypeUrl
         * @memberof candidate_http.SectionTimesHttpProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SectionTimesHttpProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.SectionTimesHttpProto";
        };

        return SectionTimesHttpProto;
    })();

    candidate_http.CandidateAutoSaveItemHttpProto = (function() {

        /**
         * Properties of a CandidateAutoSaveItemHttpProto.
         * @typedef {Object} candidate_http.CandidateAutoSaveItemHttpProto.$Properties
         * @property {Uint8Array|null} [item_id] CandidateAutoSaveItemHttpProto item_id
         * @property {number|Long|null} [blk_id] CandidateAutoSaveItemHttpProto blk_id
         * @property {Array.<string>|null} [answers] CandidateAutoSaveItemHttpProto answers
         * @property {boolean|null} [revisit_later] CandidateAutoSaveItemHttpProto revisit_later
         * @property {string|null} [item_type] CandidateAutoSaveItemHttpProto item_type
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateAutoSaveItemHttpProto.
         * @memberof candidate_http
         * @interface ICandidateAutoSaveItemHttpProto
         * @augments candidate_http.CandidateAutoSaveItemHttpProto.$Properties
         * @deprecated Use candidate_http.CandidateAutoSaveItemHttpProto.$Properties instead.
         */

        /**
         * Shape of a CandidateAutoSaveItemHttpProto.
         * @typedef {candidate_http.CandidateAutoSaveItemHttpProto.$Properties} candidate_http.CandidateAutoSaveItemHttpProto.$Shape
         */

        /**
         * Constructs a new CandidateAutoSaveItemHttpProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateAutoSaveItemHttpProto.
         * @constructor
         * @param {candidate_http.CandidateAutoSaveItemHttpProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateAutoSaveItemHttpProto = function (properties) {
            this.answers = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateAutoSaveItemHttpProto item_id.
         * @member {Uint8Array} item_id
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         */
        CandidateAutoSaveItemHttpProto.prototype.item_id = $util.newBuffer([]);

        /**
         * CandidateAutoSaveItemHttpProto blk_id.
         * @member {number|Long} blk_id
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         */
        CandidateAutoSaveItemHttpProto.prototype.blk_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CandidateAutoSaveItemHttpProto answers.
         * @member {Array.<string>} answers
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         */
        CandidateAutoSaveItemHttpProto.prototype.answers = $util.emptyArray;

        /**
         * CandidateAutoSaveItemHttpProto revisit_later.
         * @member {boolean} revisit_later
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         */
        CandidateAutoSaveItemHttpProto.prototype.revisit_later = false;

        /**
         * CandidateAutoSaveItemHttpProto item_type.
         * @member {string} item_type
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         */
        CandidateAutoSaveItemHttpProto.prototype.item_type = "";

        /**
         * Creates a new CandidateAutoSaveItemHttpProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveItemHttpProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto} CandidateAutoSaveItemHttpProto instance
         * @type {{
         *   (properties: candidate_http.CandidateAutoSaveItemHttpProto.$Shape): candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape;
         *   (properties?: candidate_http.CandidateAutoSaveItemHttpProto.$Properties): candidate_http.CandidateAutoSaveItemHttpProto;
         * }}
         */
        CandidateAutoSaveItemHttpProto.create = function(properties) {
            return new CandidateAutoSaveItemHttpProto(properties);
        };

        /**
         * Encodes the specified CandidateAutoSaveItemHttpProto message. Does not implicitly {@link candidate_http.CandidateAutoSaveItemHttpProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveItemHttpProto.$Properties} message CandidateAutoSaveItemHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAutoSaveItemHttpProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.item_id != null && $Object.hasOwnProperty.call(message, "item_id") && message.item_id.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.item_id);
            if (message.blk_id != null && $Object.hasOwnProperty.call(message, "blk_id") && (typeof message.blk_id === "object" ? message.blk_id.low || message.blk_id.high : message.blk_id !== 0))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.blk_id);
            if (message.answers != null && message.answers.length)
                for (let i = 0; i < message.answers.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.answers[i]);
            if (message.revisit_later != null && $Object.hasOwnProperty.call(message, "revisit_later") && message.revisit_later !== false)
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.revisit_later);
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type") && message.item_type !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.item_type);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateAutoSaveItemHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAutoSaveItemHttpProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveItemHttpProto.$Properties} message CandidateAutoSaveItemHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateAutoSaveItemHttpProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateAutoSaveItemHttpProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape} CandidateAutoSaveItemHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAutoSaveItemHttpProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateAutoSaveItemHttpProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.item_id = value;
                        else
                            delete message.item_id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.blk_id = value;
                        else
                            delete message.blk_id;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if (!(message.answers && message.answers.length))
                            message.answers = [];
                        message.answers.push(reader.stringVerify());
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.revisit_later = value;
                        else
                            delete message.revisit_later;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.item_type = value;
                        else
                            delete message.item_type;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateAutoSaveItemHttpProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape} CandidateAutoSaveItemHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateAutoSaveItemHttpProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateAutoSaveItemHttpProto message.
         * @function verify
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateAutoSaveItemHttpProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.item_id != null && $Object.hasOwnProperty.call(message, "item_id"))
                if (!(message.item_id && typeof message.item_id.length === "number" || $util.isString(message.item_id)))
                    return "item_id: buffer expected";
            if (message.blk_id != null && $Object.hasOwnProperty.call(message, "blk_id"))
                if (!$util.isInteger(message.blk_id) && !(message.blk_id && $util.isInteger(message.blk_id.low) && $util.isInteger(message.blk_id.high)))
                    return "blk_id: integer|Long expected";
            if (message.answers != null && $Object.hasOwnProperty.call(message, "answers")) {
                if (!$Array.isArray(message.answers))
                    return "answers: array expected";
                for (let i = 0; i < message.answers.length; ++i)
                    if (!$util.isString(message.answers[i]))
                        return "answers: string[] expected";
            }
            if (message.revisit_later != null && $Object.hasOwnProperty.call(message, "revisit_later"))
                if (typeof message.revisit_later !== "boolean")
                    return "revisit_later: boolean expected";
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type"))
                if (!$util.isString(message.item_type))
                    return "item_type: string expected";
            return null;
        };

        /**
         * Creates a CandidateAutoSaveItemHttpProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto} CandidateAutoSaveItemHttpProto
         */
        CandidateAutoSaveItemHttpProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateAutoSaveItemHttpProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateAutoSaveItemHttpProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateAutoSaveItemHttpProto();
            if (object.item_id != null)
                if (object.item_id.length)
                    if (typeof object.item_id === "string")
                        $util.base64.decode(object.item_id, message.item_id = $util.newBuffer($util.base64.length(object.item_id)), 0);
                    else if (object.item_id.length >= 0)
                        message.item_id = object.item_id;
            if (object.blk_id != null)
                if (typeof object.blk_id === "object" ? object.blk_id.low || object.blk_id.high : $Number(object.blk_id) !== 0)
                    if ($util.Long)
                        message.blk_id = $util.Long.fromValue(object.blk_id, false);
                    else if (typeof object.blk_id === "string")
                        message.blk_id = $parseInt(object.blk_id, 10);
                    else if (typeof object.blk_id === "number")
                        message.blk_id = object.blk_id;
                    else if (typeof object.blk_id === "object")
                        message.blk_id = new $util.LongBits(object.blk_id.low >>> 0, object.blk_id.high >>> 0).toNumber();
            if (object.answers) {
                if (!$Array.isArray(object.answers))
                    throw $TypeError(".candidate_http.CandidateAutoSaveItemHttpProto.answers: array expected");
                message.answers = $Array(object.answers.length);
                for (let i = 0; i < object.answers.length; ++i)
                    message.answers[i] = $String(object.answers[i]);
            }
            if (object.revisit_later != null)
                if (object.revisit_later)
                    message.revisit_later = $Boolean(object.revisit_later);
            if (object.item_type != null)
                if (typeof object.item_type !== "string" || object.item_type.length)
                    message.item_type = $String(object.item_type);
            return message;
        };

        /**
         * Creates a plain object from a CandidateAutoSaveItemHttpProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {candidate_http.CandidateAutoSaveItemHttpProto} message CandidateAutoSaveItemHttpProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateAutoSaveItemHttpProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.answers = [];
            if (options.defaults) {
                if (options.bytes === $String)
                    object.item_id = "";
                else {
                    object.item_id = [];
                    if (options.bytes !== $Array)
                        object.item_id = $util.newBuffer(object.item_id);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.blk_id = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.blk_id = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.revisit_later = false;
                object.item_type = "";
            }
            if (message.item_id != null && $Object.hasOwnProperty.call(message, "item_id"))
                object.item_id = options.bytes === $String ? $util.base64.encode(message.item_id, 0, message.item_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.item_id) : message.item_id;
            if (message.blk_id != null && $Object.hasOwnProperty.call(message, "blk_id"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.blk_id = typeof message.blk_id === "number" ? $BigInt(message.blk_id) : $util.Long.fromBits(message.blk_id.low >>> 0, message.blk_id.high >>> 0, false).toBigInt();
                else if (typeof message.blk_id === "number")
                    object.blk_id = options.longs === $String ? $String(message.blk_id) : message.blk_id;
                else
                    object.blk_id = options.longs === $String ? $util.Long.prototype.toString.call(message.blk_id) : options.longs === $Number ? new $util.LongBits(message.blk_id.low >>> 0, message.blk_id.high >>> 0).toNumber() : message.blk_id;
            if (message.answers && message.answers.length) {
                object.answers = $Array(message.answers.length);
                for (let j = 0; j < message.answers.length; ++j)
                    object.answers[j] = message.answers[j];
            }
            if (message.revisit_later != null && $Object.hasOwnProperty.call(message, "revisit_later"))
                object.revisit_later = message.revisit_later;
            if (message.item_type != null && $Object.hasOwnProperty.call(message, "item_type"))
                object.item_type = message.item_type;
            return object;
        };

        /**
         * Converts this CandidateAutoSaveItemHttpProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateAutoSaveItemHttpProto.prototype.toJSON = function() {
            return CandidateAutoSaveItemHttpProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateAutoSaveItemHttpProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateAutoSaveItemHttpProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateAutoSaveItemHttpProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateAutoSaveItemHttpProto";
        };

        return CandidateAutoSaveItemHttpProto;
    })();

    candidate_http.BatteryStatusProto = (function() {

        /**
         * Properties of a BatteryStatusProto.
         * @typedef {Object} candidate_http.BatteryStatusProto.$Properties
         * @property {boolean|null} [none] BatteryStatusProto none
         * @property {candidate_http.BatteryChargeProto.$Properties|null} [charge] BatteryStatusProto charge
         * @property {"none"|"charge"} [status] BatteryStatusProto status
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a BatteryStatusProto.
         * @memberof candidate_http
         * @interface IBatteryStatusProto
         * @augments candidate_http.BatteryStatusProto.$Properties
         * @deprecated Use candidate_http.BatteryStatusProto.$Properties instead.
         */

        /**
         * Narrowed shape of a BatteryStatusProto.
         * @typedef {{
         *   none?: boolean|null;
         *   charge?: candidate_http.BatteryChargeProto.$Shape|null;
         *   $unknowns?: Array.<Uint8Array>;
         * } & (
         *   ({ status?: undefined; none?: null; charge?: null }|{ status?: "none"; none: boolean; charge?: null }|{ status?: "charge"; none?: null; charge: candidate_http.BatteryChargeProto.$Shape })
         * )} candidate_http.BatteryStatusProto.$Shape
         */

        /**
         * Constructs a new BatteryStatusProto.
         * @memberof candidate_http
         * @classdesc Represents a BatteryStatusProto.
         * @constructor
         * @param {candidate_http.BatteryStatusProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const BatteryStatusProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * BatteryStatusProto none.
         * @member {boolean|null|undefined} none
         * @memberof candidate_http.BatteryStatusProto
         * @instance
         */
        BatteryStatusProto.prototype.none = null;

        /**
         * BatteryStatusProto charge.
         * @member {candidate_http.BatteryChargeProto.$Properties|null|undefined} charge
         * @memberof candidate_http.BatteryStatusProto
         * @instance
         */
        BatteryStatusProto.prototype.charge = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * BatteryStatusProto status.
         * @member {"none"|"charge"|undefined} status
         * @memberof candidate_http.BatteryStatusProto
         * @instance
         */
        $Object.defineProperty(BatteryStatusProto.prototype, "status", {
            get: $util.oneOfGetter($oneOfFields = ["none", "charge"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new BatteryStatusProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {candidate_http.BatteryStatusProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.BatteryStatusProto} BatteryStatusProto instance
         * @type {{
         *   (properties: candidate_http.BatteryStatusProto.$Shape): candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape;
         *   (properties?: candidate_http.BatteryStatusProto.$Properties): candidate_http.BatteryStatusProto;
         * }}
         */
        BatteryStatusProto.create = function(properties) {
            return new BatteryStatusProto(properties);
        };

        /**
         * Encodes the specified BatteryStatusProto message. Does not implicitly {@link candidate_http.BatteryStatusProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {candidate_http.BatteryStatusProto.$Properties} message BatteryStatusProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatteryStatusProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.none != null && $Object.hasOwnProperty.call(message, "none"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.none);
            if (message.charge != null && $Object.hasOwnProperty.call(message, "charge"))
                $root.candidate_http.BatteryChargeProto.encode(message.charge, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified BatteryStatusProto message, length delimited. Does not implicitly {@link candidate_http.BatteryStatusProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {candidate_http.BatteryStatusProto.$Properties} message BatteryStatusProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatteryStatusProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a BatteryStatusProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape} BatteryStatusProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatteryStatusProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.BatteryStatusProto();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.none = reader.bool();
                        message.status = "none";
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.charge = $root.candidate_http.BatteryChargeProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.charge);
                        message.status = "charge";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a BatteryStatusProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape} BatteryStatusProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatteryStatusProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BatteryStatusProto message.
         * @function verify
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BatteryStatusProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.none != null && $Object.hasOwnProperty.call(message, "none")) {
                properties.status = 1;
                if (typeof message.none !== "boolean")
                    return "none: boolean expected";
            }
            if (message.charge != null && $Object.hasOwnProperty.call(message, "charge")) {
                if (properties.status === 1)
                    return "status: multiple values";
                properties.status = 1;
                {
                    let error = $root.candidate_http.BatteryChargeProto.verify(message.charge, _depth + 1);
                    if (error)
                        return "charge." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BatteryStatusProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.BatteryStatusProto} BatteryStatusProto
         */
        BatteryStatusProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.BatteryStatusProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.BatteryStatusProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.BatteryStatusProto();
            if (object.none != null)
                message.none = $Boolean(object.none);
            if (object.charge != null) {
                if (!$util.isObject(object.charge))
                    throw $TypeError(".candidate_http.BatteryStatusProto.charge: object expected");
                message.charge = $root.candidate_http.BatteryChargeProto.fromObject(object.charge, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a BatteryStatusProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {candidate_http.BatteryStatusProto} message BatteryStatusProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BatteryStatusProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (message.none != null && $Object.hasOwnProperty.call(message, "none")) {
                object.none = message.none;
                if (options.oneofs)
                    object.status = "none";
            }
            if (message.charge != null && $Object.hasOwnProperty.call(message, "charge")) {
                object.charge = $root.candidate_http.BatteryChargeProto.toObject(message.charge, options, _depth + 1);
                if (options.oneofs)
                    object.status = "charge";
            }
            return object;
        };

        /**
         * Converts this BatteryStatusProto to JSON.
         * @function toJSON
         * @memberof candidate_http.BatteryStatusProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BatteryStatusProto.prototype.toJSON = function() {
            return BatteryStatusProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for BatteryStatusProto
         * @function getTypeUrl
         * @memberof candidate_http.BatteryStatusProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        BatteryStatusProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.BatteryStatusProto";
        };

        return BatteryStatusProto;
    })();

    candidate_http.BatteryChargeProto = (function() {

        /**
         * Properties of a BatteryChargeProto.
         * @typedef {Object} candidate_http.BatteryChargeProto.$Properties
         * @property {number|null} [percentage] BatteryChargeProto percentage
         * @property {boolean|null} [charging] BatteryChargeProto charging
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a BatteryChargeProto.
         * @memberof candidate_http
         * @interface IBatteryChargeProto
         * @augments candidate_http.BatteryChargeProto.$Properties
         * @deprecated Use candidate_http.BatteryChargeProto.$Properties instead.
         */

        /**
         * Shape of a BatteryChargeProto.
         * @typedef {candidate_http.BatteryChargeProto.$Properties} candidate_http.BatteryChargeProto.$Shape
         */

        /**
         * Constructs a new BatteryChargeProto.
         * @memberof candidate_http
         * @classdesc Represents a BatteryChargeProto.
         * @constructor
         * @param {candidate_http.BatteryChargeProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const BatteryChargeProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * BatteryChargeProto percentage.
         * @member {number} percentage
         * @memberof candidate_http.BatteryChargeProto
         * @instance
         */
        BatteryChargeProto.prototype.percentage = 0;

        /**
         * BatteryChargeProto charging.
         * @member {boolean} charging
         * @memberof candidate_http.BatteryChargeProto
         * @instance
         */
        BatteryChargeProto.prototype.charging = false;

        /**
         * Creates a new BatteryChargeProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {candidate_http.BatteryChargeProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.BatteryChargeProto} BatteryChargeProto instance
         * @type {{
         *   (properties: candidate_http.BatteryChargeProto.$Shape): candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape;
         *   (properties?: candidate_http.BatteryChargeProto.$Properties): candidate_http.BatteryChargeProto;
         * }}
         */
        BatteryChargeProto.create = function(properties) {
            return new BatteryChargeProto(properties);
        };

        /**
         * Encodes the specified BatteryChargeProto message. Does not implicitly {@link candidate_http.BatteryChargeProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {candidate_http.BatteryChargeProto.$Properties} message BatteryChargeProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatteryChargeProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.percentage != null && $Object.hasOwnProperty.call(message, "percentage") && message.percentage !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.percentage);
            if (message.charging != null && $Object.hasOwnProperty.call(message, "charging") && message.charging !== false)
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.charging);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified BatteryChargeProto message, length delimited. Does not implicitly {@link candidate_http.BatteryChargeProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {candidate_http.BatteryChargeProto.$Properties} message BatteryChargeProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatteryChargeProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a BatteryChargeProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape} BatteryChargeProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatteryChargeProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.BatteryChargeProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.percentage = value;
                        else
                            delete message.percentage;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.charging = value;
                        else
                            delete message.charging;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a BatteryChargeProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape} BatteryChargeProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatteryChargeProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BatteryChargeProto message.
         * @function verify
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BatteryChargeProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.percentage != null && $Object.hasOwnProperty.call(message, "percentage"))
                if (!$util.isInteger(message.percentage))
                    return "percentage: integer expected";
            if (message.charging != null && $Object.hasOwnProperty.call(message, "charging"))
                if (typeof message.charging !== "boolean")
                    return "charging: boolean expected";
            return null;
        };

        /**
         * Creates a BatteryChargeProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.BatteryChargeProto} BatteryChargeProto
         */
        BatteryChargeProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.BatteryChargeProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.BatteryChargeProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.BatteryChargeProto();
            if (object.percentage != null)
                if ($Number(object.percentage) !== 0)
                    message.percentage = object.percentage | 0;
            if (object.charging != null)
                if (object.charging)
                    message.charging = $Boolean(object.charging);
            return message;
        };

        /**
         * Creates a plain object from a BatteryChargeProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {candidate_http.BatteryChargeProto} message BatteryChargeProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BatteryChargeProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.percentage = 0;
                object.charging = false;
            }
            if (message.percentage != null && $Object.hasOwnProperty.call(message, "percentage"))
                object.percentage = message.percentage;
            if (message.charging != null && $Object.hasOwnProperty.call(message, "charging"))
                object.charging = message.charging;
            return object;
        };

        /**
         * Converts this BatteryChargeProto to JSON.
         * @function toJSON
         * @memberof candidate_http.BatteryChargeProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BatteryChargeProto.prototype.toJSON = function() {
            return BatteryChargeProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for BatteryChargeProto
         * @function getTypeUrl
         * @memberof candidate_http.BatteryChargeProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        BatteryChargeProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.BatteryChargeProto";
        };

        return BatteryChargeProto;
    })();

    candidate_http.CandidateClientEventProto = (function() {

        /**
         * Properties of a CandidateClientEventProto.
         * @typedef {Object} candidate_http.CandidateClientEventProto.$Properties
         * @property {Uint8Array|null} [event_id] CandidateClientEventProto event_id
         * @property {Uint8Array|null} [events_session_id] CandidateClientEventProto events_session_id
         * @property {number|Long|null} [sequence] CandidateClientEventProto sequence
         * @property {string|null} [event_type] CandidateClientEventProto event_type
         * @property {number|Long|null} [elapsed_ms] CandidateClientEventProto elapsed_ms
         * @property {Uint8Array|null} [section_id] CandidateClientEventProto section_id
         * @property {Uint8Array|null} [question_id] CandidateClientEventProto question_id
         * @property {string|null} [answer] CandidateClientEventProto answer
         * @property {string|null} [old_answer] CandidateClientEventProto old_answer
         * @property {string|null} [navigation_method] CandidateClientEventProto navigation_method
         * @property {number|Long|null} [duration_ms] CandidateClientEventProto duration_ms
         * @property {number|null} [battery_level] CandidateClientEventProto battery_level
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateClientEventProto.
         * @memberof candidate_http
         * @interface ICandidateClientEventProto
         * @augments candidate_http.CandidateClientEventProto.$Properties
         * @deprecated Use candidate_http.CandidateClientEventProto.$Properties instead.
         */

        /**
         * Shape of a CandidateClientEventProto.
         * @typedef {candidate_http.CandidateClientEventProto.$Properties} candidate_http.CandidateClientEventProto.$Shape
         */

        /**
         * Constructs a new CandidateClientEventProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateClientEventProto.
         * @constructor
         * @param {candidate_http.CandidateClientEventProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateClientEventProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateClientEventProto event_id.
         * @member {Uint8Array} event_id
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.event_id = $util.newBuffer([]);

        /**
         * CandidateClientEventProto events_session_id.
         * @member {Uint8Array} events_session_id
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.events_session_id = $util.newBuffer([]);

        /**
         * CandidateClientEventProto sequence.
         * @member {number|Long} sequence
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.sequence = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CandidateClientEventProto event_type.
         * @member {string} event_type
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.event_type = "";

        /**
         * CandidateClientEventProto elapsed_ms.
         * @member {number|Long} elapsed_ms
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.elapsed_ms = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CandidateClientEventProto section_id.
         * @member {Uint8Array|null|undefined} section_id
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.section_id = null;

        /**
         * CandidateClientEventProto question_id.
         * @member {Uint8Array|null|undefined} question_id
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.question_id = null;

        /**
         * CandidateClientEventProto answer.
         * @member {string|null|undefined} answer
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.answer = null;

        /**
         * CandidateClientEventProto old_answer.
         * @member {string|null|undefined} old_answer
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.old_answer = null;

        /**
         * CandidateClientEventProto navigation_method.
         * @member {string|null|undefined} navigation_method
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.navigation_method = null;

        /**
         * CandidateClientEventProto duration_ms.
         * @member {number|Long|null|undefined} duration_ms
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.duration_ms = null;

        /**
         * CandidateClientEventProto battery_level.
         * @member {number|null|undefined} battery_level
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         */
        CandidateClientEventProto.prototype.battery_level = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_section_id", {
            get: $util.oneOfGetter($oneOfFields = ["section_id"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_question_id", {
            get: $util.oneOfGetter($oneOfFields = ["question_id"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_answer", {
            get: $util.oneOfGetter($oneOfFields = ["answer"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_old_answer", {
            get: $util.oneOfGetter($oneOfFields = ["old_answer"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_navigation_method", {
            get: $util.oneOfGetter($oneOfFields = ["navigation_method"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_duration_ms", {
            get: $util.oneOfGetter($oneOfFields = ["duration_ms"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CandidateClientEventProto.prototype, "_battery_level", {
            get: $util.oneOfGetter($oneOfFields = ["battery_level"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CandidateClientEventProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {candidate_http.CandidateClientEventProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateClientEventProto} CandidateClientEventProto instance
         * @type {{
         *   (properties: candidate_http.CandidateClientEventProto.$Shape): candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape;
         *   (properties?: candidate_http.CandidateClientEventProto.$Properties): candidate_http.CandidateClientEventProto;
         * }}
         */
        CandidateClientEventProto.create = function(properties) {
            return new CandidateClientEventProto(properties);
        };

        /**
         * Encodes the specified CandidateClientEventProto message. Does not implicitly {@link candidate_http.CandidateClientEventProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {candidate_http.CandidateClientEventProto.$Properties} message CandidateClientEventProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateClientEventProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.event_id != null && $Object.hasOwnProperty.call(message, "event_id") && message.event_id.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.event_id);
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id") && message.events_session_id.length)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.events_session_id);
            if (message.sequence != null && $Object.hasOwnProperty.call(message, "sequence") && (typeof message.sequence === "object" ? message.sequence.low || message.sequence.high : message.sequence !== 0))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.sequence);
            if (message.event_type != null && $Object.hasOwnProperty.call(message, "event_type") && message.event_type !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.event_type);
            if (message.elapsed_ms != null && $Object.hasOwnProperty.call(message, "elapsed_ms") && (typeof message.elapsed_ms === "object" ? message.elapsed_ms.low || message.elapsed_ms.high : message.elapsed_ms !== 0))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.elapsed_ms);
            if (message.section_id != null && $Object.hasOwnProperty.call(message, "section_id"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.section_id);
            if (message.question_id != null && $Object.hasOwnProperty.call(message, "question_id"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.question_id);
            if (message.answer != null && $Object.hasOwnProperty.call(message, "answer"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.answer);
            if (message.old_answer != null && $Object.hasOwnProperty.call(message, "old_answer"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.old_answer);
            if (message.navigation_method != null && $Object.hasOwnProperty.call(message, "navigation_method"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.navigation_method);
            if (message.duration_ms != null && $Object.hasOwnProperty.call(message, "duration_ms"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.duration_ms);
            if (message.battery_level != null && $Object.hasOwnProperty.call(message, "battery_level"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.battery_level);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateClientEventProto message, length delimited. Does not implicitly {@link candidate_http.CandidateClientEventProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {candidate_http.CandidateClientEventProto.$Properties} message CandidateClientEventProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateClientEventProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateClientEventProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape} CandidateClientEventProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateClientEventProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateClientEventProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.event_id = value;
                        else
                            delete message.event_id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.events_session_id = value;
                        else
                            delete message.events_session_id;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.sequence = value;
                        else
                            delete message.sequence;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.event_type = value;
                        else
                            delete message.event_type;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.elapsed_ms = value;
                        else
                            delete message.elapsed_ms;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        message.section_id = reader.bytes();
                        message._section_id = "section_id";
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        message.question_id = reader.bytes();
                        message._question_id = "question_id";
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.answer = reader.stringVerify();
                        message._answer = "answer";
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.old_answer = reader.stringVerify();
                        message._old_answer = "old_answer";
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.navigation_method = reader.stringVerify();
                        message._navigation_method = "navigation_method";
                        continue;
                    }
                case 11: {
                        if (wireType !== 0)
                            break;
                        message.duration_ms = reader.int64();
                        message._duration_ms = "duration_ms";
                        continue;
                    }
                case 12: {
                        if (wireType !== 0)
                            break;
                        message.battery_level = reader.int32();
                        message._battery_level = "battery_level";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateClientEventProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape} CandidateClientEventProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateClientEventProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateClientEventProto message.
         * @function verify
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateClientEventProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.event_id != null && $Object.hasOwnProperty.call(message, "event_id"))
                if (!(message.event_id && typeof message.event_id.length === "number" || $util.isString(message.event_id)))
                    return "event_id: buffer expected";
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id"))
                if (!(message.events_session_id && typeof message.events_session_id.length === "number" || $util.isString(message.events_session_id)))
                    return "events_session_id: buffer expected";
            if (message.sequence != null && $Object.hasOwnProperty.call(message, "sequence"))
                if (!$util.isInteger(message.sequence) && !(message.sequence && $util.isInteger(message.sequence.low) && $util.isInteger(message.sequence.high)))
                    return "sequence: integer|Long expected";
            if (message.event_type != null && $Object.hasOwnProperty.call(message, "event_type"))
                if (!$util.isString(message.event_type))
                    return "event_type: string expected";
            if (message.elapsed_ms != null && $Object.hasOwnProperty.call(message, "elapsed_ms"))
                if (!$util.isInteger(message.elapsed_ms) && !(message.elapsed_ms && $util.isInteger(message.elapsed_ms.low) && $util.isInteger(message.elapsed_ms.high)))
                    return "elapsed_ms: integer|Long expected";
            if (message.section_id != null && $Object.hasOwnProperty.call(message, "section_id")) {
                properties._section_id = 1;
                if (!(message.section_id && typeof message.section_id.length === "number" || $util.isString(message.section_id)))
                    return "section_id: buffer expected";
            }
            if (message.question_id != null && $Object.hasOwnProperty.call(message, "question_id")) {
                properties._question_id = 1;
                if (!(message.question_id && typeof message.question_id.length === "number" || $util.isString(message.question_id)))
                    return "question_id: buffer expected";
            }
            if (message.answer != null && $Object.hasOwnProperty.call(message, "answer")) {
                properties._answer = 1;
                if (!$util.isString(message.answer))
                    return "answer: string expected";
            }
            if (message.old_answer != null && $Object.hasOwnProperty.call(message, "old_answer")) {
                properties._old_answer = 1;
                if (!$util.isString(message.old_answer))
                    return "old_answer: string expected";
            }
            if (message.navigation_method != null && $Object.hasOwnProperty.call(message, "navigation_method")) {
                properties._navigation_method = 1;
                if (!$util.isString(message.navigation_method))
                    return "navigation_method: string expected";
            }
            if (message.duration_ms != null && $Object.hasOwnProperty.call(message, "duration_ms")) {
                properties._duration_ms = 1;
                if (!$util.isInteger(message.duration_ms) && !(message.duration_ms && $util.isInteger(message.duration_ms.low) && $util.isInteger(message.duration_ms.high)))
                    return "duration_ms: integer|Long expected";
            }
            if (message.battery_level != null && $Object.hasOwnProperty.call(message, "battery_level")) {
                properties._battery_level = 1;
                if (!$util.isInteger(message.battery_level))
                    return "battery_level: integer expected";
            }
            return null;
        };

        /**
         * Creates a CandidateClientEventProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateClientEventProto} CandidateClientEventProto
         */
        CandidateClientEventProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateClientEventProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateClientEventProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateClientEventProto();
            if (object.event_id != null)
                if (object.event_id.length)
                    if (typeof object.event_id === "string")
                        $util.base64.decode(object.event_id, message.event_id = $util.newBuffer($util.base64.length(object.event_id)), 0);
                    else if (object.event_id.length >= 0)
                        message.event_id = object.event_id;
            if (object.events_session_id != null)
                if (object.events_session_id.length)
                    if (typeof object.events_session_id === "string")
                        $util.base64.decode(object.events_session_id, message.events_session_id = $util.newBuffer($util.base64.length(object.events_session_id)), 0);
                    else if (object.events_session_id.length >= 0)
                        message.events_session_id = object.events_session_id;
            if (object.sequence != null)
                if (typeof object.sequence === "object" ? object.sequence.low || object.sequence.high : $Number(object.sequence) !== 0)
                    if ($util.Long)
                        message.sequence = $util.Long.fromValue(object.sequence, false);
                    else if (typeof object.sequence === "string")
                        message.sequence = $parseInt(object.sequence, 10);
                    else if (typeof object.sequence === "number")
                        message.sequence = object.sequence;
                    else if (typeof object.sequence === "object")
                        message.sequence = new $util.LongBits(object.sequence.low >>> 0, object.sequence.high >>> 0).toNumber();
            if (object.event_type != null)
                if (typeof object.event_type !== "string" || object.event_type.length)
                    message.event_type = $String(object.event_type);
            if (object.elapsed_ms != null)
                if (typeof object.elapsed_ms === "object" ? object.elapsed_ms.low || object.elapsed_ms.high : $Number(object.elapsed_ms) !== 0)
                    if ($util.Long)
                        message.elapsed_ms = $util.Long.fromValue(object.elapsed_ms, false);
                    else if (typeof object.elapsed_ms === "string")
                        message.elapsed_ms = $parseInt(object.elapsed_ms, 10);
                    else if (typeof object.elapsed_ms === "number")
                        message.elapsed_ms = object.elapsed_ms;
                    else if (typeof object.elapsed_ms === "object")
                        message.elapsed_ms = new $util.LongBits(object.elapsed_ms.low >>> 0, object.elapsed_ms.high >>> 0).toNumber();
            if (object.section_id != null)
                if (typeof object.section_id === "string")
                    $util.base64.decode(object.section_id, message.section_id = $util.newBuffer($util.base64.length(object.section_id)), 0);
                else if (object.section_id.length >= 0)
                    message.section_id = object.section_id;
            if (object.question_id != null)
                if (typeof object.question_id === "string")
                    $util.base64.decode(object.question_id, message.question_id = $util.newBuffer($util.base64.length(object.question_id)), 0);
                else if (object.question_id.length >= 0)
                    message.question_id = object.question_id;
            if (object.answer != null)
                message.answer = $String(object.answer);
            if (object.old_answer != null)
                message.old_answer = $String(object.old_answer);
            if (object.navigation_method != null)
                message.navigation_method = $String(object.navigation_method);
            if (object.duration_ms != null)
                if ($util.Long)
                    message.duration_ms = $util.Long.fromValue(object.duration_ms, false);
                else if (typeof object.duration_ms === "string")
                    message.duration_ms = $parseInt(object.duration_ms, 10);
                else if (typeof object.duration_ms === "number")
                    message.duration_ms = object.duration_ms;
                else if (typeof object.duration_ms === "object")
                    message.duration_ms = new $util.LongBits(object.duration_ms.low >>> 0, object.duration_ms.high >>> 0).toNumber();
            if (object.battery_level != null)
                message.battery_level = object.battery_level | 0;
            return message;
        };

        /**
         * Creates a plain object from a CandidateClientEventProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {candidate_http.CandidateClientEventProto} message CandidateClientEventProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateClientEventProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === $String)
                    object.event_id = "";
                else {
                    object.event_id = [];
                    if (options.bytes !== $Array)
                        object.event_id = $util.newBuffer(object.event_id);
                }
                if (options.bytes === $String)
                    object.events_session_id = "";
                else {
                    object.events_session_id = [];
                    if (options.bytes !== $Array)
                        object.events_session_id = $util.newBuffer(object.events_session_id);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.sequence = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.sequence = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.event_type = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.elapsed_ms = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.elapsed_ms = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            }
            if (message.event_id != null && $Object.hasOwnProperty.call(message, "event_id"))
                object.event_id = options.bytes === $String ? $util.base64.encode(message.event_id, 0, message.event_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.event_id) : message.event_id;
            if (message.events_session_id != null && $Object.hasOwnProperty.call(message, "events_session_id"))
                object.events_session_id = options.bytes === $String ? $util.base64.encode(message.events_session_id, 0, message.events_session_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.events_session_id) : message.events_session_id;
            if (message.sequence != null && $Object.hasOwnProperty.call(message, "sequence"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.sequence = typeof message.sequence === "number" ? $BigInt(message.sequence) : $util.Long.fromBits(message.sequence.low >>> 0, message.sequence.high >>> 0, false).toBigInt();
                else if (typeof message.sequence === "number")
                    object.sequence = options.longs === $String ? $String(message.sequence) : message.sequence;
                else
                    object.sequence = options.longs === $String ? $util.Long.prototype.toString.call(message.sequence) : options.longs === $Number ? new $util.LongBits(message.sequence.low >>> 0, message.sequence.high >>> 0).toNumber() : message.sequence;
            if (message.event_type != null && $Object.hasOwnProperty.call(message, "event_type"))
                object.event_type = message.event_type;
            if (message.elapsed_ms != null && $Object.hasOwnProperty.call(message, "elapsed_ms"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.elapsed_ms = typeof message.elapsed_ms === "number" ? $BigInt(message.elapsed_ms) : $util.Long.fromBits(message.elapsed_ms.low >>> 0, message.elapsed_ms.high >>> 0, false).toBigInt();
                else if (typeof message.elapsed_ms === "number")
                    object.elapsed_ms = options.longs === $String ? $String(message.elapsed_ms) : message.elapsed_ms;
                else
                    object.elapsed_ms = options.longs === $String ? $util.Long.prototype.toString.call(message.elapsed_ms) : options.longs === $Number ? new $util.LongBits(message.elapsed_ms.low >>> 0, message.elapsed_ms.high >>> 0).toNumber() : message.elapsed_ms;
            if (message.section_id != null && $Object.hasOwnProperty.call(message, "section_id"))
                object.section_id = options.bytes === $String ? $util.base64.encode(message.section_id, 0, message.section_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.section_id) : message.section_id;
            if (message.question_id != null && $Object.hasOwnProperty.call(message, "question_id"))
                object.question_id = options.bytes === $String ? $util.base64.encode(message.question_id, 0, message.question_id.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.question_id) : message.question_id;
            if (message.answer != null && $Object.hasOwnProperty.call(message, "answer"))
                object.answer = message.answer;
            if (message.old_answer != null && $Object.hasOwnProperty.call(message, "old_answer"))
                object.old_answer = message.old_answer;
            if (message.navigation_method != null && $Object.hasOwnProperty.call(message, "navigation_method"))
                object.navigation_method = message.navigation_method;
            if (message.duration_ms != null && $Object.hasOwnProperty.call(message, "duration_ms"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.duration_ms = typeof message.duration_ms === "number" ? $BigInt(message.duration_ms) : $util.Long.fromBits(message.duration_ms.low >>> 0, message.duration_ms.high >>> 0, false).toBigInt();
                else if (typeof message.duration_ms === "number")
                    object.duration_ms = options.longs === $String ? $String(message.duration_ms) : message.duration_ms;
                else
                    object.duration_ms = options.longs === $String ? $util.Long.prototype.toString.call(message.duration_ms) : options.longs === $Number ? new $util.LongBits(message.duration_ms.low >>> 0, message.duration_ms.high >>> 0).toNumber() : message.duration_ms;
            if (message.battery_level != null && $Object.hasOwnProperty.call(message, "battery_level"))
                object.battery_level = message.battery_level;
            return object;
        };

        /**
         * Converts this CandidateClientEventProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateClientEventProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateClientEventProto.prototype.toJSON = function() {
            return CandidateClientEventProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateClientEventProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateClientEventProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateClientEventProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateClientEventProto";
        };

        return CandidateClientEventProto;
    })();

    candidate_http.CandidateEndExamHttpProto = (function() {

        /**
         * Properties of a CandidateEndExamHttpProto.
         * @typedef {Object} candidate_http.CandidateEndExamHttpProto.$Properties
         * @property {boolean|null} [timed_out] CandidateEndExamHttpProto timed_out
         * @property {candidate_http.CandidateAutoSaveHttpProto.$Properties|null} [autosave] CandidateEndExamHttpProto autosave
         * @property {boolean|null} [is_drawing_writing] CandidateEndExamHttpProto is_drawing_writing
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a CandidateEndExamHttpProto.
         * @memberof candidate_http
         * @interface ICandidateEndExamHttpProto
         * @augments candidate_http.CandidateEndExamHttpProto.$Properties
         * @deprecated Use candidate_http.CandidateEndExamHttpProto.$Properties instead.
         */

        /**
         * Shape of a CandidateEndExamHttpProto.
         * @typedef {{
         *   timed_out?: boolean|null;
         *   autosave?: candidate_http.CandidateAutoSaveHttpProto.$Shape|null;
         *   is_drawing_writing?: boolean|null;
         *   $unknowns?: Array.<Uint8Array>;
         * }} candidate_http.CandidateEndExamHttpProto.$Shape
         */

        /**
         * Constructs a new CandidateEndExamHttpProto.
         * @memberof candidate_http
         * @classdesc Represents a CandidateEndExamHttpProto.
         * @constructor
         * @param {candidate_http.CandidateEndExamHttpProto.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const CandidateEndExamHttpProto = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * CandidateEndExamHttpProto timed_out.
         * @member {boolean} timed_out
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @instance
         */
        CandidateEndExamHttpProto.prototype.timed_out = false;

        /**
         * CandidateEndExamHttpProto autosave.
         * @member {candidate_http.CandidateAutoSaveHttpProto.$Properties|null|undefined} autosave
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @instance
         */
        CandidateEndExamHttpProto.prototype.autosave = null;

        /**
         * CandidateEndExamHttpProto is_drawing_writing.
         * @member {boolean} is_drawing_writing
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @instance
         */
        CandidateEndExamHttpProto.prototype.is_drawing_writing = false;

        /**
         * Creates a new CandidateEndExamHttpProto instance using the specified properties.
         * @function create
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {candidate_http.CandidateEndExamHttpProto.$Properties=} [properties] Properties to set
         * @returns {candidate_http.CandidateEndExamHttpProto} CandidateEndExamHttpProto instance
         * @type {{
         *   (properties: candidate_http.CandidateEndExamHttpProto.$Shape): candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape;
         *   (properties?: candidate_http.CandidateEndExamHttpProto.$Properties): candidate_http.CandidateEndExamHttpProto;
         * }}
         */
        CandidateEndExamHttpProto.create = function(properties) {
            return new CandidateEndExamHttpProto(properties);
        };

        /**
         * Encodes the specified CandidateEndExamHttpProto message. Does not implicitly {@link candidate_http.CandidateEndExamHttpProto.verify|verify} messages.
         * @function encode
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {candidate_http.CandidateEndExamHttpProto.$Properties} message CandidateEndExamHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateEndExamHttpProto.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.timed_out != null && $Object.hasOwnProperty.call(message, "timed_out") && message.timed_out !== false)
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.timed_out);
            if (message.autosave != null && $Object.hasOwnProperty.call(message, "autosave"))
                $root.candidate_http.CandidateAutoSaveHttpProto.encode(message.autosave, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.is_drawing_writing != null && $Object.hasOwnProperty.call(message, "is_drawing_writing") && message.is_drawing_writing !== false)
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.is_drawing_writing);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified CandidateEndExamHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateEndExamHttpProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {candidate_http.CandidateEndExamHttpProto.$Properties} message CandidateEndExamHttpProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CandidateEndExamHttpProto.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a CandidateEndExamHttpProto message from the specified reader or buffer.
         * @function decode
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape} CandidateEndExamHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateEndExamHttpProto.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.candidate_http.CandidateEndExamHttpProto(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.timed_out = value;
                        else
                            delete message.timed_out;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.autosave = $root.candidate_http.CandidateAutoSaveHttpProto.decode(reader, reader.uint32(), $undefined, _depth + 1, message.autosave);
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.is_drawing_writing = value;
                        else
                            delete message.is_drawing_writing;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a CandidateEndExamHttpProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape} CandidateEndExamHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CandidateEndExamHttpProto.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CandidateEndExamHttpProto message.
         * @function verify
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CandidateEndExamHttpProto.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.timed_out != null && $Object.hasOwnProperty.call(message, "timed_out"))
                if (typeof message.timed_out !== "boolean")
                    return "timed_out: boolean expected";
            if (message.autosave != null && $Object.hasOwnProperty.call(message, "autosave")) {
                let error = $root.candidate_http.CandidateAutoSaveHttpProto.verify(message.autosave, _depth + 1);
                if (error)
                    return "autosave." + error;
            }
            if (message.is_drawing_writing != null && $Object.hasOwnProperty.call(message, "is_drawing_writing"))
                if (typeof message.is_drawing_writing !== "boolean")
                    return "is_drawing_writing: boolean expected";
            return null;
        };

        /**
         * Creates a CandidateEndExamHttpProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {candidate_http.CandidateEndExamHttpProto} CandidateEndExamHttpProto
         */
        CandidateEndExamHttpProto.fromObject = function (object, _depth) {
            if (object instanceof $root.candidate_http.CandidateEndExamHttpProto)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".candidate_http.CandidateEndExamHttpProto: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.candidate_http.CandidateEndExamHttpProto();
            if (object.timed_out != null)
                if (object.timed_out)
                    message.timed_out = $Boolean(object.timed_out);
            if (object.autosave != null) {
                if (!$util.isObject(object.autosave))
                    throw $TypeError(".candidate_http.CandidateEndExamHttpProto.autosave: object expected");
                message.autosave = $root.candidate_http.CandidateAutoSaveHttpProto.fromObject(object.autosave, _depth + 1);
            }
            if (object.is_drawing_writing != null)
                if (object.is_drawing_writing)
                    message.is_drawing_writing = $Boolean(object.is_drawing_writing);
            return message;
        };

        /**
         * Creates a plain object from a CandidateEndExamHttpProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {candidate_http.CandidateEndExamHttpProto} message CandidateEndExamHttpProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CandidateEndExamHttpProto.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.timed_out = false;
                object.autosave = null;
                object.is_drawing_writing = false;
            }
            if (message.timed_out != null && $Object.hasOwnProperty.call(message, "timed_out"))
                object.timed_out = message.timed_out;
            if (message.autosave != null && $Object.hasOwnProperty.call(message, "autosave"))
                object.autosave = $root.candidate_http.CandidateAutoSaveHttpProto.toObject(message.autosave, options, _depth + 1);
            if (message.is_drawing_writing != null && $Object.hasOwnProperty.call(message, "is_drawing_writing"))
                object.is_drawing_writing = message.is_drawing_writing;
            return object;
        };

        /**
         * Converts this CandidateEndExamHttpProto to JSON.
         * @function toJSON
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CandidateEndExamHttpProto.prototype.toJSON = function() {
            return CandidateEndExamHttpProto.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for CandidateEndExamHttpProto
         * @function getTypeUrl
         * @memberof candidate_http.CandidateEndExamHttpProto
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        CandidateEndExamHttpProto.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/candidate_http.CandidateEndExamHttpProto";
        };

        return CandidateEndExamHttpProto;
    })();

    return candidate_http;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @typedef {Object} google.protobuf.Timestamp.$Properties
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @augments google.protobuf.Timestamp.$Properties
             * @deprecated Use google.protobuf.Timestamp.$Properties instead.
             */

            /**
             * Shape of a Timestamp.
             * @typedef {google.protobuf.Timestamp.$Properties} google.protobuf.Timestamp.$Shape
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @constructor
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Timestamp = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             * @type {{
             *   (properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
             *   (properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;
             * }}
             */
            Timestamp.create = function(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds") && (typeof message.seconds === "object" ? message.seconds.low || message.seconds.high : message.seconds !== 0))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos") && message.nanos !== 0)
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.google.protobuf.Timestamp(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.seconds = value;
                            else
                                delete message.seconds;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.nanos = value;
                            else
                                delete message.nanos;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function (object, _depth) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".google.protobuf.Timestamp: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if (typeof object.seconds === "object" ? object.seconds.low || object.seconds.high : $Number(object.seconds) !== 0)
                        if ($util.Long)
                            message.seconds = $util.Long.fromValue(object.seconds, false);
                        else if (typeof object.seconds === "string")
                            message.seconds = $parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    if ($Number(object.nanos) !== 0)
                        message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.seconds = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.seconds = typeof message.seconds === "number" ? $BigInt(message.seconds) : $util.Long.fromBits(message.seconds.low >>> 0, message.seconds.high >>> 0, false).toBigInt();
                    else if (typeof message.seconds === "number")
                        object.seconds = options.longs === $String ? $String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === $String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === $Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function() {
                return Timestamp.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Timestamp.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export {
  $root as default
};
