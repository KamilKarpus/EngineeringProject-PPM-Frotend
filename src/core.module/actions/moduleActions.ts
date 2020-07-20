export const MENU_CHANGE = "MENU_CHANGE";

export interface MenuChangeAction{
    type: string;
    payload: number;
}

export type Actions = MenuChangeAction;