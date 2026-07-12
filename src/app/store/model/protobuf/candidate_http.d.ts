import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace candidate_http. */
export namespace candidate_http {

    /** AssessmentFont enum. */
    enum AssessmentFont {

        /** SMALL value */
        SMALL = 0,

        /** NORMAL value */
        NORMAL = 1,

        /** LARGE value */
        LARGE = 2
    }

    /** SectionType enum. */
    enum SectionType {

        /** OBJECTIVE value */
        OBJECTIVE = 0,

        /** THEORY value */
        THEORY = 1
    }

    /** BlockType enum. */
    enum BlockType {

        /** SINGLE_QUESTIONS value */
        SINGLE_QUESTIONS = 0,

        /** PASSAGES value */
        PASSAGES = 1
    }

    /** AttemptRule enum. */
    enum AttemptRule {

        /** ATTEMPT_ALL value */
        ATTEMPT_ALL = 0,

        /** ATTEMPT_ANY value */
        ATTEMPT_ANY = 1
    }

    /** ItemType enum. */
    enum ItemType {

        /** MCQ value */
        MCQ = 0,

        /** MRQ value */
        MRQ = 1,

        /** ESSAY_PLAIN_TEXT value */
        ESSAY_PLAIN_TEXT = 2,

        /** ESSAY_RICH_TEXT value */
        ESSAY_RICH_TEXT = 3,

        /** CLOZE_TEXT value */
        CLOZE_TEXT = 4,

        /** CLOZE_DROPDOWN value */
        CLOZE_DROPDOWN = 5,

        /** SHORT_TEXT value */
        SHORT_TEXT = 6,

        /** TRUE_FALSE value */
        TRUE_FALSE = 7,

        /** YES_NO value */
        YES_NO = 8,

        /** ASSOCIATION value */
        ASSOCIATION = 9,

        /** CHOICE_MATRIX value */
        CHOICE_MATRIX = 10,

        /** ORDER_LIST value */
        ORDER_LIST = 11,

        /** CLOZE_TEXT_IMAGE value */
        CLOZE_TEXT_IMAGE = 12,

        /** CLOZE_DROPDOWN_IMAGE value */
        CLOZE_DROPDOWN_IMAGE = 13,

        /** IMAGE_DRAG_AND_DROP value */
        IMAGE_DRAG_AND_DROP = 14,

        /** DRAWING_AND_WRITING value */
        DRAWING_AND_WRITING = 15,

        /** CLOZERADIO value */
        CLOZERADIO = 16
    }

    /** BackgroundType enum. */
    enum BackgroundType {

        /** BG_NONE value */
        BG_NONE = 0,

        /** BG_GRID value */
        BG_GRID = 1,

        /** BG_LINE value */
        BG_LINE = 2,

        /** BG_GRAPH value */
        BG_GRAPH = 3
    }

    /** DrawingWritingSplitType enum. */
    enum DrawingWritingSplitType {

        /** FULL value */
        FULL = 0,

        /** SPLIT value */
        SPLIT = 1
    }

    /** ResponsePositionDirection enum. */
    enum ResponsePositionDirection {

        /** LEFT value */
        LEFT = 0,

        /** RIGHT value */
        RIGHT = 1
    }

    /**
     * Properties of an OptionDto.
     * @deprecated Use candidate_http.OptionDto.$Properties instead.
     */
    interface IOptionDto extends candidate_http.OptionDto.$Properties {
    }

    /** Represents an OptionDto. */
    class OptionDto {

        /**
         * Constructs a new OptionDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.OptionDto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** OptionDto label. */
        label: string;

        /** OptionDto value. */
        value: string;

        /**
         * Creates a new OptionDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OptionDto instance
         */
        static create(properties: candidate_http.OptionDto.$Shape): candidate_http.OptionDto & candidate_http.OptionDto.$Shape;
        static create(properties?: candidate_http.OptionDto.$Properties): candidate_http.OptionDto;

        /**
         * Encodes the specified OptionDto message. Does not implicitly {@link candidate_http.OptionDto.verify|verify} messages.
         * @param message OptionDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.OptionDto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OptionDto message, length delimited. Does not implicitly {@link candidate_http.OptionDto.verify|verify} messages.
         * @param message OptionDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.OptionDto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OptionDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.OptionDto & candidate_http.OptionDto.$Shape} OptionDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.OptionDto & candidate_http.OptionDto.$Shape;

        /**
         * Decodes an OptionDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.OptionDto & candidate_http.OptionDto.$Shape} OptionDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.OptionDto & candidate_http.OptionDto.$Shape;

        /**
         * Verifies an OptionDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OptionDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OptionDto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.OptionDto;

        /**
         * Creates a plain object from an OptionDto message. Also converts values to other types if specified.
         * @param message OptionDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.OptionDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OptionDto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for OptionDto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace OptionDto {

        /** Properties of an OptionDto. */
        interface $Properties {

            /** OptionDto label */
            label?: (string|null);

            /** OptionDto value */
            value?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an OptionDto. */
        type $Shape = candidate_http.OptionDto.$Properties;
    }

    /**
     * Properties of an ImageData.
     * @deprecated Use candidate_http.ImageData.$Properties instead.
     */
    interface IImageData extends candidate_http.ImageData.$Properties {
    }

    /** Represents an ImageData. */
    class ImageData {

        /**
         * Constructs a new ImageData.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.ImageData.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** ImageData image. */
        image: string;

        /** ImageData alt_text. */
        alt_text: string;

        /** ImageData width. */
        width: number;

        /** ImageData height. */
        height: number;

        /** ImageData dimension. */
        dimension: string;

        /**
         * Creates a new ImageData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ImageData instance
         */
        static create(properties: candidate_http.ImageData.$Shape): candidate_http.ImageData & candidate_http.ImageData.$Shape;
        static create(properties?: candidate_http.ImageData.$Properties): candidate_http.ImageData;

        /**
         * Encodes the specified ImageData message. Does not implicitly {@link candidate_http.ImageData.verify|verify} messages.
         * @param message ImageData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.ImageData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ImageData message, length delimited. Does not implicitly {@link candidate_http.ImageData.verify|verify} messages.
         * @param message ImageData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.ImageData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ImageData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.ImageData & candidate_http.ImageData.$Shape} ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.ImageData & candidate_http.ImageData.$Shape;

        /**
         * Decodes an ImageData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.ImageData & candidate_http.ImageData.$Shape} ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.ImageData & candidate_http.ImageData.$Shape;

        /**
         * Verifies an ImageData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ImageData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ImageData
         */
        static fromObject(object: { [k: string]: any }): candidate_http.ImageData;

        /**
         * Creates a plain object from an ImageData message. Also converts values to other types if specified.
         * @param message ImageData
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.ImageData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ImageData to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ImageData
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ImageData {

        /** Properties of an ImageData. */
        interface $Properties {

            /** ImageData image */
            image?: (string|null);

            /** ImageData alt_text */
            alt_text?: (string|null);

            /** ImageData width */
            width?: (number|null);

            /** ImageData height */
            height?: (number|null);

            /** ImageData dimension */
            dimension?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an ImageData. */
        type $Shape = candidate_http.ImageData.$Properties;
    }

    /**
     * Properties of a ResponsePosition.
     * @deprecated Use candidate_http.ResponsePosition.$Properties instead.
     */
    interface IResponsePosition extends candidate_http.ResponsePosition.$Properties {
    }

    /** Represents a ResponsePosition. */
    class ResponsePosition {

        /**
         * Constructs a new ResponsePosition.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.ResponsePosition.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** ResponsePosition x. */
        x: number;

        /** ResponsePosition y. */
        y: number;

        /** ResponsePosition direction. */
        direction: candidate_http.ResponsePositionDirection;

        /**
         * Creates a new ResponsePosition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponsePosition instance
         */
        static create(properties: candidate_http.ResponsePosition.$Shape): candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape;
        static create(properties?: candidate_http.ResponsePosition.$Properties): candidate_http.ResponsePosition;

        /**
         * Encodes the specified ResponsePosition message. Does not implicitly {@link candidate_http.ResponsePosition.verify|verify} messages.
         * @param message ResponsePosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.ResponsePosition.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponsePosition message, length delimited. Does not implicitly {@link candidate_http.ResponsePosition.verify|verify} messages.
         * @param message ResponsePosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.ResponsePosition.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponsePosition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape} ResponsePosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape;

        /**
         * Decodes a ResponsePosition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape} ResponsePosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.ResponsePosition & candidate_http.ResponsePosition.$Shape;

        /**
         * Verifies a ResponsePosition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponsePosition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponsePosition
         */
        static fromObject(object: { [k: string]: any }): candidate_http.ResponsePosition;

        /**
         * Creates a plain object from a ResponsePosition message. Also converts values to other types if specified.
         * @param message ResponsePosition
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.ResponsePosition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponsePosition to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ResponsePosition
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ResponsePosition {

        /** Properties of a ResponsePosition. */
        interface $Properties {

            /** ResponsePosition x */
            x?: (number|null);

            /** ResponsePosition y */
            y?: (number|null);

            /** ResponsePosition direction */
            direction?: (candidate_http.ResponsePositionDirection|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ResponsePosition. */
        type $Shape = candidate_http.ResponsePosition.$Properties;
    }

    /**
     * Properties of a SubQuestion.
     * @deprecated Use candidate_http.SubQuestion.$Properties instead.
     */
    interface ISubQuestion extends candidate_http.SubQuestion.$Properties {
    }

