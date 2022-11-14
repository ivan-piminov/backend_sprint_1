import { ResolutionType } from "../types";

export type UpdateVideoModel = {
    title: string | null,
    author: string,
    availableResolutions?: string[],
    canBeDownloaded?: boolean,
    minAgeRestriction?: number,
    publicationDate?: string
}
