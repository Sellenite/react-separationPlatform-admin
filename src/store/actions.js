// actions type
export const SAVE_REGISTER_INFO = 'SAVE_REGISTER_INFO';

// actions
export const saveRegisterInfo = (registerInfo) => {
    return {
        type: SAVE_REGISTER_INFO,
        registerInfo
    }
}