    /** Represents a SubQuestion. */
    class SubQuestion {

        /**
         * Constructs a new SubQuestion.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.SubQuestion.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SubQuestion id. */
        id: string;

        /** SubQuestion stimulus. */
        stimulus: string;

        /** SubQuestion score. */
        score: number;

        /** SubQuestion background_type. */
        background_type?: (candidate_http.BackgroundType|null);

        /** SubQuestion children. */
        children: candidate_http.SubQuestion.$Properties[];

        /**
         * Creates a new SubQuestion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubQuestion instance
         */
        static create(properties: candidate_http.SubQuestion.$Shape): candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape;
        static create(properties?: candidate_http.SubQuestion.$Properties): candidate_http.SubQuestion;

        /**
         * Encodes the specified SubQuestion message. Does not implicitly {@link candidate_http.SubQuestion.verify|verify} messages.
         * @param message SubQuestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.SubQuestion.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubQuestion message, length delimited. Does not implicitly {@link candidate_http.SubQuestion.verify|verify} messages.
         * @param message SubQuestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.SubQuestion.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubQuestion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape} SubQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape;

        /**
         * Decodes a SubQuestion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape} SubQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.SubQuestion & candidate_http.SubQuestion.$Shape;

        /**
         * Verifies a SubQuestion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubQuestion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubQuestion
         */
        static fromObject(object: { [k: string]: any }): candidate_http.SubQuestion;

        /**
         * Creates a plain object from a SubQuestion message. Also converts values to other types if specified.
         * @param message SubQuestion
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.SubQuestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubQuestion to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SubQuestion
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SubQuestion {

        /** Properties of a SubQuestion. */
        interface $Properties {

            /** SubQuestion id */
            id?: (string|null);

            /** SubQuestion stimulus */
            stimulus?: (string|null);

            /** SubQuestion score */
            score?: (number|null);

            /** SubQuestion background_type */
            background_type?: (candidate_http.BackgroundType|null);

            /** SubQuestion children */
            children?: (candidate_http.SubQuestion.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SubQuestion. */
        type $Shape = candidate_http.SubQuestion.$Properties;
    }

    /**
     * Properties of a PossibleResponseCandidate.
     * @deprecated Use candidate_http.PossibleResponseCandidate.$Properties instead.
     */
    interface IPossibleResponseCandidate extends candidate_http.PossibleResponseCandidate.$Properties {
    }

    /** Represents a PossibleResponseCandidate. */
    class PossibleResponseCandidate {

        /**
         * Constructs a new PossibleResponseCandidate.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.PossibleResponseCandidate.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PossibleResponseCandidate responses. */
        responses: candidate_http.OptionDto.$Properties[];

        /**
         * Creates a new PossibleResponseCandidate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PossibleResponseCandidate instance
         */
        static create(properties: candidate_http.PossibleResponseCandidate.$Shape): candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape;
        static create(properties?: candidate_http.PossibleResponseCandidate.$Properties): candidate_http.PossibleResponseCandidate;

        /**
         * Encodes the specified PossibleResponseCandidate message. Does not implicitly {@link candidate_http.PossibleResponseCandidate.verify|verify} messages.
         * @param message PossibleResponseCandidate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.PossibleResponseCandidate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PossibleResponseCandidate message, length delimited. Does not implicitly {@link candidate_http.PossibleResponseCandidate.verify|verify} messages.
         * @param message PossibleResponseCandidate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.PossibleResponseCandidate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PossibleResponseCandidate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape} PossibleResponseCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape;

        /**
         * Decodes a PossibleResponseCandidate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape} PossibleResponseCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.PossibleResponseCandidate & candidate_http.PossibleResponseCandidate.$Shape;

        /**
         * Verifies a PossibleResponseCandidate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PossibleResponseCandidate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PossibleResponseCandidate
         */
        static fromObject(object: { [k: string]: any }): candidate_http.PossibleResponseCandidate;

        /**
         * Creates a plain object from a PossibleResponseCandidate message. Also converts values to other types if specified.
         * @param message PossibleResponseCandidate
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.PossibleResponseCandidate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PossibleResponseCandidate to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PossibleResponseCandidate
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PossibleResponseCandidate {

        /** Properties of a PossibleResponseCandidate. */
        interface $Properties {

            /** PossibleResponseCandidate responses */
            responses?: (candidate_http.OptionDto.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PossibleResponseCandidate. */
        type $Shape = candidate_http.PossibleResponseCandidate.$Properties;
    }

    /**
     * Properties of a CandidateLoginResponseProto.
     * @deprecated Use candidate_http.CandidateLoginResponseProto.$Properties instead.
     */
    interface ICandidateLoginResponseProto extends candidate_http.CandidateLoginResponseProto.$Properties {
    }

    /** Represents a CandidateLoginResponseProto. */
    class CandidateLoginResponseProto {

        /**
         * Constructs a new CandidateLoginResponseProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateLoginResponseProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateLoginResponseProto candidate_data. */
        candidate_data?: (candidate_http.CandidateDataProto.$Properties|null);

        /** CandidateLoginResponseProto sections_overview. */
        sections_overview: candidate_http.CandidateSectionsOverviewProto.$Properties[];

        /** CandidateLoginResponseProto assessment_data. */
        assessment_data?: (candidate_http.CandidateAssessmentDataProto.$Properties|null);

        /** CandidateLoginResponseProto sections_questions. */
        sections_questions: candidate_http.CandidateSectionQuestionsProto.$Properties[];

        /** CandidateLoginResponseProto events_session_id. */
        events_session_id: Uint8Array;

        /** CandidateLoginResponseProto last_sequence. */
        last_sequence: (number|Long);

        /** CandidateLoginResponseProto resume_elapsed_ms. */
        resume_elapsed_ms: (number|Long);

        /**
         * Creates a new CandidateLoginResponseProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateLoginResponseProto instance
         */
        static create(properties: candidate_http.CandidateLoginResponseProto.$Shape): candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape;
        static create(properties?: candidate_http.CandidateLoginResponseProto.$Properties): candidate_http.CandidateLoginResponseProto;

        /**
         * Encodes the specified CandidateLoginResponseProto message. Does not implicitly {@link candidate_http.CandidateLoginResponseProto.verify|verify} messages.
         * @param message CandidateLoginResponseProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateLoginResponseProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateLoginResponseProto message, length delimited. Does not implicitly {@link candidate_http.CandidateLoginResponseProto.verify|verify} messages.
         * @param message CandidateLoginResponseProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateLoginResponseProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateLoginResponseProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape} CandidateLoginResponseProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape;

        /**
         * Decodes a CandidateLoginResponseProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape} CandidateLoginResponseProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateLoginResponseProto & candidate_http.CandidateLoginResponseProto.$Shape;

        /**
         * Verifies a CandidateLoginResponseProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateLoginResponseProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateLoginResponseProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateLoginResponseProto;

        /**
         * Creates a plain object from a CandidateLoginResponseProto message. Also converts values to other types if specified.
         * @param message CandidateLoginResponseProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateLoginResponseProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateLoginResponseProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateLoginResponseProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateLoginResponseProto {

        /** Properties of a CandidateLoginResponseProto. */
        interface $Properties {

            /** CandidateLoginResponseProto candidate_data */
            candidate_data?: (candidate_http.CandidateDataProto.$Properties|null);

            /** CandidateLoginResponseProto sections_overview */
            sections_overview?: (candidate_http.CandidateSectionsOverviewProto.$Properties[]|null);

            /** CandidateLoginResponseProto assessment_data */
            assessment_data?: (candidate_http.CandidateAssessmentDataProto.$Properties|null);

            /** CandidateLoginResponseProto sections_questions */
            sections_questions?: (candidate_http.CandidateSectionQuestionsProto.$Properties[]|null);

            /** CandidateLoginResponseProto events_session_id */
            events_session_id?: (Uint8Array|null);

            /** CandidateLoginResponseProto last_sequence */
            last_sequence?: (number|Long|null);

            /** CandidateLoginResponseProto resume_elapsed_ms */
            resume_elapsed_ms?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateLoginResponseProto. */
        type $Shape = candidate_http.CandidateLoginResponseProto.$Properties;
    }

    /**
     * Properties of a CandidateDataProto.
     * @deprecated Use candidate_http.CandidateDataProto.$Properties instead.
     */
    interface ICandidateDataProto extends candidate_http.CandidateDataProto.$Properties {
    }

    /** Represents a CandidateDataProto. */
    class CandidateDataProto {

        /**
         * Constructs a new CandidateDataProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateDataProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateDataProto name. */
        name: string;

        /** CandidateDataProto id. */
        id: number;

        /** CandidateDataProto minutes_left. */
        minutes_left: number;

        /** CandidateDataProto seconds_left. */
        seconds_left: number;

        /** CandidateDataProto login_field_value. */
        login_field_value: string;

        /** CandidateDataProto section_ids. */
        section_ids: Uint8Array[];

        /** CandidateDataProto login_times. */
        login_times: google.protobuf.Timestamp.$Properties[];

        /** CandidateDataProto participant_id. */
        participant_id?: (Uint8Array|null);

