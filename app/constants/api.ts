export const FPF_LABS_API_KEY = process.env.NODE_ENV === 'development'? process.env.FPF_LABS_API_DEV_KEY! : process.env.FPF_LABS_API_KEY!
export const API_BASE_URL = process.env.API_BASE_URL!;
export const CHART_ANALYSIS_URL = `${API_BASE_URL}/api/v1/analysis`;
export const CHART_ANALYSIS_RECURRING_URL = `${API_BASE_URL}/api/v1/analysis/recurring`;
export const CHART_ANALYSIS_RESULTS_URL =`${API_BASE_URL}/api/v1/analysis/results`;
export const SAVE_ANALYSIS_URL = `${API_BASE_URL}/api/v1/analysis/save`;
export const SHARED_ANALYSIS_URL = `${API_BASE_URL}/api/v1/share`;
export const JOURNAL_URL = `${API_BASE_URL}/api/v1/journal`;
export const REFRESH_TOKEN_URL = `${API_BASE_URL}/api/v1/auth/token`;
export const LOGIN_URL = `${API_BASE_URL}/api/v1/auth/login`;
export const LOGOUT_URL = `${API_BASE_URL}/api/v1/auth/logout`;
export const REGISTER_URL = `${API_BASE_URL}/api/v1/auth/register`;
export const USAGE_URL = `${API_BASE_URL}/api/v1/usage`;
