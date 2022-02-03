export type PhoneNumberRequestType = {
    phoneNumber: number
}

export type PhoneNumberResponseType = boolean;

export type PhoneCodeRequestType = {
    phoneNumber: number,
    phoneCode?: number
}

export type PhoneCodeResponseType = boolean;

export type AuthAPIType = {
    checkPhoneNumber: (values: PhoneNumberRequestType) => PhoneNumberResponseType,
    checkPhoneCode: (values: PhoneCodeRequestType) => PhoneCodeResponseType
}

export interface AuthInitialState {
    auth: boolean,
    phoneNumber: boolean
}