        /**
         * Creates a new CandidateDataProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateDataProto instance
         */
        static create(properties: candidate_http.CandidateDataProto.$Shape): candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape;
        static create(properties?: candidate_http.CandidateDataProto.$Properties): candidate_http.CandidateDataProto;

        /**
         * Encodes the specified CandidateDataProto message. Does not implicitly {@link candidate_http.CandidateDataProto.verify|verify} messages.
         * @param message CandidateDataProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateDataProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateDataProto message, length delimited. Does not implicitly {@link candidate_http.CandidateDataProto.verify|verify} messages.
         * @param message CandidateDataProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateDataProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateDataProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape} CandidateDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape;

        /**
         * Decodes a CandidateDataProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape} CandidateDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateDataProto & candidate_http.CandidateDataProto.$Shape;

        /**
         * Verifies a CandidateDataProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateDataProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateDataProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateDataProto;

        /**
         * Creates a plain object from a CandidateDataProto message. Also converts values to other types if specified.
         * @param message CandidateDataProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateDataProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateDataProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateDataProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateDataProto {

        /** Properties of a CandidateDataProto. */
        interface $Properties {

            /** CandidateDataProto name */
            name?: (string|null);

            /** CandidateDataProto id */
            id?: (number|null);

            /** CandidateDataProto minutes_left */
            minutes_left?: (number|null);

            /** CandidateDataProto seconds_left */
            seconds_left?: (number|null);

            /** CandidateDataProto login_field_value */
            login_field_value?: (string|null);

            /** CandidateDataProto section_ids */
            section_ids?: (Uint8Array[]|null);

            /** CandidateDataProto login_times */
            login_times?: (google.protobuf.Timestamp.$Properties[]|null);

            /** CandidateDataProto participant_id */
            participant_id?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateDataProto. */
        type $Shape = candidate_http.CandidateDataProto.$Properties;
    }

    /**
     * Properties of a CandidateSectionsOverviewProto.
     * @deprecated Use candidate_http.CandidateSectionsOverviewProto.$Properties instead.
     */
    interface ICandidateSectionsOverviewProto extends candidate_http.CandidateSectionsOverviewProto.$Properties {
    }

    /** Represents a CandidateSectionsOverviewProto. */
    class CandidateSectionsOverviewProto {

        /**
         * Constructs a new CandidateSectionsOverviewProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateSectionsOverviewProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateSectionsOverviewProto name. */
        name: string;

        /** CandidateSectionsOverviewProto total_questions. */
        total_questions: number;

        /** CandidateSectionsOverviewProto duration. */
        duration: number;

        /**
         * Creates a new CandidateSectionsOverviewProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateSectionsOverviewProto instance
         */
        static create(properties: candidate_http.CandidateSectionsOverviewProto.$Shape): candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape;
        static create(properties?: candidate_http.CandidateSectionsOverviewProto.$Properties): candidate_http.CandidateSectionsOverviewProto;

        /**
         * Encodes the specified CandidateSectionsOverviewProto message. Does not implicitly {@link candidate_http.CandidateSectionsOverviewProto.verify|verify} messages.
         * @param message CandidateSectionsOverviewProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateSectionsOverviewProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateSectionsOverviewProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionsOverviewProto.verify|verify} messages.
         * @param message CandidateSectionsOverviewProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateSectionsOverviewProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateSectionsOverviewProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape} CandidateSectionsOverviewProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape;

        /**
         * Decodes a CandidateSectionsOverviewProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape} CandidateSectionsOverviewProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateSectionsOverviewProto & candidate_http.CandidateSectionsOverviewProto.$Shape;

        /**
         * Verifies a CandidateSectionsOverviewProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateSectionsOverviewProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateSectionsOverviewProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateSectionsOverviewProto;

        /**
         * Creates a plain object from a CandidateSectionsOverviewProto message. Also converts values to other types if specified.
         * @param message CandidateSectionsOverviewProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateSectionsOverviewProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateSectionsOverviewProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateSectionsOverviewProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateSectionsOverviewProto {

        /** Properties of a CandidateSectionsOverviewProto. */
        interface $Properties {

            /** CandidateSectionsOverviewProto name */
            name?: (string|null);

            /** CandidateSectionsOverviewProto total_questions */
            total_questions?: (number|null);

            /** CandidateSectionsOverviewProto duration */
            duration?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateSectionsOverviewProto. */
        type $Shape = candidate_http.CandidateSectionsOverviewProto.$Properties;
    }

    /**
     * Properties of a CandidateAssessmentDataProto.
     * @deprecated Use candidate_http.CandidateAssessmentDataProto.$Properties instead.
     */
    interface ICandidateAssessmentDataProto extends candidate_http.CandidateAssessmentDataProto.$Properties {
    }

    /** Represents a CandidateAssessmentDataProto. */
    class CandidateAssessmentDataProto {

        /**
         * Constructs a new CandidateAssessmentDataProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateAssessmentDataProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateAssessmentDataProto name. */
        name: string;

        /** CandidateAssessmentDataProto start_exam_instruction. */
        start_exam_instruction?: (string|null);

        /** CandidateAssessmentDataProto end_exam_instruction. */
        end_exam_instruction?: (string|null);

        /** CandidateAssessmentDataProto duration_minutes. */
        duration_minutes: number;

        /** CandidateAssessmentDataProto display_all_sections_at_once. */
        display_all_sections_at_once: boolean;

        /** CandidateAssessmentDataProto instruction_read_time_sec. */
        instruction_read_time_sec: number;

        /** CandidateAssessmentDataProto warn_end_of_reading_time_sec. */
        warn_end_of_reading_time_sec: number;

        /** CandidateAssessmentDataProto auto_save_sec. */
        auto_save_sec: number;

        /** CandidateAssessmentDataProto inactivity_warning_sec. */
        inactivity_warning_sec: number;

        /** CandidateAssessmentDataProto warn_unattempted_questions. */
        warn_unattempted_questions: boolean;

        /** CandidateAssessmentDataProto end_exam_confirmation. */
        end_exam_confirmation: boolean;

        /** CandidateAssessmentDataProto allow_end_exam_after_x_questions. */
        allow_end_exam_after_x_questions: number;

        /** CandidateAssessmentDataProto preserve_section_order. */
        preserve_section_order: boolean;

        /** CandidateAssessmentDataProto font_size. */
        font_size: candidate_http.AssessmentFont;

        /** CandidateAssessmentDataProto compensatory_time_value. */
        compensatory_time_value: number;

        /** CandidateAssessmentDataProto allow_block_navigation. */
        allow_block_navigation: boolean;

        /** CandidateAssessmentDataProto use_biometrics. */
        use_biometrics: boolean;

        /** CandidateAssessmentDataProto candidate_grace_period_minutes. */
        candidate_grace_period_minutes: number;

        /** CandidateAssessmentDataProto start_date. */
        start_date?: (google.protobuf.Timestamp.$Properties|null);

        /** CandidateAssessmentDataProto exam_start_time. */
        exam_start_time?: (google.protobuf.Timestamp.$Properties|null);

        /**
         * Creates a new CandidateAssessmentDataProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateAssessmentDataProto instance
         */
        static create(properties: candidate_http.CandidateAssessmentDataProto.$Shape): candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape;
        static create(properties?: candidate_http.CandidateAssessmentDataProto.$Properties): candidate_http.CandidateAssessmentDataProto;

        /**
         * Encodes the specified CandidateAssessmentDataProto message. Does not implicitly {@link candidate_http.CandidateAssessmentDataProto.verify|verify} messages.
         * @param message CandidateAssessmentDataProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateAssessmentDataProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateAssessmentDataProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAssessmentDataProto.verify|verify} messages.
         * @param message CandidateAssessmentDataProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateAssessmentDataProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateAssessmentDataProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape} CandidateAssessmentDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape;

        /**
         * Decodes a CandidateAssessmentDataProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape} CandidateAssessmentDataProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateAssessmentDataProto & candidate_http.CandidateAssessmentDataProto.$Shape;

        /**
         * Verifies a CandidateAssessmentDataProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateAssessmentDataProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateAssessmentDataProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateAssessmentDataProto;

        /**
         * Creates a plain object from a CandidateAssessmentDataProto message. Also converts values to other types if specified.
         * @param message CandidateAssessmentDataProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateAssessmentDataProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateAssessmentDataProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateAssessmentDataProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateAssessmentDataProto {

        /** Properties of a CandidateAssessmentDataProto. */
        interface $Properties {

            /** CandidateAssessmentDataProto name */
            name?: (string|null);

            /** CandidateAssessmentDataProto start_exam_instruction */
            start_exam_instruction?: (string|null);

            /** CandidateAssessmentDataProto end_exam_instruction */
            end_exam_instruction?: (string|null);

            /** CandidateAssessmentDataProto duration_minutes */
            duration_minutes?: (number|null);

            /** CandidateAssessmentDataProto display_all_sections_at_once */
            display_all_sections_at_once?: (boolean|null);

            /** CandidateAssessmentDataProto instruction_read_time_sec */
            instruction_read_time_sec?: (number|null);

            /** CandidateAssessmentDataProto warn_end_of_reading_time_sec */
            warn_end_of_reading_time_sec?: (number|null);

            /** CandidateAssessmentDataProto auto_save_sec */
            auto_save_sec?: (number|null);

