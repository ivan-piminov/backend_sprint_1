
export type CreateVideoModel = {
    publicationDate: string,
    title: string | null,
    author: string,
    availableResolutions?: string[],
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null
}

