// To parse this data:
//
//   import { Convert, ListGenerateText } from "./file";
//
//   const listGenerateText = Convert.toListGenerateText(json);

export interface ListGenerateText {
    id:                 string;
    object:             string;
    created:            number;
    model:              string;
    choices:            Choice[];
    usage:              Usage;
    system_fingerprint: null;
}

export interface Choice {
    index:         number;
    message:       Message;
    logprobs:      null;
    finish_reason: string;
}

export interface Message {
    role:    string;
    content: string;
}

export interface Usage {
    prompt_tokens:     number;
    completion_tokens: number;
    total_tokens:      number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toListGenerateText(json: string): ListGenerateText {
        return JSON.parse(json);
    }

    public static listGenerateTextToJson(value: ListGenerateText): string {
        return JSON.stringify(value);
    }
}