            /** CandidateAssessmentDataProto inactivity_warning_sec */
            inactivity_warning_sec?: (number|null);

            /** CandidateAssessmentDataProto warn_unattempted_questions */
            warn_unattempted_questions?: (boolean|null);

            /** CandidateAssessmentDataProto end_exam_confirmation */
            end_exam_confirmation?: (boolean|null);

            /** CandidateAssessmentDataProto allow_end_exam_after_x_questions */
            allow_end_exam_after_x_questions?: (number|null);

            /** CandidateAssessmentDataProto preserve_section_order */
            preserve_section_order?: (boolean|null);

            /** CandidateAssessmentDataProto font_size */
            font_size?: (candidate_http.AssessmentFont|null);

            /** CandidateAssessmentDataProto compensatory_time_value */
            compensatory_time_value?: (number|null);

            /** CandidateAssessmentDataProto allow_block_navigation */
            allow_block_navigation?: (boolean|null);

            /** CandidateAssessmentDataProto use_biometrics */
            use_biometrics?: (boolean|null);

            /** CandidateAssessmentDataProto candidate_grace_period_minutes */
            candidate_grace_period_minutes?: (number|null);

            /** CandidateAssessmentDataProto start_date */
            start_date?: (google.protobuf.Timestamp.$Properties|null);

            /** CandidateAssessmentDataProto exam_start_time */
            exam_start_time?: (google.protobuf.Timestamp.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateAssessmentDataProto. */
        type $Shape = candidate_http.CandidateAssessmentDataProto.$Properties;
    }

    /**
     * Properties of a CandidateSectionQuestionsProto.
     * @deprecated Use candidate_http.CandidateSectionQuestionsProto.$Properties instead.
     */
    interface ICandidateSectionQuestionsProto extends candidate_http.CandidateSectionQuestionsProto.$Properties {
    }

    /** Represents a CandidateSectionQuestionsProto. */
    class CandidateSectionQuestionsProto {

        /**
         * Constructs a new CandidateSectionQuestionsProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateSectionQuestionsProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateSectionQuestionsProto name. */
        name: string;

        /** CandidateSectionQuestionsProto id. */
        id: Uint8Array;

        /** CandidateSectionQuestionsProto section_settings. */
        section_settings?: (candidate_http.CandidateSectionSettingsProto.$Properties|null);

        /** CandidateSectionQuestionsProto question_blocks. */
        question_blocks: candidate_http.CandidateSectionBlocksProto.$Properties[];

        /** CandidateSectionQuestionsProto section_type. */
        section_type: candidate_http.SectionType;

        /**
         * Creates a new CandidateSectionQuestionsProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateSectionQuestionsProto instance
         */
        static create(properties: candidate_http.CandidateSectionQuestionsProto.$Shape): candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape;
        static create(properties?: candidate_http.CandidateSectionQuestionsProto.$Properties): candidate_http.CandidateSectionQuestionsProto;

        /**
         * Encodes the specified CandidateSectionQuestionsProto message. Does not implicitly {@link candidate_http.CandidateSectionQuestionsProto.verify|verify} messages.
         * @param message CandidateSectionQuestionsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateSectionQuestionsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateSectionQuestionsProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionQuestionsProto.verify|verify} messages.
         * @param message CandidateSectionQuestionsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateSectionQuestionsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateSectionQuestionsProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape} CandidateSectionQuestionsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape;

        /**
         * Decodes a CandidateSectionQuestionsProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape} CandidateSectionQuestionsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateSectionQuestionsProto & candidate_http.CandidateSectionQuestionsProto.$Shape;

        /**
         * Verifies a CandidateSectionQuestionsProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateSectionQuestionsProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateSectionQuestionsProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateSectionQuestionsProto;

        /**
         * Creates a plain object from a CandidateSectionQuestionsProto message. Also converts values to other types if specified.
         * @param message CandidateSectionQuestionsProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateSectionQuestionsProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateSectionQuestionsProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateSectionQuestionsProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateSectionQuestionsProto {

        /** Properties of a CandidateSectionQuestionsProto. */
        interface $Properties {

            /** CandidateSectionQuestionsProto name */
            name?: (string|null);

            /** CandidateSectionQuestionsProto id */
            id?: (Uint8Array|null);

            /** CandidateSectionQuestionsProto section_settings */
            section_settings?: (candidate_http.CandidateSectionSettingsProto.$Properties|null);

            /** CandidateSectionQuestionsProto question_blocks */
            question_blocks?: (candidate_http.CandidateSectionBlocksProto.$Properties[]|null);

            /** CandidateSectionQuestionsProto section_type */
            section_type?: (candidate_http.SectionType|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateSectionQuestionsProto. */
        type $Shape = candidate_http.CandidateSectionQuestionsProto.$Properties;
    }

    /**
     * Properties of a CandidateSectionSettingsProto.
     * @deprecated Use candidate_http.CandidateSectionSettingsProto.$Properties instead.
     */
    interface ICandidateSectionSettingsProto extends candidate_http.CandidateSectionSettingsProto.$Properties {
    }

    /** Represents a CandidateSectionSettingsProto. */
    class CandidateSectionSettingsProto {

        /**
         * Constructs a new CandidateSectionSettingsProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateSectionSettingsProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateSectionSettingsProto minutes_left. */
        minutes_left: number;

        /** CandidateSectionSettingsProto seconds_left. */
        seconds_left: number;

        /** CandidateSectionSettingsProto duration_in_minutes. */
        duration_in_minutes: number;

        /** CandidateSectionSettingsProto shuffle_items. */
        shuffle_items: boolean;

        /** CandidateSectionSettingsProto shuffle_options. */
        shuffle_options: boolean;

        /** CandidateSectionSettingsProto allow_calculator. */
        allow_calculator: boolean;

        /** CandidateSectionSettingsProto shuffle_blocks. */
        shuffle_blocks: boolean;

        /** CandidateSectionSettingsProto prevent_navigation_to_attempted_items. */
        prevent_navigation_to_attempted_items: boolean;

        /** CandidateSectionSettingsProto section_instruction. */
        section_instruction?: (string|null);

        /**
         * Creates a new CandidateSectionSettingsProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateSectionSettingsProto instance
         */
        static create(properties: candidate_http.CandidateSectionSettingsProto.$Shape): candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape;
        static create(properties?: candidate_http.CandidateSectionSettingsProto.$Properties): candidate_http.CandidateSectionSettingsProto;

        /**
         * Encodes the specified CandidateSectionSettingsProto message. Does not implicitly {@link candidate_http.CandidateSectionSettingsProto.verify|verify} messages.
         * @param message CandidateSectionSettingsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateSectionSettingsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateSectionSettingsProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionSettingsProto.verify|verify} messages.
         * @param message CandidateSectionSettingsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateSectionSettingsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateSectionSettingsProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape} CandidateSectionSettingsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape;

        /**
         * Decodes a CandidateSectionSettingsProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape} CandidateSectionSettingsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateSectionSettingsProto & candidate_http.CandidateSectionSettingsProto.$Shape;

        /**
         * Verifies a CandidateSectionSettingsProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateSectionSettingsProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateSectionSettingsProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateSectionSettingsProto;

        /**
         * Creates a plain object from a CandidateSectionSettingsProto message. Also converts values to other types if specified.
         * @param message CandidateSectionSettingsProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateSectionSettingsProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateSectionSettingsProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateSectionSettingsProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateSectionSettingsProto {

        /** Properties of a CandidateSectionSettingsProto. */
        interface $Properties {

            /** CandidateSectionSettingsProto minutes_left */
            minutes_left?: (number|null);

            /** CandidateSectionSettingsProto seconds_left */
            seconds_left?: (number|null);

            /** CandidateSectionSettingsProto duration_in_minutes */
            duration_in_minutes?: (number|null);

            /** CandidateSectionSettingsProto shuffle_items */
            shuffle_items?: (boolean|null);

            /** CandidateSectionSettingsProto shuffle_options */
            shuffle_options?: (boolean|null);

            /** CandidateSectionSettingsProto allow_calculator */
            allow_calculator?: (boolean|null);

            /** CandidateSectionSettingsProto shuffle_blocks */
            shuffle_blocks?: (boolean|null);

            /** CandidateSectionSettingsProto prevent_navigation_to_attempted_items */
            prevent_navigation_to_attempted_items?: (boolean|null);

            /** CandidateSectionSettingsProto section_instruction */
            section_instruction?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateSectionSettingsProto. */
        type $Shape = candidate_http.CandidateSectionSettingsProto.$Properties;
    }

    /**
     * Properties of a CandidateSectionBlocksProto.
     * @deprecated Use candidate_http.CandidateSectionBlocksProto.$Properties instead.
     */
    interface ICandidateSectionBlocksProto extends candidate_http.CandidateSectionBlocksProto.$Properties {
    }

    /** Represents a CandidateSectionBlocksProto. */
    class CandidateSectionBlocksProto {

        /**
         * Constructs a new CandidateSectionBlocksProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateSectionBlocksProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateSectionBlocksProto id. */
        id: (number|Long);

        /** CandidateSectionBlocksProto total_questions. */
        total_questions: number;

        /** CandidateSectionBlocksProto index. */
        index: number;

