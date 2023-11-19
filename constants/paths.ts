const REPORT_PATH = 'reports' as const;

export const PATHS = {
    HTML_REPORT: `${REPORT_PATH}/html`,
    SCREENSHOTS: `${REPORT_PATH}/screenshots`,
    TRACES: `${REPORT_PATH}/traces`,
    VIDEOS: `${REPORT_PATH}/videos`,
} as const;
