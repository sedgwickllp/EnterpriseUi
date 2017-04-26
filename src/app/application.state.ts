import { UiState, INITIAL_UI_STATE } from "./ui-state";
import { TicketStoreData, INITIAL_TICKET_STORE_DATA } from './tickets/ticket-store/ticket.store-data';
export interface ApplicationState {
    uiState: UiState,
    ticketStoreData: TicketStoreData
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    ticketStoreData: INITIAL_TICKET_STORE_DATA
};