        /** CandidateSectionBlocksProto block_type. */
        block_type: candidate_http.BlockType;

        /** CandidateSectionBlocksProto items. */
        items: candidate_http.CandidateItemProto.$Properties[];

        /** CandidateSectionBlocksProto passages. */
        passages: candidate_http.CandidatePassageItemProto.$Properties[];

        /** CandidateSectionBlocksProto name. */
        name: string;

        /** CandidateSectionBlocksProto attempt_rule. */
        attempt_rule: candidate_http.AttemptRule;

        /** CandidateSectionBlocksProto items_to_attempt. */
        items_to_attempt: number;

        /** CandidateSectionBlocksProto instruction. */
        instruction?: (string|null);

        /**
         * Creates a new CandidateSectionBlocksProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateSectionBlocksProto instance
         */
        static create(properties: candidate_http.CandidateSectionBlocksProto.$Shape): candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape;
        static create(properties?: candidate_http.CandidateSectionBlocksProto.$Properties): candidate_http.CandidateSectionBlocksProto;

        /**
         * Encodes the specified CandidateSectionBlocksProto message. Does not implicitly {@link candidate_http.CandidateSectionBlocksProto.verify|verify} messages.
         * @param message CandidateSectionBlocksProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateSectionBlocksProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateSectionBlocksProto message, length delimited. Does not implicitly {@link candidate_http.CandidateSectionBlocksProto.verify|verify} messages.
         * @param message CandidateSectionBlocksProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateSectionBlocksProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateSectionBlocksProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape} CandidateSectionBlocksProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape;

        /**
         * Decodes a CandidateSectionBlocksProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape} CandidateSectionBlocksProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateSectionBlocksProto & candidate_http.CandidateSectionBlocksProto.$Shape;

        /**
         * Verifies a CandidateSectionBlocksProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateSectionBlocksProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateSectionBlocksProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateSectionBlocksProto;

        /**
         * Creates a plain object from a CandidateSectionBlocksProto message. Also converts values to other types if specified.
         * @param message CandidateSectionBlocksProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateSectionBlocksProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateSectionBlocksProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateSectionBlocksProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateSectionBlocksProto {

        /** Properties of a CandidateSectionBlocksProto. */
        interface $Properties {

            /** CandidateSectionBlocksProto id */
            id?: (number|Long|null);

            /** CandidateSectionBlocksProto total_questions */
            total_questions?: (number|null);

            /** CandidateSectionBlocksProto index */
            index?: (number|null);

            /** CandidateSectionBlocksProto block_type */
            block_type?: (candidate_http.BlockType|null);

            /** CandidateSectionBlocksProto items */
            items?: (candidate_http.CandidateItemProto.$Properties[]|null);

            /** CandidateSectionBlocksProto passages */
            passages?: (candidate_http.CandidatePassageItemProto.$Properties[]|null);

            /** CandidateSectionBlocksProto name */
            name?: (string|null);

            /** CandidateSectionBlocksProto attempt_rule */
            attempt_rule?: (candidate_http.AttemptRule|null);

            /** CandidateSectionBlocksProto items_to_attempt */
            items_to_attempt?: (number|null);

            /** CandidateSectionBlocksProto instruction */
            instruction?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateSectionBlocksProto. */
        type $Shape = candidate_http.CandidateSectionBlocksProto.$Properties;
    }

    /**
     * Properties of a CandidateItemProto.
     * @deprecated Use candidate_http.CandidateItemProto.$Properties instead.
     */
    interface ICandidateItemProto extends candidate_http.CandidateItemProto.$Properties {
    }

    /** Represents a CandidateItemProto. */
    class CandidateItemProto {

        /**
         * Constructs a new CandidateItemProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateItemProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateItemProto id. */
        id: Uint8Array;

        /** CandidateItemProto passage_stimulus. */
        passage_stimulus?: (string|null);

        /** CandidateItemProto reference. */
        reference: string;

        /** CandidateItemProto stimulus. */
        stimulus: string;

        /** CandidateItemProto options. */
        options: candidate_http.OptionDto.$Properties[];

        /** CandidateItemProto stems. */
        stems: string[];

        /** CandidateItemProto possible_responses. */
        possible_responses: candidate_http.PossibleResponseCandidate.$Properties[];

        /** CandidateItemProto response_positions. */
        response_positions: candidate_http.ResponsePosition.$Properties[];

        /** CandidateItemProto distractors. */
        distractors: candidate_http.OptionDto.$Properties[];

        /** CandidateItemProto item_type. */
        item_type: candidate_http.ItemType;

        /** CandidateItemProto numerical. */
        numerical: boolean;

        /** CandidateItemProto case_sensitive. */
        case_sensitive: boolean;

        /** CandidateItemProto shuffle_options. */
        shuffle_options: boolean;

        /** CandidateItemProto multiple_response. */
        multiple_response: boolean;

        /** CandidateItemProto max_words. */
        max_words: number;

        /** CandidateItemProto max_length. */
        max_length: number;

        /** CandidateItemProto allow_paste. */
        allow_paste: boolean;

        /** CandidateItemProto allow_copy. */
        allow_copy: boolean;

        /** CandidateItemProto allow_cut. */
        allow_cut: boolean;

        /** CandidateItemProto plain_text. */
        plain_text: boolean;

        /** CandidateItemProto responses. */
        responses: string[];

        /** CandidateItemProto revisit. */
        revisit: boolean;

        /** CandidateItemProto max_responses. */
        max_responses: number;

        /** CandidateItemProto image_data. */
        image_data?: (candidate_http.ImageData.$Properties|null);

        /** CandidateItemProto allow_stop. */
        allow_stop: boolean;

        /** CandidateItemProto allow_pause. */
        allow_pause: boolean;

        /** CandidateItemProto beep_when_recording_starts. */
        beep_when_recording_starts: boolean;

        /** CandidateItemProto warn_overwrite. */
        warn_overwrite: boolean;

        /** CandidateItemProto paper_response. */
        paper_response: boolean;

        /** CandidateItemProto max_duration. */
        max_duration: number;

        /** CandidateItemProto background_type. */
        background_type?: (candidate_http.BackgroundType|null);

        /** CandidateItemProto drawing_writing_split_type. */
        drawing_writing_split_type?: (candidate_http.DrawingWritingSplitType|null);

        /** CandidateItemProto sub_questions. */
        sub_questions: candidate_http.SubQuestion.$Properties[];

        /**
         * Creates a new CandidateItemProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateItemProto instance
         */
        static create(properties: candidate_http.CandidateItemProto.$Shape): candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape;
        static create(properties?: candidate_http.CandidateItemProto.$Properties): candidate_http.CandidateItemProto;

        /**
         * Encodes the specified CandidateItemProto message. Does not implicitly {@link candidate_http.CandidateItemProto.verify|verify} messages.
         * @param message CandidateItemProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateItemProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateItemProto message, length delimited. Does not implicitly {@link candidate_http.CandidateItemProto.verify|verify} messages.
         * @param message CandidateItemProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateItemProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateItemProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape} CandidateItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape;

        /**
         * Decodes a CandidateItemProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape} CandidateItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateItemProto & candidate_http.CandidateItemProto.$Shape;

        /**
         * Verifies a CandidateItemProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateItemProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateItemProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateItemProto;

        /**
         * Creates a plain object from a CandidateItemProto message. Also converts values to other types if specified.
         * @param message CandidateItemProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateItemProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateItemProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateItemProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateItemProto {

        /** Properties of a CandidateItemProto. */
        interface $Properties {

            /** CandidateItemProto id */
            id?: (Uint8Array|null);

            /** CandidateItemProto passage_stimulus */
            passage_stimulus?: (string|null);

            /** CandidateItemProto reference */
            reference?: (string|null);

            /** CandidateItemProto stimulus */
            stimulus?: (string|null);

            /** CandidateItemProto options */
            options?: (candidate_http.OptionDto.$Properties[]|null);

            /** CandidateItemProto stems */
            stems?: (string[]|null);

            /** CandidateItemProto possible_responses */
            possible_responses?: (candidate_http.PossibleResponseCandidate.$Properties[]|null);

            /** CandidateItemProto response_positions */
            response_positions?: (candidate_http.ResponsePosition.$Properties[]|null);

            /** CandidateItemProto distractors */
            distractors?: (candidate_http.OptionDto.$Properties[]|null);

            /** CandidateItemProto item_type */
            item_type?: (candidate_http.ItemType|null);

            /** CandidateItemProto numerical */
            numerical?: (boolean|null);

            /** CandidateItemProto case_sensitive */
            case_sensitive?: (boolean|null);

            /** CandidateItemProto shuffle_options */
            shuffle_options?: (boolean|null);

            /** CandidateItemProto multiple_response */
            multiple_response?: (boolean|null);

            /** CandidateItemProto max_words */
            max_words?: (number|null);

            /** CandidateItemProto max_length */
            max_length?: (number|null);

            /** CandidateItemProto allow_paste */
            allow_paste?: (boolean|null);

            /** CandidateItemProto allow_copy */
            allow_copy?: (boolean|null);

            /** CandidateItemProto allow_cut */
            allow_cut?: (boolean|null);

            /** CandidateItemProto plain_text */
            plain_text?: (boolean|null);

            /** CandidateItemProto responses */
            responses?: (string[]|null);

