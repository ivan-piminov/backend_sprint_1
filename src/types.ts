import { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>
// export type RequestWithQuery<T> =
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>

export type ResolutionType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"

export type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}
export type ErrorType = {
        message: string,
        field: string
}
export type ErrorsMessagesType = {
    errorsMessages: ErrorType[]
}
