// To parse this data:
//
//   import { Convert, USSDMatchingOperatorResponse } from "./file";
//
//   const uSSDMatchingOperatorResponse = Convert.toUSSDMatchingOperatorResponse(json);

export interface InquiryResponseType {
    id?:            number;
    response_type?: string;
    isSelected?:    boolean;
}