            /** CandidateItemProto revisit */
            revisit?: (boolean|null);

            /** CandidateItemProto max_responses */
            max_responses?: (number|null);

            /** CandidateItemProto image_data */
            image_data?: (candidate_http.ImageData.$Properties|null);

            /** CandidateItemProto allow_stop */
            allow_stop?: (boolean|null);

            /** CandidateItemProto allow_pause */
            allow_pause?: (boolean|null);

            /** CandidateItemProto beep_when_recording_starts */
            beep_when_recording_starts?: (boolean|null);

            /** CandidateItemProto warn_overwrite */
            warn_overwrite?: (boolean|null);

            /** CandidateItemProto paper_response */
            paper_response?: (boolean|null);

            /** CandidateItemProto max_duration */
            max_duration?: (number|null);

            /** CandidateItemProto background_type */
            background_type?: (candidate_http.BackgroundType|null);

            /** CandidateItemProto drawing_writing_split_type */
            drawing_writing_split_type?: (candidate_http.DrawingWritingSplitType|null);

            /** CandidateItemProto sub_questions */
            sub_questions?: (candidate_http.SubQuestion.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateItemProto. */
        type $Shape = candidate_http.CandidateItemProto.$Properties;
    }

    /**
     * Properties of a CandidatePassageItemProto.
     * @deprecated Use candidate_http.CandidatePassageItemProto.$Properties instead.
     */
    interface ICandidatePassageItemProto extends candidate_http.CandidatePassageItemProto.$Properties {
    }

    /** Represents a CandidatePassageItemProto. */
    class CandidatePassageItemProto {

        /**
         * Constructs a new CandidatePassageItemProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidatePassageItemProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidatePassageItemProto id. */
        id: Uint8Array;

        /** CandidatePassageItemProto stimulus. */
        stimulus: string;

        /** CandidatePassageItemProto items. */
        items: candidate_http.CandidateItemProto.$Properties[];

        /**
         * Creates a new CandidatePassageItemProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidatePassageItemProto instance
         */
        static create(properties: candidate_http.CandidatePassageItemProto.$Shape): candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape;
        static create(properties?: candidate_http.CandidatePassageItemProto.$Properties): candidate_http.CandidatePassageItemProto;

        /**
         * Encodes the specified CandidatePassageItemProto message. Does not implicitly {@link candidate_http.CandidatePassageItemProto.verify|verify} messages.
         * @param message CandidatePassageItemProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidatePassageItemProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidatePassageItemProto message, length delimited. Does not implicitly {@link candidate_http.CandidatePassageItemProto.verify|verify} messages.
         * @param message CandidatePassageItemProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidatePassageItemProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidatePassageItemProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape} CandidatePassageItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape;

        /**
         * Decodes a CandidatePassageItemProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape} CandidatePassageItemProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidatePassageItemProto & candidate_http.CandidatePassageItemProto.$Shape;

        /**
         * Verifies a CandidatePassageItemProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidatePassageItemProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidatePassageItemProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidatePassageItemProto;

        /**
         * Creates a plain object from a CandidatePassageItemProto message. Also converts values to other types if specified.
         * @param message CandidatePassageItemProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidatePassageItemProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidatePassageItemProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidatePassageItemProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidatePassageItemProto {

        /** Properties of a CandidatePassageItemProto. */
        interface $Properties {

            /** CandidatePassageItemProto id */
            id?: (Uint8Array|null);

            /** CandidatePassageItemProto stimulus */
            stimulus?: (string|null);

            /** CandidatePassageItemProto items */
            items?: (candidate_http.CandidateItemProto.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidatePassageItemProto. */
        type $Shape = candidate_http.CandidatePassageItemProto.$Properties;
    }

    /**
     * Properties of a CandidateAutoSaveHttpProto.
     * @deprecated Use candidate_http.CandidateAutoSaveHttpProto.$Properties instead.
     */
    interface ICandidateAutoSaveHttpProto extends candidate_http.CandidateAutoSaveHttpProto.$Properties {
    }

    /** Represents a CandidateAutoSaveHttpProto. */
    class CandidateAutoSaveHttpProto {

        /**
         * Constructs a new CandidateAutoSaveHttpProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateAutoSaveHttpProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateAutoSaveHttpProto sections_map. */
        sections_map: { [k: string]: candidate_http.SectionItemsProto.$Properties };

        /** CandidateAutoSaveHttpProto section_times. */
        section_times: { [k: string]: candidate_http.SectionTimesHttpProto.$Properties };

        /** CandidateAutoSaveHttpProto minutes. */
        minutes: number;

        /** CandidateAutoSaveHttpProto seconds. */
        seconds: number;

        /** CandidateAutoSaveHttpProto cand_id. */
        cand_id: (number|Long);

        /** CandidateAutoSaveHttpProto battery_status. */
        battery_status?: (candidate_http.BatteryStatusProto.$Properties|null);

        /** CandidateAutoSaveHttpProto pending_events. */
        pending_events: candidate_http.CandidateClientEventProto.$Properties[];

        /**
         * Creates a new CandidateAutoSaveHttpProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateAutoSaveHttpProto instance
         */
        static create(properties: candidate_http.CandidateAutoSaveHttpProto.$Shape): candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape;
        static create(properties?: candidate_http.CandidateAutoSaveHttpProto.$Properties): candidate_http.CandidateAutoSaveHttpProto;

        /**
         * Encodes the specified CandidateAutoSaveHttpProto message. Does not implicitly {@link candidate_http.CandidateAutoSaveHttpProto.verify|verify} messages.
         * @param message CandidateAutoSaveHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateAutoSaveHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateAutoSaveHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAutoSaveHttpProto.verify|verify} messages.
         * @param message CandidateAutoSaveHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateAutoSaveHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateAutoSaveHttpProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape} CandidateAutoSaveHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape;

        /**
         * Decodes a CandidateAutoSaveHttpProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape} CandidateAutoSaveHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateAutoSaveHttpProto & candidate_http.CandidateAutoSaveHttpProto.$Shape;

        /**
         * Verifies a CandidateAutoSaveHttpProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateAutoSaveHttpProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateAutoSaveHttpProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateAutoSaveHttpProto;

        /**
         * Creates a plain object from a CandidateAutoSaveHttpProto message. Also converts values to other types if specified.
         * @param message CandidateAutoSaveHttpProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateAutoSaveHttpProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateAutoSaveHttpProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateAutoSaveHttpProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateAutoSaveHttpProto {

        /** Properties of a CandidateAutoSaveHttpProto. */
        interface $Properties {

            /** CandidateAutoSaveHttpProto sections_map */
            sections_map?: ({ [k: string]: candidate_http.SectionItemsProto.$Properties }|null);

            /** CandidateAutoSaveHttpProto section_times */
            section_times?: ({ [k: string]: candidate_http.SectionTimesHttpProto.$Properties }|null);

            /** CandidateAutoSaveHttpProto minutes */
            minutes?: (number|null);

            /** CandidateAutoSaveHttpProto seconds */
            seconds?: (number|null);

            /** CandidateAutoSaveHttpProto cand_id */
            cand_id?: (number|Long|null);

            /** CandidateAutoSaveHttpProto battery_status */
            battery_status?: (candidate_http.BatteryStatusProto.$Properties|null);

            /** CandidateAutoSaveHttpProto pending_events */
            pending_events?: (candidate_http.CandidateClientEventProto.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateAutoSaveHttpProto. */
        type $Shape = {
          sections_map?: { [k: string]: candidate_http.SectionItemsProto.$Shape }|null;
          section_times?: { [k: string]: candidate_http.SectionTimesHttpProto.$Shape }|null;
          minutes?: number|null;
          seconds?: number|null;
          cand_id?: number|Long|null;
          battery_status?: candidate_http.BatteryStatusProto.$Shape|null;
          pending_events?: candidate_http.CandidateClientEventProto.$Shape[]|null;
          $unknowns?: Uint8Array[];
        };
    }

    /**
     * Properties of a SectionItemsProto.
     * @deprecated Use candidate_http.SectionItemsProto.$Properties instead.
     */
    interface ISectionItemsProto extends candidate_http.SectionItemsProto.$Properties {
    }

    /** Represents a SectionItemsProto. */
    class SectionItemsProto {

        /**
         * Constructs a new SectionItemsProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.SectionItemsProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SectionItemsProto items. */
        items: candidate_http.CandidateAutoSaveItemHttpProto.$Properties[];

        /**
         * Creates a new SectionItemsProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SectionItemsProto instance
         */
        static create(properties: candidate_http.SectionItemsProto.$Shape): candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape;
        static create(properties?: candidate_http.SectionItemsProto.$Properties): candidate_http.SectionItemsProto;

        /**
         * Encodes the specified SectionItemsProto message. Does not implicitly {@link candidate_http.SectionItemsProto.verify|verify} messages.
         * @param message SectionItemsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.SectionItemsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SectionItemsProto message, length delimited. Does not implicitly {@link candidate_http.SectionItemsProto.verify|verify} messages.
         * @param message SectionItemsProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.SectionItemsProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SectionItemsProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape} SectionItemsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape;

        /**
         * Decodes a SectionItemsProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape} SectionItemsProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.SectionItemsProto & candidate_http.SectionItemsProto.$Shape;

        /**
         * Verifies a SectionItemsProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SectionItemsProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SectionItemsProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.SectionItemsProto;

        /**
         * Creates a plain object from a SectionItemsProto message. Also converts values to other types if specified.
         * @param message SectionItemsProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.SectionItemsProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SectionItemsProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SectionItemsProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SectionItemsProto {

        /** Properties of a SectionItemsProto. */
        interface $Properties {

