export interface UiState {
    userId: number;
    ticketId: number;
}

export const INITIAL_UI_STATE: UiState = {
    userId: undefined,
    ticketId: undefined
};