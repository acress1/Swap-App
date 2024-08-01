
export type swapDataItem = {
    Date: string;
    Outbound?: number;
    Inbound?: number;
    Position: string;
    Email: string;
    Early: boolean;
    Late: boolean;
    LTA: boolean;
    DO: boolean;
    Note: string;
    Sent: string;
}

export type shiftsItem = {
    Date: string,
    isOvernight: boolean,
    Outbound?: number,
    Inbound?: number,
    Position: string,
    Early: boolean,
    Late: boolean,
    LTA: boolean,
    DO: boolean,
    Note?: string
}