            /** SectionItemsProto items */
            items?: (candidate_http.CandidateAutoSaveItemHttpProto.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SectionItemsProto. */
        type $Shape = candidate_http.SectionItemsProto.$Properties;
    }

    /**
     * Properties of a SectionTimesHttpProto.
     * @deprecated Use candidate_http.SectionTimesHttpProto.$Properties instead.
     */
    interface ISectionTimesHttpProto extends candidate_http.SectionTimesHttpProto.$Properties {
    }

    /** Represents a SectionTimesHttpProto. */
    class SectionTimesHttpProto {

        /**
         * Constructs a new SectionTimesHttpProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.SectionTimesHttpProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SectionTimesHttpProto minutes. */
        minutes: number;

        /** SectionTimesHttpProto seconds. */
        seconds: number;

        /**
         * Creates a new SectionTimesHttpProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SectionTimesHttpProto instance
         */
        static create(properties: candidate_http.SectionTimesHttpProto.$Shape): candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape;
        static create(properties?: candidate_http.SectionTimesHttpProto.$Properties): candidate_http.SectionTimesHttpProto;

        /**
         * Encodes the specified SectionTimesHttpProto message. Does not implicitly {@link candidate_http.SectionTimesHttpProto.verify|verify} messages.
         * @param message SectionTimesHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.SectionTimesHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SectionTimesHttpProto message, length delimited. Does not implicitly {@link candidate_http.SectionTimesHttpProto.verify|verify} messages.
         * @param message SectionTimesHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.SectionTimesHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SectionTimesHttpProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape} SectionTimesHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape;

        /**
         * Decodes a SectionTimesHttpProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape} SectionTimesHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.SectionTimesHttpProto & candidate_http.SectionTimesHttpProto.$Shape;

        /**
         * Verifies a SectionTimesHttpProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SectionTimesHttpProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SectionTimesHttpProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.SectionTimesHttpProto;

        /**
         * Creates a plain object from a SectionTimesHttpProto message. Also converts values to other types if specified.
         * @param message SectionTimesHttpProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.SectionTimesHttpProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SectionTimesHttpProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SectionTimesHttpProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SectionTimesHttpProto {

        /** Properties of a SectionTimesHttpProto. */
        interface $Properties {

            /** SectionTimesHttpProto minutes */
            minutes?: (number|null);

            /** SectionTimesHttpProto seconds */
            seconds?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SectionTimesHttpProto. */
        type $Shape = candidate_http.SectionTimesHttpProto.$Properties;
    }

    /**
     * Properties of a CandidateAutoSaveItemHttpProto.
     * @deprecated Use candidate_http.CandidateAutoSaveItemHttpProto.$Properties instead.
     */
    interface ICandidateAutoSaveItemHttpProto extends candidate_http.CandidateAutoSaveItemHttpProto.$Properties {
    }

    /** Represents a CandidateAutoSaveItemHttpProto. */
    class CandidateAutoSaveItemHttpProto {

        /**
         * Constructs a new CandidateAutoSaveItemHttpProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateAutoSaveItemHttpProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateAutoSaveItemHttpProto item_id. */
        item_id: Uint8Array;

        /** CandidateAutoSaveItemHttpProto blk_id. */
        blk_id: (number|Long);

        /** CandidateAutoSaveItemHttpProto answers. */
        answers: string[];

        /** CandidateAutoSaveItemHttpProto revisit_later. */
        revisit_later: boolean;

        /** CandidateAutoSaveItemHttpProto item_type. */
        item_type: string;

        /**
         * Creates a new CandidateAutoSaveItemHttpProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateAutoSaveItemHttpProto instance
         */
        static create(properties: candidate_http.CandidateAutoSaveItemHttpProto.$Shape): candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape;
        static create(properties?: candidate_http.CandidateAutoSaveItemHttpProto.$Properties): candidate_http.CandidateAutoSaveItemHttpProto;

        /**
         * Encodes the specified CandidateAutoSaveItemHttpProto message. Does not implicitly {@link candidate_http.CandidateAutoSaveItemHttpProto.verify|verify} messages.
         * @param message CandidateAutoSaveItemHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateAutoSaveItemHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateAutoSaveItemHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateAutoSaveItemHttpProto.verify|verify} messages.
         * @param message CandidateAutoSaveItemHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateAutoSaveItemHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateAutoSaveItemHttpProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape} CandidateAutoSaveItemHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape;

        /**
         * Decodes a CandidateAutoSaveItemHttpProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape} CandidateAutoSaveItemHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateAutoSaveItemHttpProto & candidate_http.CandidateAutoSaveItemHttpProto.$Shape;

        /**
         * Verifies a CandidateAutoSaveItemHttpProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateAutoSaveItemHttpProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateAutoSaveItemHttpProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateAutoSaveItemHttpProto;

        /**
         * Creates a plain object from a CandidateAutoSaveItemHttpProto message. Also converts values to other types if specified.
         * @param message CandidateAutoSaveItemHttpProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateAutoSaveItemHttpProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateAutoSaveItemHttpProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateAutoSaveItemHttpProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateAutoSaveItemHttpProto {

        /** Properties of a CandidateAutoSaveItemHttpProto. */
        interface $Properties {

            /** CandidateAutoSaveItemHttpProto item_id */
            item_id?: (Uint8Array|null);

            /** CandidateAutoSaveItemHttpProto blk_id */
            blk_id?: (number|Long|null);

            /** CandidateAutoSaveItemHttpProto answers */
            answers?: (string[]|null);

            /** CandidateAutoSaveItemHttpProto revisit_later */
            revisit_later?: (boolean|null);

            /** CandidateAutoSaveItemHttpProto item_type */
            item_type?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateAutoSaveItemHttpProto. */
        type $Shape = candidate_http.CandidateAutoSaveItemHttpProto.$Properties;
    }

    /**
     * Properties of a BatteryStatusProto.
     * @deprecated Use candidate_http.BatteryStatusProto.$Properties instead.
     */
    interface IBatteryStatusProto extends candidate_http.BatteryStatusProto.$Properties {
    }

    /** Represents a BatteryStatusProto. */
    class BatteryStatusProto {

        /**
         * Constructs a new BatteryStatusProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.BatteryStatusProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** BatteryStatusProto none. */
        none?: (boolean|null);

        /** BatteryStatusProto charge. */
        charge?: (candidate_http.BatteryChargeProto.$Properties|null);

        /** BatteryStatusProto status. */
        status?: ("none"|"charge");

        /**
         * Creates a new BatteryStatusProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BatteryStatusProto instance
         */
        static create(properties: candidate_http.BatteryStatusProto.$Shape): candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape;
        static create(properties?: candidate_http.BatteryStatusProto.$Properties): candidate_http.BatteryStatusProto;

        /**
         * Encodes the specified BatteryStatusProto message. Does not implicitly {@link candidate_http.BatteryStatusProto.verify|verify} messages.
         * @param message BatteryStatusProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.BatteryStatusProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BatteryStatusProto message, length delimited. Does not implicitly {@link candidate_http.BatteryStatusProto.verify|verify} messages.
         * @param message BatteryStatusProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.BatteryStatusProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BatteryStatusProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape} BatteryStatusProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape;

        /**
         * Decodes a BatteryStatusProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape} BatteryStatusProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.BatteryStatusProto & candidate_http.BatteryStatusProto.$Shape;

        /**
         * Verifies a BatteryStatusProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BatteryStatusProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BatteryStatusProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.BatteryStatusProto;

        /**
         * Creates a plain object from a BatteryStatusProto message. Also converts values to other types if specified.
         * @param message BatteryStatusProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.BatteryStatusProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BatteryStatusProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BatteryStatusProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BatteryStatusProto {

        /** Properties of a BatteryStatusProto. */
        interface $Properties {

            /** BatteryStatusProto none */
            none?: (boolean|null);

            /** BatteryStatusProto charge */
            charge?: (candidate_http.BatteryChargeProto.$Properties|null);

            /** BatteryStatusProto status */
            status?: ("none"|"charge");

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Narrowed shape of a BatteryStatusProto. */
        type $Shape = {
          none?: boolean|null;
          charge?: candidate_http.BatteryChargeProto.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ status?: undefined; none?: null; charge?: null }|{ status?: "none"; none: boolean; charge?: null }|{ status?: "charge"; none?: null; charge: candidate_http.BatteryChargeProto.$Shape })
        );
    }

    /**
     * Properties of a BatteryChargeProto.
     * @deprecated Use candidate_http.BatteryChargeProto.$Properties instead.
     */
    interface IBatteryChargeProto extends candidate_http.BatteryChargeProto.$Properties {
    }

    /** Represents a BatteryChargeProto. */
    class BatteryChargeProto {

        /**
         * Constructs a new BatteryChargeProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.BatteryChargeProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** BatteryChargeProto percentage. */
        percentage: number;

