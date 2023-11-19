declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL?: string;
            RECORD_VIDEO?: string;
			PWDEBUG?: string;
        }
    }
}

export {};
