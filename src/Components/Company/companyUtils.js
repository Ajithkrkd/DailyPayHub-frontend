
//here iam use the custom axios becuse each route i want to pass the token to verify  it is WORKER
// the "customeAXIOS" have header contins token and URL "/api"

export const COMPANY_BASE_URL = `/worker/company`;
export const COMPANY_REGISTER_URL = `${COMPANY_BASE_URL}/register`
export const COMPANY_EMAIL_VERIFICATION_URL = `${COMPANY_BASE_URL}/verify-email`// {/email}
export const COMPANY_EMAIL_CONFIRM_URL = `${COMPANY_BASE_URL}/confirm-email`// {/token}


//company verification related routes
export const COMPANY_DOCUMENT_UPLOAD_URL = `worker/company/verification/documentUpload` //{companyId}