        /** BatteryChargeProto charging. */
        charging: boolean;

        /**
         * Creates a new BatteryChargeProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BatteryChargeProto instance
         */
        static create(properties: candidate_http.BatteryChargeProto.$Shape): candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape;
        static create(properties?: candidate_http.BatteryChargeProto.$Properties): candidate_http.BatteryChargeProto;

        /**
         * Encodes the specified BatteryChargeProto message. Does not implicitly {@link candidate_http.BatteryChargeProto.verify|verify} messages.
         * @param message BatteryChargeProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.BatteryChargeProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BatteryChargeProto message, length delimited. Does not implicitly {@link candidate_http.BatteryChargeProto.verify|verify} messages.
         * @param message BatteryChargeProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.BatteryChargeProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BatteryChargeProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape} BatteryChargeProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape;

        /**
         * Decodes a BatteryChargeProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape} BatteryChargeProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.BatteryChargeProto & candidate_http.BatteryChargeProto.$Shape;

        /**
         * Verifies a BatteryChargeProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BatteryChargeProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BatteryChargeProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.BatteryChargeProto;

        /**
         * Creates a plain object from a BatteryChargeProto message. Also converts values to other types if specified.
         * @param message BatteryChargeProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.BatteryChargeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BatteryChargeProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BatteryChargeProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BatteryChargeProto {

        /** Properties of a BatteryChargeProto. */
        interface $Properties {

            /** BatteryChargeProto percentage */
            percentage?: (number|null);

            /** BatteryChargeProto charging */
            charging?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a BatteryChargeProto. */
        type $Shape = candidate_http.BatteryChargeProto.$Properties;
    }

    /**
     * Properties of a CandidateClientEventProto.
     * @deprecated Use candidate_http.CandidateClientEventProto.$Properties instead.
     */
    interface ICandidateClientEventProto extends candidate_http.CandidateClientEventProto.$Properties {
    }

    /** Represents a CandidateClientEventProto. */
    class CandidateClientEventProto {

        /**
         * Constructs a new CandidateClientEventProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateClientEventProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateClientEventProto event_id. */
        event_id: Uint8Array;

        /** CandidateClientEventProto events_session_id. */
        events_session_id: Uint8Array;

        /** CandidateClientEventProto sequence. */
        sequence: (number|Long);

        /** CandidateClientEventProto event_type. */
        event_type: string;

        /** CandidateClientEventProto elapsed_ms. */
        elapsed_ms: (number|Long);

        /** CandidateClientEventProto section_id. */
        section_id?: (Uint8Array|null);

        /** CandidateClientEventProto question_id. */
        question_id?: (Uint8Array|null);

        /** CandidateClientEventProto answer. */
        answer?: (string|null);

        /** CandidateClientEventProto old_answer. */
        old_answer?: (string|null);

        /** CandidateClientEventProto navigation_method. */
        navigation_method?: (string|null);

        /** CandidateClientEventProto duration_ms. */
        duration_ms?: (number|Long|null);

        /** CandidateClientEventProto battery_level. */
        battery_level?: (number|null);

        /**
         * Creates a new CandidateClientEventProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateClientEventProto instance
         */
        static create(properties: candidate_http.CandidateClientEventProto.$Shape): candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape;
        static create(properties?: candidate_http.CandidateClientEventProto.$Properties): candidate_http.CandidateClientEventProto;

        /**
         * Encodes the specified CandidateClientEventProto message. Does not implicitly {@link candidate_http.CandidateClientEventProto.verify|verify} messages.
         * @param message CandidateClientEventProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateClientEventProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateClientEventProto message, length delimited. Does not implicitly {@link candidate_http.CandidateClientEventProto.verify|verify} messages.
         * @param message CandidateClientEventProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateClientEventProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateClientEventProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape} CandidateClientEventProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape;

        /**
         * Decodes a CandidateClientEventProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape} CandidateClientEventProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateClientEventProto & candidate_http.CandidateClientEventProto.$Shape;

        /**
         * Verifies a CandidateClientEventProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateClientEventProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateClientEventProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateClientEventProto;

        /**
         * Creates a plain object from a CandidateClientEventProto message. Also converts values to other types if specified.
         * @param message CandidateClientEventProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateClientEventProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateClientEventProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateClientEventProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateClientEventProto {

        /** Properties of a CandidateClientEventProto. */
        interface $Properties {

            /** CandidateClientEventProto event_id */
            event_id?: (Uint8Array|null);

            /** CandidateClientEventProto events_session_id */
            events_session_id?: (Uint8Array|null);

            /** CandidateClientEventProto sequence */
            sequence?: (number|Long|null);

            /** CandidateClientEventProto event_type */
            event_type?: (string|null);

            /** CandidateClientEventProto elapsed_ms */
            elapsed_ms?: (number|Long|null);

            /** CandidateClientEventProto section_id */
            section_id?: (Uint8Array|null);

            /** CandidateClientEventProto question_id */
            question_id?: (Uint8Array|null);

            /** CandidateClientEventProto answer */
            answer?: (string|null);

            /** CandidateClientEventProto old_answer */
            old_answer?: (string|null);

            /** CandidateClientEventProto navigation_method */
            navigation_method?: (string|null);

            /** CandidateClientEventProto duration_ms */
            duration_ms?: (number|Long|null);

            /** CandidateClientEventProto battery_level */
            battery_level?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateClientEventProto. */
        type $Shape = candidate_http.CandidateClientEventProto.$Properties;
    }

    /**
     * Properties of a CandidateEndExamHttpProto.
     * @deprecated Use candidate_http.CandidateEndExamHttpProto.$Properties instead.
     */
    interface ICandidateEndExamHttpProto extends candidate_http.CandidateEndExamHttpProto.$Properties {
    }

    /** Represents a CandidateEndExamHttpProto. */
    class CandidateEndExamHttpProto {

        /**
         * Constructs a new CandidateEndExamHttpProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: candidate_http.CandidateEndExamHttpProto.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CandidateEndExamHttpProto timed_out. */
        timed_out: boolean;

        /** CandidateEndExamHttpProto autosave. */
        autosave?: (candidate_http.CandidateAutoSaveHttpProto.$Properties|null);

        /** CandidateEndExamHttpProto is_drawing_writing. */
        is_drawing_writing: boolean;

        /**
         * Creates a new CandidateEndExamHttpProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CandidateEndExamHttpProto instance
         */
        static create(properties: candidate_http.CandidateEndExamHttpProto.$Shape): candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape;
        static create(properties?: candidate_http.CandidateEndExamHttpProto.$Properties): candidate_http.CandidateEndExamHttpProto;

        /**
         * Encodes the specified CandidateEndExamHttpProto message. Does not implicitly {@link candidate_http.CandidateEndExamHttpProto.verify|verify} messages.
         * @param message CandidateEndExamHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: candidate_http.CandidateEndExamHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CandidateEndExamHttpProto message, length delimited. Does not implicitly {@link candidate_http.CandidateEndExamHttpProto.verify|verify} messages.
         * @param message CandidateEndExamHttpProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: candidate_http.CandidateEndExamHttpProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CandidateEndExamHttpProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape} CandidateEndExamHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape;

        /**
         * Decodes a CandidateEndExamHttpProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape} CandidateEndExamHttpProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): candidate_http.CandidateEndExamHttpProto & candidate_http.CandidateEndExamHttpProto.$Shape;

        /**
         * Verifies a CandidateEndExamHttpProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CandidateEndExamHttpProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CandidateEndExamHttpProto
         */
        static fromObject(object: { [k: string]: any }): candidate_http.CandidateEndExamHttpProto;

        /**
         * Creates a plain object from a CandidateEndExamHttpProto message. Also converts values to other types if specified.
         * @param message CandidateEndExamHttpProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: candidate_http.CandidateEndExamHttpProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CandidateEndExamHttpProto to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CandidateEndExamHttpProto
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CandidateEndExamHttpProto {

        /** Properties of a CandidateEndExamHttpProto. */
        interface $Properties {

            /** CandidateEndExamHttpProto timed_out */
            timed_out?: (boolean|null);

            /** CandidateEndExamHttpProto autosave */
            autosave?: (candidate_http.CandidateAutoSaveHttpProto.$Properties|null);

            /** CandidateEndExamHttpProto is_drawing_writing */
            is_drawing_writing?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CandidateEndExamHttpProto. */
        type $Shape = {
          timed_out?: boolean|null;
          autosave?: candidate_http.CandidateAutoSaveHttpProto.$Shape|null;
          is_drawing_writing?: boolean|null;
          $unknowns?: Uint8Array[];
        };
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /**
         * Properties of a Timestamp.
         * @deprecated Use google.protobuf.Timestamp.$Properties instead.
         */
        interface ITimestamp extends google.protobuf.Timestamp.$Properties {
        }

        /** Represents a Timestamp. */
        class Timestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.Timestamp.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Timestamp seconds. */
            seconds: (number|Long);

            /** Timestamp nanos. */
            nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            static create(properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
            static create(properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Timestamp
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Timestamp {

            /** Properties of a Timestamp. */
            interface $Properties {

                /** Timestamp seconds */
                seconds?: (number|Long|null);

                /** Timestamp nanos */
                nanos?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Timestamp. */
            type $Shape = google.protobuf.Timestamp.$Properties;
        }
    }
}
